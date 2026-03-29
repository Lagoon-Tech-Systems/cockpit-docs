---
sidebar_position: 1
title: Overview
---

# Data Integrations

Cockpit can pull data from external monitoring sources and display it alongside your Docker metrics. Each integration uses an **adapter** that knows how to connect, authenticate, and normalize data from a specific platform.

## Available Adapters

| Adapter | Edition | What it pulls |
|---------|---------|--------------|
| [Prometheus](/integrations/prometheus) | CE | Metrics (PromQL) + active alerts |
| [Grafana](/integrations/grafana) | CE | Alert rules + annotations |
| [HTTP/JSON](/integrations/http-json) | CE | Any REST API with field mappings |
| [Datadog](/integrations/datadog) | Pro | Monitors, events, CPU metrics |
| [CloudWatch](/integrations/cloudwatch) | Pro | Alarms + EC2 metrics |
| [PagerDuty](/integrations/pagerduty) | Pro | Incidents + response analytics |

## How It Works

1. **Create** an integration via the API or mobile app
2. **Configure** the adapter-specific connection settings
3. **Test** the connection to verify credentials
4. Cockpit **polls** the source at the configured interval (default 30-60s)
5. Data is **normalized** into standard types (Metrics, Alerts, Events)
6. View the data in the dashboard or query via `/api/integrations/:id/data`

## Data Types

All adapters normalize their data into these standard types:

### Metrics
Numeric values with a name, unit, and labels.
```json
{ "type": "metric", "name": "cpu_usage", "value": 42.5, "unit": "percent", "labels": { "host": "web-01" } }
```

### Alerts
Active alert states with severity.
```json
{ "type": "alert", "name": "High CPU", "severity": "critical", "status": "firing" }
```

### Events
Timestamped occurrences (annotations, resolved incidents, etc.).
```json
{ "type": "event", "title": "Deploy completed", "detail": "v2.1.0 rolled out" }
```

## Creating an Integration

```bash
curl -X POST http://localhost:3000/api/integrations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "adapter": "prometheus",
    "name": "Production Prometheus",
    "config": { "url": "http://prometheus:9090" },
    "poll_interval": 30
  }'
```

## Limits

| Edition | Max Integrations |
|---------|-----------------|
| CE | 10 |
| Pro | Unlimited |
| Enterprise | Unlimited |
