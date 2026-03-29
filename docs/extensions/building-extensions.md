---
sidebar_position: 2
title: Building Extensions
---

# Building Custom Extensions

Create your own extensions to add features to Cockpit.

## Extension Structure

```
my-extension/
  package.json
  src/
    index.js
```

## Package.json

```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "main": "src/index.js"
}
```

## Entry Point

Your extension must export `name`, `version`, and an `init` function:

```javascript
module.exports = {
  name: 'my-extension',
  version: '1.0.0',

  init(router, services) {
    const { db, broadcast, auditLog, sendPushNotification, webhooks } = services;

    // Create your tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS ext_my_extension_items (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Define routes
    router.get('/items', (req, res) => {
      const items = db.prepare('SELECT * FROM ext_my_extension_items').all();
      res.json({ items });
    });

    router.post('/items', (req, res) => {
      const { name } = req.body;
      const id = crypto.randomUUID();
      db.prepare('INSERT INTO ext_my_extension_items (id, name) VALUES (?, ?)').run(id, name);
      auditLog('create', 'item', id, { name });
      res.status(201).json({ id, name });
    });
  }
};
```

## Available Services

The `services` object provides:

| Service | Description |
|---------|-------------|
| `db` | Scoped database (see below) |
| `broadcast` | Pub/sub for real-time events |
| `sendPushNotification` | Send push notifications |
| `auditLog` | Write to the audit log |
| `alertEngine` | Alert rule evaluation engine |
| `metricsHistory` | Metrics storage and retrieval |
| `webhooks` | Fire webhook events |

## Scoped Database

Your extension receives a **scoped database** — not the raw SQLite handle. This enforces isolation:

- You can **only** access tables prefixed with `ext_{your_extension_name}_`
- Table names are validated at query time
- Attempting to access other tables throws an error

```javascript
// Allowed
db.exec('CREATE TABLE ext_my_extension_items (...)');
db.prepare('SELECT * FROM ext_my_extension_items').all();

// Blocked — throws error
db.prepare('SELECT * FROM users').all();
db.prepare('SELECT * FROM ext_other_plugin_data').all();
```

The `db` interface matches `better-sqlite3`:
- `db.exec(sql)` — execute raw SQL
- `db.prepare(sql)` — prepare a statement (`.run()`, `.get()`, `.all()`)

## Route Mounting

Your routes are automatically mounted at `/api/ext/{name}/`. You don't need to include the prefix:

```javascript
// This becomes: GET /api/ext/my-extension/items
router.get('/items', (req, res) => { ... });
```

## Security Notes

- Extensions cannot access the raw database or other extensions' data
- Extensions cannot modify the Express app directly (only their scoped router)
- All input validation is your responsibility
- Use `services.auditLog()` for mutation tracking
- Follow the same security practices as the core API (validate inputs, sanitize outputs)
