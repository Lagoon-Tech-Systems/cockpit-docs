---
sidebar_position: 1
title: Incidents
---

# Incidents

Declare, track, and resolve incidents with timeline entries.

**Base path:** `/api/ext/cockpit-pro/incidents`

## `GET /`

List all incidents. Filter by status.

| Query Param | Description |
|-------------|-------------|
| `status` | Filter: `open`, `investigating`, `identified`, `monitoring`, `resolved` |
| `limit` | Max results |
| `offset` | Pagination offset |

## `GET /:id`

Get incident details with full timeline.

**Response:**
```json
{
  "id": "uuid",
  "title": "Database connection pool exhausted",
  "severity": "critical",
  "status": "investigating",
  "commander": "admin@example.com",
  "description": "...",
  "timeline": [
    { "type": "status_change", "message": "Incident opened", "created_at": "..." },
    { "type": "note", "message": "Identified root cause: connection leak", "created_at": "..." }
  ],
  "created_at": "...",
  "resolved_at": null
}
```

## `POST /`

Create a new incident.

**Request:**
```json
{
  "title": "Database connection pool exhausted",
  "severity": "critical",
  "commander": "admin@example.com",
  "description": "Production DB connections maxed out"
}
```

**Valid severities:** `critical`, `major`, `minor`, `info`

## `PUT /:id/status`

Update incident status.

**Request:**
```json
{ "status": "resolved", "message": "Fixed connection leak in pool config" }
```

## `POST /:id/timeline`

Add a timeline entry.

**Request:**
```json
{ "type": "note", "message": "Restarted connection pool, monitoring" }
```

## `DELETE /:id`

Delete an incident and its timeline.
