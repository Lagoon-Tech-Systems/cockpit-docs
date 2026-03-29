---
sidebar_position: 5
title: Datadog
---

# Datadog

Pull monitor states, events, and metrics from Datadog.

**Edition:** Pro

## Configuration

```json
{
  "adapter": "datadog",
  "name": "Datadog Production",
  "config": {
    "api_key": "your-dd-api-key",
    "app_key": "your-dd-app-key",
    "site": "datadoghq.com"
  },
  "poll_interval": 30
}
```

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `api_key` | Yes | — | Datadog API key |
| `app_key` | Yes | — | Datadog application key |
| `site` | No | `datadoghq.com` | Datadog site (`datadoghq.eu`, etc.) |

## What It Pulls

### Alerts
All monitors with their current state. Priority is mapped:
- Priority 1 → `critical`
- Priority 2 → `high`
- Priority 3 → `medium`
- Priority 4 → `low`
- Priority 5 → `info`

### Events
Recent events from the last 5 minutes.

### Metrics
CPU user time (`avg:system.cpu.user{*}`) averaged over the poll window.
