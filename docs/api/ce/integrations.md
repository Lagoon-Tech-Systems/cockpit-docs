---
sidebar_position: 8
title: Integrations
---

# Data Integrations

Connect external monitoring sources (Prometheus, Grafana, Datadog, etc.).

## `GET /api/integrations/adapters`

List available adapter types and their required config fields.

## `GET /api/integrations`

List all configured integrations.

## `GET /api/integrations/:id`

Get a single integration. Sensitive config fields (`apiKey`, `bearerToken`, `password`, etc.) are redacted.

## `POST /api/integrations` <span class="badge badge--warning">admin</span>

Create an integration.

**Request:**
```json
{
  "adapter": "prometheus",
  "name": "Production Prometheus",
  "config": { "url": "http://prometheus:9090" },
  "poll_interval": 60
}
```

**Available adapters:**

| Adapter | Edition | Config Fields |
|---------|---------|--------------|
| `prometheus` | CE | `url`, `bearerToken?` |
| `grafana` | CE | `url`, `apiKey` |
| `http-json` | CE | `url`, `method?`, `headers?`, `fieldMappings` |
| `datadog` | Pro | `apiKey`, `appKey`, `site?` |
| `cloudwatch` | Pro | `accessKeyId`, `secretAccessKey`, `region` |
| `pagerduty` | Pro | `apiKey`, `serviceIds?` |

## `PUT /api/integrations/:id` <span class="badge badge--warning">admin</span>

Update an integration.

## `DELETE /api/integrations/:id` <span class="badge badge--warning">admin</span>

Delete an integration.

## `POST /api/integrations/:id/test` <span class="badge badge--warning">admin</span>

Test the connection to the integration source.

## `POST /api/integrations/:id/poll` <span class="badge badge--warning">admin</span>

Force an immediate data poll from the integration.

## `GET /api/integrations/:id/data`

Query data fetched from the integration.

| Query Param | Default | Description |
|-------------|---------|-------------|
| `type` | — | Data type filter |
| `since` | — | Start timestamp |
| `until` | — | End timestamp |
| `limit` | `100` | Max results |
