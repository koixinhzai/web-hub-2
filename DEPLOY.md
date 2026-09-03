# Deploy notes — Serene Spa Directory

## 1. Local setup (first time)

```bash
npm install
copy .env.example .env      # then edit .env with your real DB credentials
```

Create the database + tables:

```bash
mysql -u root -p < sql/schema.sql
```

Import the demo data (reads directly from `src/data/*.js`, so it always matches what
used to be hardcoded in the frontend):

```bash
npm run seed
```

This creates a default admin login: **username `admin` / password `admin123`** — log in at
`/admin/login` and create your own admin account (or at least change this password) before
going live, from **Admin accounts** in the sidebar.

## 2. Local development

Run the API and the Vite dev server together:

```bash
npm run dev:all
```

- Frontend: http://localhost:5174 (Vite dev server, proxies `/api` and `/uploads` to the API)
- API: http://localhost:3001

## 3. Deploying to hosting

1. **Database**: create a MySQL database on the host, then import the schema:
   ```bash
   mysql -u <host_user> -p <host_db_name> < sql/schema.sql
   ```
   Run `npm run seed` once (pointed at the host DB via `.env`) if you want the demo data,
   or insert your own data via the `/admin` panel afterwards.

2. **Environment**: on the host, create a `.env` (or set env vars in the hosting panel) with:
   `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET` (a long random
   string, different from the dev one), `PORT`, and `NODE_ENV=production`.

3. **Build the frontend**:
   ```bash
   npm run build
   ```
   This produces `dist/`.

4. **Run the Node server**: with `NODE_ENV=production`, `server/index.js` also serves the
   built `dist/` folder and the `/uploads` folder, so a single Node process serves the
   entire site (public pages, `/admin`, and the API):
   ```bash
   npm start
   ```
   Use a process manager (pm2, systemd, or the hosting platform's Node app runner) to keep
   it running.

5. **Uploaded images**: admin-uploaded images are written to `server/uploads/`. If your
   hosting platform has an ephemeral filesystem (redeploys wipe local files), point that
   folder at a persistent disk/volume, or swap `server/middleware/upload.js` for an
   object-storage backend later — the rest of the app only depends on `spa_images.url`
   being a reachable path, so that swap is isolated to one file.

## Notes

- Public read endpoints (`GET /api/...`) require no auth. Every create/update/delete route
  requires a valid `Authorization: Bearer <token>` from `POST /api/auth/login`.
- The price-range filter (`under300` / `300to500` / `over500`) intentionally reproduces the
  original frontend's thresholds (compared against 300000/500000 while demo prices are in
  the hundreds), to keep behavior identical to the pre-existing mock UI. Adjust in
  `server/routes/spas.routes.js` if you want it fixed.
