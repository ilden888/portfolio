#!/usr/bin/env python3
"""Fix npm install and start app via PM2."""
import sys
import re
import paramiko

# Force UTF-8 output
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "38.244.130.150"
USER = "root"
PASSWORD = "uGN5qfsk8m"
ANSI = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')


def run(ssh, cmd, timeout=300):
    print(f"\n>>> {cmd[:80]}")
    stdin, stdout, stderr = ssh.exec_command(cmd, timeout=timeout)
    out = ANSI.sub('', stdout.read().decode("utf-8", errors="replace"))
    err = ANSI.sub('', stderr.read().decode("utf-8", errors="replace"))
    rc = stdout.channel.recv_exit_status()
    if out.strip():
        print(out.strip()[:2000])
    if err.strip() and rc != 0:
        print("ERR:", err.strip()[:500])
    return out, err, rc


def main():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {HOST}...")
    ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
    print("Connected!")

    print("\n=== Build ===")
    out, err, rc = run(ssh, "cd /var/www/portfolio && npm run build 2>&1", timeout=300)
    if rc != 0:
        print("Build FAILED! rc =", rc)
        return

    print("\n=== Start/Restart PM2 ===")
    run(ssh, "pm2 delete portfolio 2>/dev/null; true")
    run(ssh, "cd /var/www/portfolio && pm2 start npm --name portfolio -- start")
    run(ssh, "pm2 save")

    import time
    time.sleep(4)
    run(ssh, "pm2 status")
    out, _, _ = run(ssh, "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000")
    print(f"\nHTTP status from localhost:3000 => {out.strip()}")

    print("\n=== Verify Nginx ===")
    out, _, _ = run(ssh, "curl -s -o /dev/null -w '%{http_code}' http://38.244.130.150/")
    print(f"HTTP status from public IP => {out.strip()}")

    print("\nApp running at http://38.244.130.150")
    ssh.close()


if __name__ == "__main__":
    main()
