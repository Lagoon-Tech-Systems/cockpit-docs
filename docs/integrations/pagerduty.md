---
sidebar_position: 7
title: PagerDuty
---

# PagerDuty

Pull incident states and response analytics from PagerDuty.

**Edition:** Pro

## Configuration

```json
{
  "adapter": "pagerduty",
  "name": "PagerDuty",
  "config": {
    "api_token": "your-pd-api-token"
  },
  "poll_interval": 30
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `api_token` | Yes | PagerDuty REST API v2 token |

## What It Pulls

### Alerts
Active incidents (triggered + acknowledged, up to 25). Urgency is mapped:
- `high` → `critical`
- `low` → `low`
- Other → `medium`

### Events
Recently resolved incidents (last 24 hours, up to 25) with service name and resolution time.

### Metrics
Incident analytics for the last 24 hours:
- `mean_time_to_resolve` (seconds)
- `total_incidents_24h` (count)
- `mean_time_to_acknowledge` (seconds)
- `total_interruptions_24h` (count)
