---
sidebar_position: 11
title: Environment Variables
---

# Environment Variables

Complete reference for all Cockpit configuration options.

## Authentication

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_MODE` | `key` | `key` (single-admin with API key) or `users` (multi-user with email/password) |
| `API_KEY` | *(required for key mode)* | Shared API key for authentication |
| `JWT_SECRET` | *(required)* | Secret for signing JWT tokens (min 32 chars recommended) |
| `ADMIN_EMAIL` | — | Initial admin email (users mode, first-run only) |
| `ADMIN_PASSWORD` | — | Initial admin password (users mode, first-run only) |

## Server

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | API server port |
| `SERVER_NAME` | `Server` | Display name shown in the mobile app |

## Security

| Variable | Default | Description |
|----------|---------|-------------|
| `FORCE_HTTPS` | `false` | Redirect HTTP to HTTPS (set `true` behind reverse proxy) |
| `CORS_ORIGINS` | *(empty)* | Comma-separated allowed origins (empty = allow all) |
| `RATE_LIMIT_MAX` | `100` | Max requests per minute per IP |
| `METRICS_TOKEN` | *(empty)* | Bearer token required for `/metrics` endpoint |

## Monitoring

| Variable | Default | Description |
|----------|---------|-------------|
| `ENDPOINTS` | *(empty)* | HTTP probe targets. Format: `Name\|URL\|ExpectedStatus` (comma-separated) |
| `SSL_DOMAINS` | *(empty)* | Domains to monitor SSL certificate expiry (comma-separated) |

## Licensing

| Variable | Default | Description |
|----------|---------|-------------|
| `LICENSE_KEY` | *(empty)* | JWT license key for Pro/Enterprise. CE mode if not set. Alternative: place key in `data/license.key` |

## Paths

| Variable | Default | Description |
|----------|---------|-------------|
| `PROC_PATH` | `/host/proc` | Mounted `/proc` path for system metrics |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Docker Engine socket path |
| `DATA_DIR` | `/app/data` | SQLite database and state files |
| `EXTENSIONS_DIR` | `/app/extensions` | Pro/Enterprise extension modules directory |

## Push Notifications

| Variable | Default | Description |
|----------|---------|-------------|
| `EXPO_ACCESS_TOKEN` | *(empty)* | Expo push notification token (Pro feature) |

## Enterprise

| Variable | Default | Description |
|----------|---------|-------------|
| `COCKPIT_BASE_URL` | *(from Host header)* | Base URL for SAML SP metadata generation |
| `MTLS_VERIFY_SECRET` | *(empty)* | Shared secret for mTLS verify endpoint |

## Example `.env`

```bash
# === Required ===
API_KEY=change-me-to-a-strong-key
JWT_SECRET=change-me-to-a-64-char-random-string

# === Recommended ===
AUTH_MODE=users
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-after-first-login
SERVER_NAME=Production VPS
FORCE_HTTPS=true
CORS_ORIGINS=https://cockpit.example.com

# === Monitoring ===
ENDPOINTS=API|https://api.example.com/health|200,Website|https://example.com|200
SSL_DOMAINS=example.com,api.example.com
METRICS_TOKEN=your-prometheus-scrape-token

# === License (optional) ===
LICENSE_KEY=eyJhbGciOiJSUzI1NiIs...
```
