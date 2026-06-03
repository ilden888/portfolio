#!/usr/bin/env python3
"""Finalize server: add authorized_keys, clone repo, initial build."""
import paramiko

HOST = "38.244.130.150"
USER = "root"
PASSWORD = "uGN5qfsk8m"
REPO = "https://github.com/ilden888/portfolio.git"


def run(ssh, cmd, timeout=300, print_output=True):
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
    if err and print_output and "warn" not in err.lower():
        print("STDERR:", err[:500])
    exit_code = stdout.channel.recv_exit_status()
    return out, err, exit_code


def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {HOST}...")
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("Connected!")

    print("\n=== Add public key to authorized_keys ===")
    out, _, _ = run(ssh, "cat /root/.ssh/id_rsa.pub")
    pub_key = out.strip()
    run(ssh, f"mkdir -p /root/.ssh && chmod 700 /root/.ssh")
    run(ssh, f"echo '{pub_key}' >> /root/.ssh/authorized_keys")
    run(ssh, "chmod 600 /root/.ssh/authorized_keys")
    run(ssh, "sort -u /root/.ssh/authorized_keys -o /root/.ssh/authorized_keys")
    print("Public key added to authorized_keys")

    print("\n=== Clone repo to /var/www/portfolio ===")
    out, _, _ = run(ssh, "test -d /var/www/portfolio/.git && echo git_exists || echo no_git")
    if "no_git" in out:
        run(ssh, f"git clone {REPO} /var/www/portfolio", timeout=120)
    else:
        print("Repo already cloned, pulling latest...")
        run(ssh, "cd /var/www/portfolio && git pull origin master")

    print("\n=== Install dependencies ===")
    run(ssh, "cd /var/www/portfolio && npm ci 2>&1 | tail -10", timeout=300)

    print("\n=== Build app ===")
    run(ssh, "cd /var/www/portfolio && npm run build 2>&1 | tail -20", timeout=300)

    print("\n=== Start PM2 process ===")
    run(ssh, "cd /var/www/portfolio && pm2 delete portfolio 2>/dev/null || true")
    run(ssh, "cd /var/www/portfolio && pm2 start npm --name portfolio -- start -- --port 3000")
    run(ssh, "pm2 save")
    run(ssh, "pm2 status")

    print("\n=== Check app is running ===")
    import time
    time.sleep(3)
    run(ssh, "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000 || echo 'not reachable'")

    print("\n=== Read private key for GitHub Secret ===")
    out, _, _ = run(ssh, "cat /root/.ssh/id_rsa", print_output=False)
    print("\n" + "="*60)
    print("COPY THIS AS GitHub Secret VPS_SSH_KEY:")
    print("="*60)
    print(out)
    print("="*60)

    ssh.close()
    print("\nDone! App should be live at http://38.244.130.150")


if __name__ == "__main__":
    main()
