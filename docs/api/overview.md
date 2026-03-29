---
sidebar_position: 1
slug: /api/overview
title: API Overview
---

# API Overview

Lagoon Cockpit exposes a REST API for managing Docker infrastructure. All endpoints return JSON and require authentication.

## Base URL

```
https://your-cockpit-instance:3000
```

## Authentication

All API calls (except health checks) require a Bearer token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer $TOKEN" https://cockpit.example.com/api/containers
```

### Getting a Token

**API Key mode** (`AUTH_MODE=key`):

```bash
curl -X POST https://cockpit.example.com/auth/token \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-secret-key"}'
```

**Multi-user mode** (`AUTH_MODE=users`):

```bash
curl -X POST https://cockpit.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your-password"}'
```

Both return:

```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "role": "admin",
  "serverName": "Production VPS"
}
```

### Refreshing Tokens

```bash
curl -X POST https://cockpit.example.com/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "eyJ..."}'
```

## Roles

| Role | Permissions |
|------|------------|
| `admin` | Full access — create users, manage settings, exec commands |
| `operator` | Start/stop/restart containers, manage stacks |
| `viewer` | Read-only — view metrics, containers, logs |

## API Structure

### Community Edition (CE)

| Prefix | Description |
|--------|-------------|
| `/auth/*` | Authentication and user management |
| `/api/containers/*` | Container lifecycle and logs |
| `/api/stacks/*` | Docker Compose stack management |
| `/api/overview` | System dashboard |
| `/api/system/*` | System metrics, Docker info |
| `/api/alerts/*` | Alert rules and events |
| `/api/webhooks` | Webhook management |
| `/api/schedules/*` | Scheduled container actions |
| `/api/integrations/*` | Data source integrations |
| `/api/networks` | Docker networks |
| `/api/volumes` | Docker volumes |
| `/api/images` | Docker images |
| `/api/stream` | Server-Sent Events |
| `/metrics` | Prometheus export |

### Pro Extension

All Pro routes are mounted at `/api/ext/cockpit-pro/`:

| Prefix | Description |
|--------|-------------|
| `/api/ext/cockpit-pro/incidents/*` | Incident management |
| `/api/ext/cockpit-pro/remediation/*` | Automated remediation rules |
| `/api/ext/cockpit-pro/status-pages/*` | Public status pages |
| `/api/ext/cockpit-pro/uptime/*` | Uptime monitoring |
| `/api/ext/cockpit-pro/chatops/*` | Telegram & Slack integration |
| `/api/ext/cockpit-pro/sla/*` | SLA tracking & error budgets |

### Enterprise Extension

All Enterprise routes are mounted at `/api/ext/cockpit-enterprise/`:

| Prefix | Description |
|--------|-------------|
| `/api/ext/cockpit-enterprise/sso/*` | SSO/SAML authentication |
| `/api/ext/cockpit-enterprise/branding/*` | White-label branding |
| `/api/ext/cockpit-enterprise/roles/*` | Custom roles (RBAC) |
| `/api/ext/cockpit-enterprise/ip-allowlist/*` | IP/CIDR access control |
| `/api/ext/cockpit-enterprise/mtls/*` | Mutual TLS for agents |
| `/api/ext/cockpit-enterprise/encryption/*` | Encryption management |
| `/api/ext/cockpit-enterprise/compliance/*` | Compliance audit logging |

## Error Responses

All errors follow this format:

```json
{
  "error": "Human-readable error message"
}
```

| Status | Meaning |
|--------|---------|
| `400` | Bad request (validation error) |
| `401` | Unauthorized (missing or invalid token) |
| `402` | Edition limit reached (upgrade required) |
| `403` | Forbidden (insufficient role) |
| `404` | Resource not found |
| `409` | Conflict (duplicate resource) |
| `500` | Server error |

### Edition Limit Response (402)

```json
{
  "error": "Resource limit reached (integrations)",
  "current": 10,
  "max": 10,
  "currentEdition": "ce",
  "upgradeUrl": "https://lagoontechsystems.com/upgrade"
}
```

## Pagination

Most list endpoints support pagination:

```bash
GET /api/alerts/events?limit=50&offset=100
```

- `limit` — Number of items per page (default varies, max 500)
- `offset` — Number of items to skip (default 0)

## Real-Time Updates (SSE)

Connect to the Server-Sent Events stream for live updates:

```bash
curl -N -H "Authorization: Bearer $TOKEN" https://cockpit.example.com/api/stream
```

Events are broadcast every 15 seconds with system metrics, container states, and alert updates.
