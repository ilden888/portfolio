#!/usr/bin/env python3
import sys, paramiko
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect("38.244.130.150", username="root", password="uGN5qfsk8m", timeout=15)

deploy_sh = """#!/bin/bash
set -e
cd /var/www/portfolio
git pull origin master
npm install --prefer-offline
npm run build
pm2 restart portfolio || pm2 start npm --name portfolio -- start
pm2 save
echo "Deploy complete at $(date)"
"""

sftp = ssh.open_sftp()
with sftp.open('/root/deploy.sh', 'w') as f:
    f.write(deploy_sh)
sftp.chmod('/root/deploy.sh', 0o755)
sftp.close()
print("deploy.sh updated on server")
ssh.close()
