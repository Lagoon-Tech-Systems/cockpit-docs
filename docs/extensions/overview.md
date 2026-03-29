---
sidebar_position: 1
title: Extension System
---

# Extension System

Cockpit's Pro and Enterprise features are delivered as **extensions** — self-contained Node.js packages that plug into the API at runtime. The same system is available for building custom extensions.

## How Extensions Work

1. Extensions are placed in the `EXTENSIONS_DIR` directory (default: `/app/extensions`)
2. On startup, Cockpit scans the directory and loads each extension
3. Each extension gets a **scoped Express router** mounted at `/api/ext/{name}/`
4. Each extension gets a **scoped database** that can only access `ext_{name}_*` tables
5. Extensions are loaded in alphabetical order

## Built-in Extensions

| Extension | Package | Mount Point |
|-----------|---------|-------------|
| Cockpit Pro | `@lagoon/cockpit-pro` | `/api/ext/cockpit-pro/` |
| Cockpit Enterprise | `@cockpit-pro/enterprise-modules` | `/api/ext/cockpit-enterprise/` |

## Installing Extensions

### Docker Volume

Extensions are loaded from a Docker volume:

```yaml
volumes:
  - cockpit-extensions:/app/extensions
```

Copy the extension package into the volume:

```bash
docker cp ./my-extension cockpit:/app/extensions/my-extension
docker restart cockpit
```

### Verify

Check loaded extensions:

```bash
curl http://localhost:3000/api/edition \
  -H "Authorization: Bearer $TOKEN"
```

The response includes a list of loaded extensions and their versions.
