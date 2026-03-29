---
sidebar_position: 8
title: Custom Adapters
---

# Building Custom Adapters

You can add custom integration adapters by creating a new adapter file in the integrations directory.

## Adapter Contract

Every adapter extends `BaseAdapter` and implements these methods:

```javascript
const BaseAdapter = require('./base');

class MyAdapter extends BaseAdapter {
  // Return the adapter identifier
  static get name() { return 'my-adapter'; }

  // Define required and optional config fields
  static configSchema() {
    return {
      required: ['url', 'apiKey'],
      optional: ['poll_interval'],
      sensitive: ['apiKey'],
    };
  }

  // Validate the provided configuration
  async validateConfig(config) {
    if (!config.url) throw new Error('URL is required');
  }

  // Test the connection (called by POST /integrations/:id/test)
  async testConnection(config) {
    const res = await this.safeFetch(config.url + '/health', {
      headers: { 'Authorization': `Bearer ${config.apiKey}` },
      timeout: 10000,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { ok: true };
  }

  // Poll for data (called on each interval)
  async pull(config) {
    const data = [];

    // Fetch and normalize your data
    const res = await this.safeFetch(config.url + '/metrics', {
      headers: { 'Authorization': `Bearer ${config.apiKey}` },
      timeout: 15000,
    });
    const json = await res.json();

    // Return normalized data types
    data.push({
      type: 'metric',
      name: 'my_metric',
      value: json.value,
      unit: 'percent',
      labels: { source: 'my-adapter' },
    });

    return data;
  }
}

module.exports = MyAdapter;
```

## Data Types

Your `pull()` method should return an array of normalized objects:

### Metric
```javascript
{ type: 'metric', name: 'cpu_usage', value: 42.5, unit: 'percent', labels: {} }
```

### Alert
```javascript
{ type: 'alert', name: 'High CPU', severity: 'critical', status: 'firing' }
```

### Event
```javascript
{ type: 'event', title: 'Deploy completed', detail: 'v2.1.0' }
```

## Safety

- Use `this.safeFetch()` instead of raw `fetch` — it validates URLs against SSRF (blocks private/internal addresses)
- Mark sensitive config fields in `configSchema()` — they'll be redacted in API responses
- Set reasonable timeouts (10-15s) on all HTTP requests
- Handle errors gracefully — a failed pull should not crash the polling loop

## Registration

Adapters are auto-discovered from the adapters directory. Place your file alongside the existing adapters and it will be available as an integration type.
