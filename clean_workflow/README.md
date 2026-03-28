# Clean workflow for Supabase + GitHub deploy

Quick steps to use this clean workflow and deploy via GitHub Actions.

- **Secrets to add in GitHub repository settings:**
  - `SUPABASE_ACCESS_TOKEN` — a CLI access token (used by the Actions step to login)
  - `SUPABASE_PROJECT_REF` — your Supabase project ref (the short id shown in the Supabase dashboard)

- Optional runtime secret for function code (set in Supabase dashboard):
  - `SUPABASE_SERVICE_ROLE_KEY` — service role key (do NOT store as a public repo secret if you can set it in Supabase project settings instead)

Usage:

1. Review the `clean_workflow/supabase/functions` folder and customize as needed.
2. Commit and push the changes to `main` (or open a PR to `main`). The workflow `.github/workflows/deploy-supabase.yml` runs on push to `main`.

Example push commands:

```
git add clean_workflow .github/workflows/deploy-supabase.yml
git commit -m "Add clean Supabase workflow and functions"
git push origin main
```

After pushing, confirm the workflow run in the repository's Actions tab and verify the Supabase project for deployed functions.
