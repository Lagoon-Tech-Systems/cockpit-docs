---
sidebar_position: 2
title: White-Label
---

# White-Label Branding

Customize the look and feel of your Cockpit instance — colors, logos, fonts, and custom CSS.

**Base path:** `/api/ext/cockpit-enterprise/branding`

## `GET /`

List all brand configurations (custom_css excluded from list for performance).

## `GET /active`

Get the currently active brand configuration. No auth required — used by the frontend to render branding.

## `GET /:id`

Get a brand configuration by ID (includes custom_css).

## `POST /`

Create a brand configuration.

**Request:**
```json
{
  "name": "Acme Corp",
  "app_name": "Acme Infra",
  "logo_url": "https://cdn.acme.com/logo.svg",
  "logo_dark_url": "https://cdn.acme.com/logo-dark.svg",
  "email_logo_url": "https://cdn.acme.com/email-logo.png",
  "primary_color": "#0e7490",
  "secondary_color": "#1e3a5f",
  "accent_color": "#f59e0b",
  "font_family": "Inter",
  "custom_css": ".sidebar { background: #1e3a5f; }"
}
```

| Field | Validation |
|-------|-----------|
| `logo_url`, `logo_dark_url`, `email_logo_url` | Must be valid HTTPS URLs |
| `font_family` | Alphanumeric, spaces, hyphens only |
| `custom_css` | Sanitized — blocks `expression()`, `javascript:`, `@import`, `</style` |

:::caution
Custom CSS is sanitized to prevent XSS. Blocked patterns include JavaScript expressions, external imports, and style tag escapes.
:::

## `PUT /:id`

Update a brand configuration.

## `DELETE /:id`

Delete a brand configuration.

## `PUT /:id/activate`

Set a brand as the active configuration. Only one brand can be active at a time — activating one deactivates the previous.
