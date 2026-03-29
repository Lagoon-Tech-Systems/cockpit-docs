---
sidebar_position: 4
title: Uptime Monitoring
---

# Uptime Monitoring

HTTP, TCP, and DNS endpoint monitoring with automatic incident detection.

**Base path:** `/api/ext/cockpit-pro/uptime`

## Monitors

### `GET /monitors`

List all monitors with their last status and response time.

### `POST /monitors`

Create an uptime monitor.

**Request:**
```json
{
  "name": "Production API",
  "url": "https://api.example.com/health",
  "type": "http",
  "method": "GET",
  "expected_status": 200,
  "timeout_ms": 5000,
  "interval_seconds": 60,
  "headers": { "Authorization": "Bearer ..." },
  "body": null
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `type` | `http` | `http`, `tcp`, or `dns` |
| `method` | `GET` | HTTP method |
| `expected_status` | `200` | Expected HTTP status code |
| `timeout_ms` | `5000` | Request timeout |
| `interval_seconds` | `60` | Check interval |

### `GET /monitors/:id`

Get monitor with recent checks and uptime stats.

### `PUT /monitors/:id`

Update monitor configuration.

### `DELETE /monitors/:id`

Delete monitor and all associated checks.

### `POST /monitors/:id/pause`

Pause monitoring (stops scheduled checks).

### `POST /monitors/:id/resume`

Resume monitoring.

### `POST /monitors/:id/check`

Trigger an immediate check.

**Response:**
```json
{
  "monitor_id": "uuid",
  "status": "up",
  "response_time_ms": 145,
  "status_code": 200
}
```

## Checks & Stats

### `GET /monitors/:id/checks`

Paginated check history.

### `GET /monitors/:id/stats`

Uptime statistics over 24h, 7d, and 30d windows.

**Response:**
```json
{
  "stats": {
    "uptime_percent": 99.95,
    "avg_response_time_ms": 142,
    "total_checks": 1440,
    "total_downtime_seconds": 43
  }
}
```

## Incidents

### `GET /incidents`

List all uptime-generated incidents. Filter by `monitor_id` and `status`.

### `GET /monitors/:id/incidents`

Incidents for a specific monitor.

**Limits:** 25 monitors on Pro, unlimited on Enterprise.
