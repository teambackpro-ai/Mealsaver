# Environment variables (settings)

The app reads a few settings from a file called `.env` in the project folder.
This file is **not** uploaded to GitHub. A template, `.env.example`, is.

## How to create your `.env` file (Mac)

In Terminal, inside the `mealsaver` folder:

```
cp .env.example .env
open -e .env
```

- `cp .env.example .env` makes a copy of the template called `.env`.
- `open -e .env` opens it in TextEdit so you can fill in the values. Save and close.

After changing `.env`, stop the app (press `Ctrl + C` in Terminal) and start it again with `npx expo start --clear`.

## Settings used by the app

| Name | Required | Public? | What it is |
|---|---|---|---|
| `EXPO_PUBLIC_APP_NAME` | No | Yes | App name shown to users. Default: `MealSaver`. |
| `EXPO_PUBLIC_SUPABASE_URL` | From Phase 3 | Yes | Your Supabase project address, e.g. `https://abcd1234.supabase.co`. |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | From Phase 3 | Yes | Supabase **publishable** key (starts with `sb_publishable_`). Older projects call it the `anon` key. |
| `EXPO_PUBLIC_DEFAULT_MARKET` | No | Yes | `DE` (Germany). `UK` comes later. |

### Where to find the Supabase values

Supabase dashboard → your project → **Project Settings** → **API Keys** (publishable key) and **Data API** / **Connect** (project URL).

## ⚠️ Never put these in `.env` or anywhere in the app

Anything that starts with `EXPO_PUBLIC_` is built into the app, and anyone can read it.

- Supabase **secret** key (`sb_secret_…`) or legacy **service_role** key
- Your Supabase database password
- AI provider API keys (e.g. Anthropic)
- Payment / RevenueCat secret keys

These are stored only on the server as **Supabase Edge Function secrets** (set up in Phase 8). They will be listed here when introduced:

| Server-side secret | Phase | Where it is stored |
|---|---|---|
| `ANTHROPIC_API_KEY` | 8 | Supabase → Edge Functions → Secrets |
