---
sidebar_position: 1
slug: /
title: Introduction
---

# Lagoon Cockpit

**The only self-hosted, mobile-first Docker management app.** Monitor, manage, and automate your infrastructure from your phone.

## What is Lagoon Cockpit?

Lagoon Cockpit is a lightweight, self-hosted platform for managing Docker containers across your servers. It gives you:

- A **native mobile app** (iOS/Android) for on-the-go management
- A **CLI tool** for terminal workflows
- A **REST API agent** that runs alongside your Docker Engine
- A **Windows agent** for managing Windows Server services

All of this in a 22MB Docker container with zero external dependencies.

## Architecture

```
Mobile App (iOS/Android)          CLI Tool
         \                        /
          \                      /
           +----- REST API -----+
                    |
            Cockpit API Agent        Windows Agent
           (Node.js + SQLite)       (Python + Flask)
                    |                     |
            Docker Engine            Windows Services
```

## Editions

Lagoon Cockpit comes in three editions:

| | Community (Free) | Pro | Enterprise |
|---|---|---|---|
| Container management | Yes | Yes | Yes |
| Compose stacks | Yes | Yes | Yes |
| Alert rules & webhooks | Yes | Yes | Yes |
| Data integrations | Prometheus, Grafana, HTTP | + Datadog, CloudWatch, PagerDuty | Unlimited |
| Incident management | - | Yes | + War Room, Postmortem |
| Status pages | - | 3 pages | Unlimited + Custom Domain |
| Uptime monitoring | - | 25 endpoints | Unlimited |
| SLA tracking | - | Basic | Full PDF Export |
| SSO/SAML | - | - | Yes |
| White-label branding | - | - | Yes |
| Custom roles (RBAC) | - | - | Yes |

See the full [Edition Comparison](/editions) for details.

## Getting Started

The fastest way to get started is with Docker:

```bash
docker run -d \
  --name cockpit \
  -e API_KEY=your-secret-key \
  -e JWT_SECRET=$(openssl rand -hex 32) \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /proc:/host/proc:ro \
  -p 3000:3000 \
  ghcr.io/lagoon-tech-systems/cockpit:latest
```

Then follow one of the setup guides:

- [Docker Self-Hosting](/getting-started/docker) — full deployment guide
- [Mobile App](/getting-started/mobile-app) — connect the iOS/Android app
- [CLI Tool](/getting-started/cli) — terminal-based management
- [Windows Agent](/getting-started/windows-agent) — manage Windows Server
