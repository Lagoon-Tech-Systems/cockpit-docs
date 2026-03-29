---
sidebar_position: 1
title: Docker Self-Hosting
---

# Docker Self-Hosting

Deploy Lagoon Cockpit on any Linux server with Docker installed.

## Requirements

- Docker Engine 20.10+
- 256MB RAM, 0.25 CPU (resource limits)
- Docker socket access (`/var/run/docker.sock`)

## Quick Start

```bash
docker run -d \
  --name cockpit \
  -e API_KEY=your-secret-key \
  -e JWT_SECRET=$(openssl rand -hex 32) \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /proc:/host/proc:ro \
  -p 3000:3000 \
  ghcr.io/lagoon-tech-systems/cockpit:latest
```

Verify it's running:

```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

## Docker Compose (Recommended)

Create a `docker-compose.yml`:

```yaml
services:
  cockpit:
    image: ghcr.io/lagoon-tech-systems/cockpit:latest
    restart: unless-stopped
    env_file: .env
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /proc:/host/proc:ro
      - cockpit_data:/app/data
    ports:
      - "3000:3000"
    deploy:
      resources:
        limits:
          cpus: "0.25"
          memory: 256M

volumes:
  cockpit_data:
```

Create a `.env` file:

```bash
# Required
API_KEY=your-secret-key
JWT_SECRET=$(openssl rand -hex 32)

# Optional
AUTH_MODE=key
SERVER_NAME=Production VPS
```

Start the service:

```bash
docker compose up -d
```

## Authentication Modes

### API Key Mode (default)

Single-admin access using a shared API key. Best for personal use.

```bash
AUTH_MODE=key
API_KEY=your-secret-key
```

### Multi-User Mode

Full user management with JWT auth, roles, and RBAC. Best for teams.

```bash
AUTH_MODE=users
JWT_SECRET=random-64-char-string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me
```

On first startup, the admin account is created automatically. Change the password immediately after first login.

## Reverse Proxy (Nginx)

For production deployments behind a reverse proxy:

```nginx
server {
    listen 443 ssl http2;
    server_name cockpit.example.com;

    ssl_certificate /etc/letsencrypt/live/cockpit.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cockpit.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # SSE support
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 86400s;
    }
}
```

Set `FORCE_HTTPS=true` and `CORS_ORIGINS=https://cockpit.example.com` in your `.env`.

## Extensions (Pro/Enterprise)

Pro and Enterprise modules are loaded from the extensions directory:

```yaml
volumes:
  - cockpit-extensions:/app/extensions
```

To install an extension, place the package directory inside the extensions volume and restart:

```bash
docker compose restart cockpit
```

Extensions are auto-detected on startup. Check the loaded extensions:

```bash
curl http://localhost:3000/api/edition \
  -H "Authorization: Bearer $TOKEN"
```

## Prometheus Metrics

Cockpit exports 37+ metrics at `/metrics`. To scrape with Prometheus:

```yaml
scrape_configs:
  - job_name: 'cockpit'
    scrape_interval: 30s
    static_configs:
      - targets: ['cockpit:3000']
    metrics_path: '/metrics'
    authorization:
      type: Bearer
      credentials: your-metrics-token
```

Set `METRICS_TOKEN` in your `.env` to secure the endpoint.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `API_KEY` | *(required)* | Shared API key for `AUTH_MODE=key` |
| `JWT_SECRET` | *(required)* | Secret for signing JWT tokens |
| `AUTH_MODE` | `key` | `key` (single-admin) or `users` (multi-user) |
| `PORT` | `3000` | API port |
| `SERVER_NAME` | `Server` | Display name in the mobile app |
| `LICENSE_KEY` | *(empty)* | Pro/Enterprise license JWT (CE if empty) |
| `FORCE_HTTPS` | `false` | Redirect HTTP to HTTPS |
| `CORS_ORIGINS` | *(empty)* | Comma-separated allowed origins |
| `RATE_LIMIT_MAX` | `100` | Max requests per minute per IP |
| `METRICS_TOKEN` | *(empty)* | Bearer token for `/metrics` |
| `PROC_PATH` | `/host/proc` | Mounted `/proc` path |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Docker Engine socket |
| `DATA_DIR` | `/app/data` | SQLite DB + state files |
| `EXTENSIONS_DIR` | `/app/extensions` | Extension modules directory |
| `ENDPOINTS` | *(empty)* | HTTP probe targets (format: `Name\|URL\|ExpectedStatus`) |
| `SSL_DOMAINS` | *(empty)* | Domains to monitor SSL expiry |
| `EXPO_ACCESS_TOKEN` | *(empty)* | Expo push notification token (Pro) |

## Data Persistence

All state is stored in SQLite at `$DATA_DIR/cockpit.db` (WAL mode). Back up this file regularly:

```bash
# Copy the database while the container is running (WAL mode is safe for this)
docker cp cockpit:/app/data/cockpit.db ./cockpit-backup.db
```

## Upgrading

```bash
docker compose pull
docker compose up -d
```

The database schema auto-migrates on startup. No manual steps required.
