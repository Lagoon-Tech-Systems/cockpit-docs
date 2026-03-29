---
sidebar_position: 10
title: Edition Comparison
---

# Edition Comparison

Lagoon Cockpit comes in three editions. The Community Edition is free and open-source. Pro and Enterprise require a license key.

## Feature Matrix

### Core Platform

| Feature | Community | Pro | Enterprise |
|---------|:---------:|:---:|:----------:|
| Container management (start, stop, restart, logs, exec) | Yes | Yes | Yes |
| Compose stack management | Yes | Yes | Yes |
| System metrics dashboard | Yes | Yes | Yes |
| Alert rules | 5 | 100 | Unlimited |
| Webhooks | 3 | 50 | Unlimited |
| Scheduled actions | 5 | 50 | Unlimited |
| Real-time SSE stream | Yes | Yes | Yes |
| Prometheus metrics export | Yes | Yes | Yes |
| CLI tool | Yes | Yes | Yes |
| Windows agent support | Yes | Yes | Yes |
| Multi-server | 3 servers | 20 servers | Unlimited |
| Users (RBAC) | 1 user | 5 users | Unlimited |
| Audit trail | — | 30 days | Unlimited + Export |
| Biometric lock | Yes | Yes | Yes |

### Data Integrations

| Adapter | Community | Pro | Enterprise |
|---------|:---------:|:---:|:----------:|
| Prometheus | Yes | Yes | Yes |
| Grafana | Yes | Yes | Yes |
| HTTP/JSON (generic) | Yes | Yes | Yes |
| Datadog | - | Yes | Yes |
| CloudWatch | - | Yes | Yes |
| PagerDuty | - | Yes | Yes |
| Max integrations | 2 | 10 | Unlimited |

### Pro Features

| Feature | Community | Pro | Enterprise |
|---------|:---------:|:---:|:----------:|
| Push notifications | - | Yes | Yes |
| Incident management | - | Yes | + War Room, Postmortem |
| Automated remediation | - | 10 rules | Unlimited + Runbooks |
| Public status pages | - | 3 pages | Unlimited + Custom Domain |
| Uptime monitoring | - | 25 endpoints | Unlimited |
| SLA tracking + error budgets | - | Basic | Full + PDF Export |
| ChatOps (Telegram + Slack) | - | Yes | + WhatsApp |

### Enterprise Features

| Feature | Community | Pro | Enterprise |
|---------|:---------:|:---:|:----------:|
| SSO / SAML 2.0 | - | - | Yes |
| White-label branding | - | - | Yes |
| Custom roles (granular RBAC) | - | - | Yes |
| IP allowlist | - | - | Yes |
| Mutual TLS (mTLS) | - | - | Yes |
| Encryption at rest (SQLCipher) | - | - | Yes |
| Compliance logging (SOC2) | - | - | Yes |

## Activating a License

### Via Environment Variable

```bash
LICENSE_KEY=eyJhbGciOiJSUzI1NiIs...
```

### Via File

Place the license key in `data/license.key` inside the Cockpit data directory.

### Verification

Licenses are validated offline using RS256 signatures — no phone-home. The license contains:

- Edition (pro/enterprise)
- Expiration date
- Feature flags

```bash
curl http://localhost:3000/api/edition \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**
```json
{
  "edition": "pro",
  "features": ["incidents", "remediation", "status_pages", "uptime", "chatops", "sla"],
  "limits": { "servers": 10, "users": 25 },
  "extensions": [{ "name": "cockpit-pro", "version": "1.0.0" }]
}
```

### Grace Period

If a license expires, all features remain active for **14 days** to give you time to renew.

## Upgrading

1. Purchase a license at [lagoontechsystems.com](https://lagoontechsystems.com)
2. Set the `LICENSE_KEY` environment variable
3. Install the Pro/Enterprise extension package in the extensions directory
4. Restart Cockpit

No data migration is needed — Pro and Enterprise features create their own tables alongside the CE database.
