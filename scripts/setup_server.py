#!/usr/bin/env python3
"""Server setup script using paramiko."""
import paramiko
import time
import sys

HOST = "38.244.130.150"
USER = "root"
PASSWORD = "uGN5qfsk8m"


def run(ssh, cmd, timeout=120, print_output=True):
    print(f"\n>>> {cmd}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout, get_pty=True)
    out = ""
    while True:
        line = stdout.readline()
        if not line:
            break
        if print_output:
            print(line, end="")
        out += line
    err = stderr.read().decode()
    if err and print_output:
        print("STDERR:", err)
    exit_code = stdout.channel.recv_exit_status()
    return out, err, exit_code


def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {HOST}...")
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("Connected!")

    # Check OS
    out, _, _ = run(ssh, "cat /etc/os-release | head -3")
    out, _, _ = run(ssh, "free -h && df -h /")

    print("\n=== STEP 1: Update system ===")
    run(ssh, "apt-get update -qq", timeout=120)
    run(ssh, "apt-get install -y curl git nginx 2>&1 | tail -5", timeout=180)

    print("\n=== STEP 2: Install Node.js 22 ===")
    out, _, rc = run(ssh, "node --version 2>/dev/null || echo 'not installed'")
    if "v22" not in out:
        run(ssh, "curl -fsSL https://deb.nodesource.com/setup_22.x | bash -", timeout=120)
        run(ssh, "apt-get install -y nodejs 2>&1 | tail -5", timeout=120)
    out, _, _ = run(ssh, "node --version && npm --version")

    print("\n=== STEP 3: Install PM2 ===")
    run(ssh, "npm install -g pm2 2>&1 | tail -3", timeout=120)
    run(ssh, "pm2 --version")

    print("\n=== STEP 4: Check GitHub repo ===")
    out, _, _ = run(ssh, "cat /root/.ssh/id_rsa.pub 2>/dev/null || echo 'no key'")
    print("Current public key:", out.strip())

    print("\n=== STEP 5: Generate deploy SSH key ===")
    out, _, rc = run(ssh, "test -f /root/.ssh/id_rsa && echo exists || echo missing")
    if "missing" in out:
        run(ssh, 'ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa -N "" -C "github-deploy"')
    out, _, _ = run(ssh, "cat /root/.ssh/id_rsa")
    print("\n=== PRIVATE KEY (for GitHub Secret VPS_SSH_KEY) ===")
    print(out)
    out, _, _ = run(ssh, "cat /root/.ssh/id_rsa.pub")
    print("\n=== PUBLIC KEY (add to server authorized_keys) ===")
    print(out)

    print("\n=== STEP 6: Setup app directory ===")
    run(ssh, "mkdir -p /var/www/portfolio")
    out, _, _ = run(ssh, "test -d /var/www/portfolio/.git && echo git_exists || echo no_git")
    if "no_git" in out:
        print("Need to clone repo. Check GitHub repo URL...")
        # We'll configure this after getting GitHub deploy key set up
    else:
        print("Git repo already present.")

    print("\n=== STEP 7: Configure Nginx ===")
    nginx_conf = """server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}"""
    # Write nginx config
    run(ssh, f"cat > /etc/nginx/sites-available/portfolio << 'NGINXEOF'\n{nginx_conf}\nNGINXEOF")
    run(ssh, "ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/portfolio")
    run(ssh, "rm -f /etc/nginx/sites-enabled/default")
    out, _, rc = run(ssh, "nginx -t")
    if rc == 0:
        run(ssh, "systemctl reload nginx")
        run(ssh, "systemctl enable nginx")
        print("Nginx configured OK")
    else:
        print("Nginx config error!")

    print("\n=== STEP 8: Setup deploy script ===")
    deploy_script = """#!/bin/bash
set -e
cd /var/www/portfolio
git pull origin master
npm ci --prefer-offline
npm run build
pm2 restart portfolio || pm2 start npm --name portfolio -- start
pm2 save
echo "Deploy complete!"
"""
    run(ssh, f"cat > /root/deploy.sh << 'DEPLOYEOF'\n{deploy_script}\nDEPLOYEOF")
    run(ssh, "chmod +x /root/deploy.sh")

    print("\n=== STEP 9: PM2 autostart ===")
    run(ssh, "pm2 startup systemd -u root --hp /root 2>&1 | tail -5")
    run(ssh, "systemctl enable pm2-root 2>/dev/null || true")

    print("\n\n=== SETUP COMPLETE ===")
    print("Next steps:")
    print("1. Add the PRIVATE KEY above as GitHub Secret: VPS_SSH_KEY")
    print("2. Set GitHub Secret: VPS_HOST = 38.244.130.150")
    print("3. Set GitHub Secret: VPS_USER = root")
    print("4. Clone the repo to /var/www/portfolio on the server")
    print("5. Run first deploy manually: ssh root@38.244.130.150 '/root/deploy.sh'")

    ssh.close()


if __name__ == "__main__":
    main()
