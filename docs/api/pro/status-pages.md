---
sidebar_position: 3
title: Status Pages
---

# Status Pages

Public-facing status pages with components, incidents, and subscriber notifications.

**Base path:** `/api/ext/cockpit-pro/status-pages`

## Pages

### `GET /`

List status pages with pagination.

### `POST /`

Create a status page.

**Request:**
```json
{
  "name": "Acme Status",
  "description": "System status for Acme Corp",
  "is_public": true,
  "custom_domain": "status.acme.com",
  "theme": { "primary_color": "#0e7490" }
}
```

A URL-friendly `slug` is auto-generated from the name.

### `GET /:pageId`

Get page with components and active incidents.

### `PUT /:pageId`

Update page settings.

### `DELETE /:pageId`

Delete page and all associated components, incidents, and subscribers.

## Components

### `GET /:pageId/components`

List components for a status page.

### `POST /:pageId/components`

Add a component.

**Request:**
```json
{
  "name": "API Server",
  "description": "Main REST API",
  "status": "operational",
  "display_order": 1,
  "group_name": "Backend"
}
```

**Valid statuses:** `operational`, `degraded_performance`, `partial_outage`, `major_outage`, `under_maintenance`

### `PUT /:pageId/components/:compId`

Update component status or details.

### `DELETE /:pageId/components/:compId`

Remove a component.

## Incidents

### `GET /:pageId/incidents`

List incidents for a status page. Filter by `status`.

### `POST /:pageId/incidents`

Create a status page incident.

**Request:**
```json
{
  "title": "API Latency Spike",
  "message": "Investigating increased response times",
  "severity": "major",
  "status": "investigating"
}
```

### `PUT /:pageId/incidents/:incId`

Update incident (resolving sets `resolved_at` automatically).

### `DELETE /:pageId/incidents/:incId`

Delete an incident.

## Subscribers

### `POST /:pageId/subscribers`

Subscribe to status updates via email or webhook.

**Request:**
```json
{ "email": "ops@acme.com" }
```
or
```json
{ "webhook_url": "https://hooks.slack.com/..." }
```

Returns a `verify_token` — subscriptions must be verified.

### `GET /:pageId/subscribers/verify/:token`

Verify a subscription.

### `DELETE /:pageId/subscribers/:subId`

Unsubscribe.

## Public Endpoint

### `GET /public/:slug`

Get the public-facing status page (no auth required).

**Response:**
```json
{
  "name": "Acme Status",
  "slug": "acme-status",
  "overall_status": "operational",
  "components": [...],
  "active_incidents": [...],
  "recent_incidents": [...]
}
```

**Limits:** 3 status pages on Pro, unlimited on Enterprise.
