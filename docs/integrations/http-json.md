---
sidebar_position: 4
title: HTTP/JSON
---

# Generic HTTP/JSON

Connect any REST API that returns JSON. Extract values using dot-notation field mappings.

**Edition:** Community (CE)

## Configuration

```json
{
  "adapter": "http-json",
  "name": "Custom API",
  "config": {
    "url": "https://api.example.com/metrics",
    "method": "GET",
    "headers": { "X-API-Key": "..." },
    "bearerToken": "optional-token",
    "mappings": [
      { "path": "data.cpu.usage", "name": "CPU Usage", "unit": "percent" },
      { "path": "data.memory.used", "name": "Memory Used", "unit": "bytes" },
      { "path": "items.0.status", "name": "Primary Status" }
    ]
  },
  "poll_interval": 60
}
```

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `url` | Yes | — | API endpoint URL |
| `method` | No | `GET` | HTTP method (`GET` or `POST`) |
| `headers` | No | — | Custom headers |
| `bearerToken` | No | — | Bearer auth token |
| `body` | No | — | Request body (for POST) |
| `mappings` | No | — | Field extraction rules |

## Field Mappings

Mappings use **dot-notation paths** to extract values from the JSON response:

| Path | JSON | Value |
|------|------|-------|
| `data.cpu` | `{"data":{"cpu":42.5}}` | `42.5` |
| `items.0.name` | `{"items":[{"name":"web"}]}` | `"web"` |
| `status` | `{"status":"ok"}` | `"ok"` |

- **Numeric values** are stored as Metrics (with optional `unit` and `labels`)
- **Non-numeric values** are stored as Events
- **No mappings configured** — the entire response is stored as a single Event (truncated to 4KB)
