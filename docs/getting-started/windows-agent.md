---
sidebar_position: 4
title: Windows Agent
---

# Windows Agent

A standalone REST API agent for managing Windows Server infrastructure. It exposes the same interface as the main Cockpit API, so the mobile app treats it as another server profile.

## Requirements

- Windows Server 2019+ (or Windows 10/11 for development)
- Python 3.10+
- Administrator privileges (for service/process management)

## Install

### 1. Clone and install dependencies

```powershell
cd C:\cockpit-agent
pip install -r requirements.txt
```

**Dependencies:**
- `flask` — HTTP server
- `waitress` — Production WSGI server
- `psutil` — System metrics
- `pywin32` — Windows service management
- `PyJWT` — JWT authentication
- `python-dotenv` — Environment config

### 2. Configure environment

Create a `.env` file:

```bash
API_KEY=your-secret-key
JWT_SECRET=same-as-your-cockpit-api-jwt-secret
SERVER_NAME=Windows VPS
PORT=3001
```

Use the **same `JWT_SECRET`** as your main Cockpit API so the mobile app can authenticate with both servers seamlessly.

### 3. Run the agent

```powershell
# Development
python agent.py

# Production (Waitress WSGI)
python -c "from waitress import serve; from agent import app; serve(app, host='0.0.0.0', port=3001)"
```

### 4. Install as a Windows service (optional)

```powershell
python install_service.bat
```

Or use the PowerShell deployment script:

```powershell
.\deploy.ps1
```

## Features

### System Metrics
CPU, RAM, disk usage, and network stats — same format as the Linux API. The mobile app renders these in the dashboard gauges.

### Windows Services
List, start, stop, and restart Windows services. Filter by status (running, stopped).

### Process Management
View running processes with CPU/memory usage. Kill processes by PID.

### Event Log
Read Windows Event Log entries (Application, System, Security). Filter by level and source.

### Real-Time Updates
Server-Sent Events (SSE) stream for live metric updates, just like the Docker API.

## Connect from the Mobile App

1. Open the Cockpit mobile app
2. Tap **Add Server**
3. Enter:
   - **Name**: "Windows VPS"
   - **URL**: `http://your-windows-server:3001`
   - **API Key**: The `API_KEY` from your Windows agent `.env`
4. Tap **Connect**

The Windows server appears alongside your Docker servers in the server selector.

## Connect from the CLI

```bash
cockpit connect http://your-windows-server:3001 your-api-key "Windows VPS"
cockpit use "Windows VPS"
cockpit overview
```

## Security

- Always run behind a reverse proxy with TLS in production
- Use the same `JWT_SECRET` as your main API for unified auth
- Set a strong `API_KEY` — this is the only authentication layer
- Restrict network access to the agent port (firewall rules)

## Troubleshooting

### "Access denied" on service operations
The agent must run with Administrator privileges to manage Windows services and processes.

### pywin32 import errors
Run `python Scripts/pywin32_postinstall.py -install` after installing pywin32 to register the COM objects.

### Agent not reachable from mobile app
- Check Windows Firewall allows inbound on port 3001
- If using Tailscale, verify the Tailscale IP is used in the connection URL
