---
sidebar_position: 3
title: Grafana
---

# Grafana

Pull alert rules and annotations from a Grafana instance.

**Edition:** Community (CE)

## Configuration

```json
{
  "adapter": "grafana",
  "name": "Production Grafana",
  "config": {
    "url": "http://grafana:3000",
    "serviceAccountToken": "glsa_...",
    "pullAnnotations": true
  },
  "poll_interval": 60
}
```

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `url` | Yes | — | Grafana base URL |
| `serviceAccountToken` | Yes* | — | Service account token (recommended) |
| `apiKey` | Yes* | — | Legacy API key (alternative) |
| `pullAnnotations` | No | `true` | Also pull recent annotations |

*One of `serviceAccountToken` or `apiKey` is required.

## What It Pulls

### Alerts
Provisioned alert rules from `/api/v1/provisioning/alert-rules` with their active/paused state and edit URLs.

### Annotations
Recent annotations within the poll window (2x poll interval for overlap). Includes dashboard and panel context.
