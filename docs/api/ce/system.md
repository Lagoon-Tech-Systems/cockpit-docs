---
sidebar_position: 4
title: System
---

# System

## `GET /api/overview`

System health dashboard — CPU, RAM, disk, containers, stacks.

**Response:**
```json
{
  "serverName": "Production VPS",
  "system": { "cpuPercent": 12.5, "memory": {...}, "disk": {...}, "load": [0.5, 0.3, 0.2] },
  "containers": { "running": 8, "stopped": 2, "total": 10 },
  "stacks": { "healthy": 3, "degraded": 0 },
  "sseClients": 2,
  "timestamp": "2026-03-29T10:00:00Z"
}
```

## `GET /api/system/metrics`

Current system metrics (CPU, memory, disk, load, uptime).

## `GET /api/system/docker`

Docker Engine info and disk usage.

## `GET /api/system/disk`

Detailed disk usage breakdown by category.

**Response:**
```json
{
  "containers": { "count": 10, "size": 1073741824 },
  "images": { "count": 15, "size": 2147483648 },
  "volumes": { "count": 5, "size": 536870912 },
  "buildCache": { "size": 268435456 },
  "totalSize": 4026531840
}
```

## `POST /api/system/prune` <span class="badge badge--warning">admin</span>

Clean up unused Docker resources.

**Request:**
```json
{ "includeVolumes": false }
```

## `GET /api/endpoints`

Probe all configured HTTP endpoints (set via `ENDPOINTS` env var).

## `GET /api/ssl`

Check SSL certificate expiry for configured domains (set via `SSL_DOMAINS` env var).

## `GET /api/metrics/history`

Historical metrics time series.

| Query Param | Default | Range | Description |
|-------------|---------|-------|-------------|
| `hours` | `24` | 1-168 | Hours of history |

## `GET /api/stream`

Server-Sent Events stream. Broadcasts system metrics, container states, and alerts every 15 seconds.

```bash
curl -N -H "Authorization: Bearer $TOKEN" https://cockpit.example.com/api/stream
```

## `GET /api/health`

Detailed health check.

## `GET /metrics`

Prometheus metrics export (37+ metrics). Secured with `METRICS_TOKEN` env var.

```bash
curl -H "Authorization: Bearer your-metrics-token" https://cockpit.example.com/metrics
```

## `POST /api/push/register`

Register a device push notification token (Expo).

**Request:**
```json
{ "token": "ExponentPushToken[...]" }
```
