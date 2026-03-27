# Maseno University GIS web app

This monorepo contains a backend (Node + Express + pg) and frontend (React + Vite + React-Leaflet).

Checklist to run locally:

1. Backend: copy `backend/.env.example` to `backend/.env` and update `DATABASE_URL` to point to your local Postgres/PostGIS (pgAdmin) database.
2. From `backend/` run:

```powershell
npm install
npm run dev
```

3. Frontend: from `frontend/` run:

```powershell
npm install
npm run dev
```

Open `http://localhost:5173` for the frontend and backend on `http://localhost:4000`.

New deployment workflow (GitHub → Supabase, client-side fetch)
-------------------------------------------------------------

We now deploy the frontend as a static site on GitHub Pages. The frontend performs client-side fetches directly from Supabase at runtime (no Vercel/Render). Key notes:

- Add the following repository secrets in GitHub: `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- The Actions workflow (`.github/workflows/deploy_frontend.yml`) injects these values into the Vite build as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- The frontend should use `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY` (or `@supabase/supabase-js`) to initialize the Supabase client.

Deploy via GitHub Actions
- Push to `main` and the workflow will build `frontend` and publish to GitHub Pages automatically.

Supabase data copy
- The deploy script will no longer copy local Postgres data to Supabase by default. To enable a one-off copy, run the deploy script with `SUPABASE_COPY=1` set in the environment (or add it to `backend/.env`).

