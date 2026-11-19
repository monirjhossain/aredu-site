# Auto-deploy (areducation.net)

Push to `main` → GitHub Actions builds Vue → FTP uploads `dist/` to cPanel `public_html`.

## GitHub Secrets (aredu-site)

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Example value |
|--------|----------------|
| `FTP_SERVER` | `ftp.areducation.net` or `63.250.38.167` |
| `FTP_USERNAME` | cPanel/FTP user (e.g. `aredkrko`) |
| `FTP_PASSWORD` | FTP password |
| `FTP_SERVER_DIR` | `/public_html/` |
| `VITE_API_BASE_URL` | `https://office.areducation.net/api` |

## First-time check

1. Add secrets above
2. Actions → **Deploy site to cPanel** → Run workflow (or push to `main`)
3. Open https://areducation.net

Do **not** put `.env` production secrets in the repo. `VITE_API_BASE_URL` is public by design.
