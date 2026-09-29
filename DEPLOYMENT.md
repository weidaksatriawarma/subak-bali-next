# Self-Hosted Deployment (Docker + Traefik)

This guide covers deploying `subak-bali-next` to your own VPS using Docker,
behind an existing Traefik reverse proxy. Supabase stays on Supabase Cloud —
only the Next.js app is self-hosted.

## 1. Prerequisites

On the VPS:

- Docker Engine + the Docker Compose plugin
- An existing Traefik instance already running as its own stack, attached to
  an external Docker network (commonly named `traefik`), with HTTPS
  (Let's Encrypt) already configured — this repo does not run Traefik itself,
  it only joins its network and adds routing labels.
- DNS: an A/AAAA record for your subdomain pointing at the VPS's public IP.

You'll need to know, from your existing Traefik setup:

- The external network name it's attached to (`docker network ls`)
- The name of its HTTPS entrypoint (commonly `websecure`)
- The name of its certificate resolver (commonly `letsencrypt`)

## 2. Get the code onto the server

```bash
git clone https://github.com/weidaksatriawarma/subak-bali-next.git
cd subak-bali-next
```

## 3. Configure environment

Two separate env files are used:

- **`.env`** (next to `docker-compose.yml`) — drives the build and the
  Traefik labels. Copy from [.env.deploy.example](.env.deploy.example):

  ```bash
  cp .env.deploy.example .env
  ```

  Fill in:
  - `DOMAIN` — your subdomain, e.g. `subak.yourdomain.com`
  - `TRAEFIK_NETWORK` — the external network name from step 1
  - `TRAEFIK_CERT_RESOLVER` — the resolver name from step 1
  - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
    `NEXT_PUBLIC_APP_URL` — same values as below (these get baked into the
    client bundle at build time, so they must be set here too)

- **`.env.production`** (read by the running container) — copy from
  [.env.production.example](.env.production.example):

  ```bash
  cp .env.production.example .env.production
  ```

  Fill in the real values from your Supabase project (Dashboard → Settings →
  API) and your AI Gateway key. Get `AI_GATEWAY_API_KEY` from
  [Vercel's AI Gateway](https://vercel.com/docs/ai-gateway) — it's a hosted
  routing API, independent of where the app itself runs.

Neither file is committed to git (see `.gitignore`) — keep them on the server
only.

## 4. Apply the database schema

If this is a fresh Supabase project, apply the migrations in
`supabase/migrations/` in order, via the Supabase SQL editor or the Supabase
CLI:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

## 5. Build and run

```bash
docker compose up -d --build
```

This builds the image locally on the server (multi-stage `Dockerfile`, using
Next.js `standalone` output) and starts it, joining the external `traefik`
network. Traefik should pick up the container automatically via labels and
start routing `https://$DOMAIN` to it once its healthcheck passes.

Check status:

```bash
docker compose ps
docker compose logs -f app
curl -s http://localhost:3000/api/health   # from inside the server, bypassing Traefik
```

## 6. Redeploying after changes

Manual (build on the server):

```bash
git pull
docker compose up -d --build
```

Or, using the included GitHub Actions workflow
([.github/workflows/docker-publish.yml](.github/workflows/docker-publish.yml)),
which builds and pushes an image to `ghcr.io/weidaksatriawarma/subak-bali-next`
on every push to `main`:

1. In the repo's GitHub Settings → Secrets, add `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`.
2. On the server, switch `docker-compose.yml`'s `build:` section for an
   `image: ghcr.io/weidaksatriawarma/subak-bali-next:latest` line instead
   (or keep both and choose per-deploy).
3. Redeploy with:
   ```bash
   docker compose pull
   docker compose up -d
   ```

Either way, zero-downtime isn't guaranteed with a single replica — Traefik
will briefly 502 for in-flight requests while the container restarts. That's
fine for a small app; ask if you later want a rolling/blue-green setup.

## 7. Operational notes

- **Logs**: `docker compose logs -f app`
- **Restart policy**: `restart: unless-stopped` — the container survives VPS
  reboots as long as Docker itself starts on boot.
- **Resource use**: the app is a single Node process; a 1 vCPU / 1GB VPS is
  enough to start with.
- **Service worker** (`public/sw.js`): after a redeploy, returning visitors
  may briefly get a cached previous version until the SW updates in the
  background — this is existing app behavior, not specific to self-hosting.
- **Backups**: database backups are Supabase's responsibility on their side
  (check your plan's backup policy). There's no local database to back up on
  this VPS.
- **Secrets rotation**: if you rotate `AI_GATEWAY_API_KEY` or Supabase keys,
  update `.env.production` and run `docker compose up -d` (no rebuild needed
  — only build-time `NEXT_PUBLIC_*` vars require `--build`).
