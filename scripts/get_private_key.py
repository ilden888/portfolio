#!/usr/bin/env python3
"""Get private key from server."""
import sys
import paramiko

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

HOST = "38.244.130.150"
USER = "root"
PASSWORD = "uGN5qfsk8m"

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASSWORD, timeout=15)
stdin, stdout, stderr = ssh.exec_command("cat /root/.ssh/id_rsa")
key = stdout.read().decode("utf-8")
print(key)
ssh.close()
