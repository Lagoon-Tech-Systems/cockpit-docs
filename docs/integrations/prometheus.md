---
sidebar_position: 2
title: Prometheus
---

# Prometheus

Pull metrics and alerts from a Prometheus server using PromQL queries.

**Edition:** Community (CE)

## Configuration

```json
{
  "adapter": "prometheus",
  "name": "My Prometheus",
  "config": {
    "url": "http://prometheus:9090",
    "bearerToken": "optional-auth-token",
    "queries": [
      "up",
      "rate(http_requests_total[5m])",
      "node_memory_MemAvailable_bytes"
    ],
    "pullAlerts": true
  },
  "poll_interval": 30
}
```

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `url` | Yes | — | Prometheus base URL |
| `bearerToken` | No | — | Bearer token for auth |
| `basicAuth` | No | — | `{ username, password }` for basic auth |
| `queries` | No | `["up"]` | PromQL queries to execute |
| `pullAlerts` | No | `true` | Also pull active alerts |

## What It Pulls

### Metrics
Each PromQL query is executed via `/api/v1/query`. Results are normalized into metric objects with their Prometheus labels preserved.

### Alerts
Active alerts fetched from `/api/v1/alerts` with alert name, severity, and firing state.

## Prometheus Scraping Cockpit

Cockpit also **exports** metrics for Prometheus to scrape at `/metrics`:

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

This is a separate feature from the Prometheus integration — the integration **pulls from** Prometheus, while `/metrics` lets Prometheus **pull from** Cockpit.
