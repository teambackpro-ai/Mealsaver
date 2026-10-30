# MealSaver – Phase 1: Environment check, architecture and roadmap

*Written 29 October 2026. Nothing has been built yet. This is the plan only.*

---

## 1. What I found when I checked the environment

I (Claude) am working inside a temporary **cloud computer** that Anthropic gives me for this session. It is **not your computer**.

| Item | Result | What it means for you |
|---|---|---|
| Project folder | Empty, no files | We start from scratch. Nothing will be overwritten. |
| Git (version control) | Installed (2.43) | I can save versions of the code. |
| GitHub connection | **Not working** (no valid login) | I can't save the code to GitHub yet. **You need to fix this first** (step A below). |
| Node.js (runs JavaScript tools) | Installed (v22) in my cloud computer | I can build and test code here. |
| Latest Expo | SDK 58 | We'll use the latest stable version. |
| Latest Supabase library | 2.118 | Current, fine. |

**Important:** this cloud computer is deleted after a while. Anything not saved ("pushed") to GitHub is lost. That's why connecting GitHub comes first.

---

## 2. What you need to set up (beginner guide)

You only need **A, B and C** before Phase 2. **D** is needed when you want to see the app on your own phone. **E** comes much later.

### A. GitHub – where your code is stored (free)
GitHub is like Google Drive for code. It keeps every version, so nothing gets lost.

1. Go to https://github.com and create a free account (or sign in).
2. Click the **+** at the top right → **New repository**.
3. Name: `mealsaver`. Choose **Private**. Tick **"Add a README file"** (so the repository isn't empty). Click **Create repository**.
4. Go to https://claude.ai/connect-github and connect your GitHub account. When asked, install the **Claude GitHub App** and allow it access to the `mealsaver` repository.
5. Tell me your GitHub username. I'll attach the repository to this session, or you can start a new session with `mealsaver` selected.

### B. Supabase – login and database (free to start)
Supabase stores user accounts, meal plans and shopping lists.

1. Go to https://supabase.com → **Start your project** → sign up (signing in with GitHub is easiest).
2. Click **New project**.
   - Name: `mealsaver-dev`
   - Database password: click **Generate a password** and save it in a password manager. **Never send it to me.**
   - Region: **Central EU (Frankfurt)**. This keeps data in Germany, which helps with GDPR.
   - Plan: **Free**.
3. Wait about 2 minutes until the project is ready.
4. Don't send me any keys yet. I'll tell you exactly which one to copy and where to put it (only the *public* "anon" key goes into the app, and the *secret* "service_role" key must never go into the app).

> Note: free Supabase projects are paused after about 1 week with no activity. You can restart them with one click. That's fine for development.

### C. Expo Go – see the app on your phone (free)
Install **Expo Go** from the App Store (iPhone) or Google Play (Android). It lets you open the app while it's still being built, without publishing it.

### D. Your own computer (needed from Phase 2 to try the app on your phone)
My cloud computer can't easily send the live app to your phone. You'll run one command on your own computer for that. Install:

1. **Node.js (LTS version)** from https://nodejs.org. Download the "LTS" installer and click through it with the default settings.
2. **Git** from https://git-scm.com/downloads (Windows: default settings; Mac: it may already be installed).
3. Optional but recommended: **Visual Studio Code** from https://code.visualstudio.com (a free program for looking at code files).

Then check it worked. Open a **terminal** (a window where you type commands):
- Windows: press the Windows key, type `PowerShell`, press Enter.
- Mac: press Cmd + Space, type `Terminal`, press Enter.

Type each line and press Enter:
```
node -v
git --version
```
`node -v` should show a version number like `v22.x.x` or higher. `git --version` should show something like `git version 2.x`. If you see "not found", tell me and send a screenshot of the error.

Until D is ready, I can still show you **screenshots** of the app running in a browser here.

### E. Later (Phase 10 only, costs money)
- Expo account (free) for building app-store versions.
- Apple Developer Program: **USD 99/year** (needed for the iPhone App Store).
- Google Play Developer account: **USD 25 one-time**.

---

## 3. Proposed architecture (simple explanation)

```
 ┌──────────────────────────┐        ┌───────────────────────────────┐
 │  MealSaver app (phone)   │        │  Supabase (EU – Frankfurt)    │
 │  React Native + Expo     │──────▶ │  • Login (Auth)               │
 │  • Screens, design       │ public │  • Database (Postgres)        │
 │  • Calculations (costs,  │  key + │    with Row Level Security    │
 │    shopping list, plan)  │  login │  • Edge Functions (server     │
 │  • German texts          │        │    code): AI, delete account, │
 └──────────────────────────┘        │    export data                │
                                     └──────────────┬────────────────┘
                                                    │ secret AI key
                                                    │ (only on server)
                                                    ▼
                                     ┌───────────────────────────────┐
                                     │  AI provider (Claude API)     │
                                     │  only for the assistant       │
                                     └───────────────────────────────┘
```

**Key decisions and why:**

| Decision | Why |
|---|---|
| **All money and quantity maths in normal code**, not AI | Calculations must be exact and testable. AI is only used for the chat assistant. |
| **Meal planner = deterministic algorithm** (rules + scoring), not AI | Free to run, predictable, testable, and reliably respects budget and allergies. AI can make suggestions on top. |
| **AI key only on the server** (Supabase Edge Function) | If a key is inside the app, anyone can extract it and run up costs on your account. |
| **Row Level Security (RLS)** on every user table | The database itself makes sure users can only see their own data, even if the app has a bug. |
| **Market config** (`DE` now, `UK` later) | Language, currency, units and the list of supermarkets come from one setting, so English/GBP can be added without a rewrite. |
| **App name in one config file** | "MealSaver" can be renamed in one place. |
| **Money stored as whole cents** (e.g. 399 = 3,99 €) | Avoids rounding errors that happen with decimal numbers. |
| **Recipes and sample prices in version-controlled data files** | Easy to check, correct and review. Loaded into the database automatically. |
| **Germany data region** | Supports GDPR data minimisation and location expectations. |

**Libraries (all free):** Expo Router (navigation), i18next + expo-localization (languages), TanStack Query (loading/caching data), Zustand (simple app state), Zod (input validation), react-hook-form (forms), Jest + Testing Library (automated tests). Subscriptions later: RevenueCat (free tier) on top of Apple/Google in-app purchases.

---

## 4. Folder structure

```
mealsaver/
├── app/                      ← Screens (each file = one screen, Expo Router)
│   ├── _layout.tsx           ← App frame: theme, language, login check
│   ├── (auth)/               ← Anmelden, Registrieren, Passwort vergessen
│   ├── (onboarding)/         ← Step-by-step household setup
│   ├── (tabs)/               ← Bottom menu:
│   │   ├── index.tsx         ←   Übersicht (budget dashboard)
│   │   ├── plan.tsx          ←   Wochenplan
│   │   ├── recipes.tsx       ←   Rezepte
│   │   ├── list.tsx          ←   Einkaufsliste
│   │   └── profile.tsx       ←   Profil & Einstellungen
│   ├── recipe/[id].tsx       ← Recipe detail
│   ├── assistant.tsx         ← AI assistant (premium)
│   └── legal/                ← Datenschutz, Impressum, AGB, Abo-Info
├── src/
│   ├── config/               ← App name, markets (DE/UK), feature flags
│   ├── i18n/                 ← de.json (default), en.json (later)
│   ├── theme/                ← Colours, fonts, spacing
│   ├── components/           ← Reusable building blocks (Button, Card, …)
│   ├── domain/               ← Pure business logic + tests:
│   │   ├── money.ts          ←   cents, € formatting (de-DE)
│   │   ├── units.ts          ←   g/kg/ml/l conversions
│   │   ├── servings.ts       ←   household portion scaling
│   │   ├── allergens.ts      ←   14 EU allergens, filtering
│   │   ├── recipeCost.ts     ←   cost per serving
│   │   ├── shoppingList.ts   ←   combine & group ingredients
│   │   ├── planner.ts        ←   7-day plan generator
│   │   └── prices.ts         ←   price lookup & retailer comparison
│   ├── services/             ← Talking to Supabase
│   ├── hooks/                ← Shared screen logic
│   └── types/                ← TypeScript type definitions
├── data/
│   ├── recipes/              ← 50+ curated recipes (structured JSON)
│   └── prices/               ← Sample price catalogue (clearly labelled)
├── supabase/
│   ├── migrations/           ← Database structure, step by step
│   ├── seed.sql              ← Sample data
│   └── functions/            ← Server code: ai-assistant, delete-account, export-data
├── docs/                     ← Plans, environment variables, legal checklist
├── .env.example              ← List of settings (no secrets)
└── package.json              ← List of libraries and commands
```

---

## 5. Database structure

**Public reference data** (everyone can read, only admins can change):

| Table | Contains |
|---|---|
| `allergens` | The 14 EU allergens (LMIV Annex II): Glutenhaltiges Getreide, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch (inkl. Laktose), Schalenfrüchte, Sellerie, Senf, Sesam, Schwefeldioxid/Sulfite, Lupinen, Weichtiere |
| `ingredients` | Name (de/en), supermarket category, base unit, linked allergens |
| `recipes` | Title, description, steps, prep time, cook time, servings, tags (vegetarisch, schnell, kinderfreundlich, proteinreich), free/premium |
| `recipe_ingredients` | Which ingredient, how much, which unit |
| `retailers` | Aldi Nord, Aldi Süd, Lidl, Rewe, Edeka, Kaufland, Netto Marken-Discount, Penny (+ country) |
| `products` | A real buyable item: retailer, ingredient, package size (e.g. 500 g) |
| `prices` | Price in cents, currency, **source**, **last-updated date**, **status: `sample_estimate` or `verified`** |

**Private user data** (Row Level Security: owner only):

| Table | Contains |
|---|---|
| `profiles` | Linked to login, market (DE), language, optional display name |
| `households` | Number of adults, number of children (**count only, no names or birthdays**), weekly budget, meals per day |
| `household_preferences` | Diet, allergens, excluded ingredients, preferred supermarkets |
| `consents` | What the user agreed to, which version, when |
| `meal_plans` / `meal_plan_entries` | Week, day, meal (Frühstück/Mittag/Abend), recipe, portions, favourite flag |
| `shopping_lists` / `shopping_list_items` | Items, quantity, category, ticked off, "already at home", manual items, estimated vs. actually paid |
| `favourite_recipes` | Saved recipes |
| `subscriptions` | Free/premium status (written **only by the server**) |
| `ai_usage` | Number of AI requests per day (cost protection) |

Budget history is calculated from saved shopping lists and actual amounts entered by the user, so no data is stored twice.

---

## 6. How prices will work (honest by design)

- We start with a **small, manually maintained sample catalogue**. Every price has: retailer, product, package size, unit, price, **source** (e.g. "in-store observation, receipt") and **date**.
- Every price is marked **"Schätzung"** (estimate) unless it has been verified. The app always shows: *"Preise sind Schätzwerte und können im Markt abweichen."*
- **No web scraping.** The price layer is a replaceable "price provider". A licensed data source or a retailer partnership can be plugged in later.
- Package sizes count: if a recipe needs 300 g pasta, the shopping list says "1 × 500 g" and shows both the **cost of what you use** and **what you pay at the till**.
- Comparisons between retailers are marked **"ungefährer Vergleich"** (approximate comparison) when the products aren't exactly the same (e.g. own brand vs. branded product).
- "Savings" are split into **"geschätzte Ersparnis"** (estimated, compared with your budget) and **"belegte Ersparnis"** (verified, only when you enter what you actually paid for a comparable basket).

**Status (30.10.2026): you don't have prices yet. Decision pending, see options in the Phase 2 summary.**

**Open question for you:** where will sample prices come from? Realistic option: you (or a helper) note prices during normal shopping trips or from receipts for about 80–120 basic products at 2–3 stores. I'll build an easy import format for this. Copying prices from retailer websites or apps may breach their terms, so we won't do that without checking the terms or getting permission.

---

## 7. Roadmap

| Phase | What gets built | You test / do |
|---|---|---|
| **1** ✅ | This plan | Setup steps A–C (and D) |
| **2** | Expo project, design system (colours, fonts, buttons, cards), bottom menu with 5 empty tabs, German texts, € formatting, Supabase connection, first tests | Open the app in Expo Go |
| **3** | Register/login, consent screen, onboarding (household, budget, diet, allergies, supermarkets, meals/day), edit profile, database tables + RLS | Create an account, complete onboarding |
| **4** | 50+ structured recipes, recipe list with filters (vegetarisch, schnell, kinderfreundlich…), recipe detail with portions calculator and allergen labels, favourites | Check recipes for German authenticity |
| **5** | 7-day planner: budget-aware, allergy-safe, reuses ingredients, swap a meal, save as favourite plan | Generate and change plans |
| **6** | Shopping list: combine, scale for household, package rounding, supermarket categories, tick off, "already at home", manual items, works offline | Use it on a real shopping trip |
| **7** | Price catalogue + retailer comparison, budget dashboard (week, month, per meal, per person, savings, history) | Enter real spending |
| **8** | AI assistant via secure server function: cheaper alternatives, use what's in the fridge, substitutions, leftovers. Daily limit, premium only | Try the assistant |
| **9** | Full test run, bug fixes, accessibility check (screen reader, font size, contrast), GDPR features (export data, delete account) | Test on iPhone + Android |
| **10** | Production builds (EAS), store texts in German, screenshots, privacy labels, checklists for App Store & Google Play, subscription setup (switched **off**) | Developer accounts, legal review |

Each phase ends with: what was built, which tests were run (with real results), and what you should check.

---

## 8. Running costs (estimates – check current prices before paying)

| Item | Development | After launch |
|---|---|---|
| GitHub (private repository) | Free | Free |
| Supabase | Free | Free at first; **Pro about USD 25/month** once you have real users (no pausing, daily backups) |
| Expo / EAS builds | Free tier (limited builds per month) | Free tier is usually enough at first |
| Apple Developer Program | – | USD 99/year |
| Google Play Developer | – | USD 25 one-time |
| AI assistant (Claude API, small/fast model) | A few euros for testing | Depends on use. With a daily limit per user and premium-only access, probably **€5–30/month** for the first hundreds of users. I'll add a hard spending limit. |
| RevenueCat (subscriptions) | Free | Free up to a revenue threshold |
| Domain + simple website (privacy policy and Impressum must be online) | – | about €10–20/year |
| **Legal review** (Datenschutzerklärung, Impressum, AGB, subscription terms) | – | **This is the biggest risk to the £500 budget.** A lawyer can cost several hundred euros. A cheaper option is a German legal-text subscription service (around €10–30/month), but a lawyer should still check the parts specific to this app. |

**Estimated first-year total without a lawyer:** about €200–450, mostly the developer accounts plus a few months of Supabase Pro. This fits the £500 budget. Live supermarket price data from a commercial provider would **greatly exceed** the budget, so it's planned as a later upgrade.

---

## 9. Legal points that need review by a qualified German professional before launch

I'll create placeholders and checklists. **Templates don't make the app legally compliant.**

- Impressum (§ 5 DDG), Datenschutzerklärung (GDPR Art. 13), AGB / Nutzungsbedingungen
- Consent management (TTDSG/TDDDG) – we'll avoid tracking and ad SDKs to keep this simple
- Data processing agreements (AVV) with Supabase and the AI provider; international data transfers (AI provider in the US)
- Subscription terms: button wording, cancellation, withdrawal right for digital content (§ 356 BGB), the German "Kündigungsbutton" rules as applied to in-app subscriptions
- Price disclaimers and the Price Indication Ordinance (Preisangabenverordnung) – how estimated prices may be shown
- Allergen information: liability wording ("Angaben ohne Gewähr – bitte Verpackung prüfen")
- Use of retailer names and logos (trademark law) – we'll show names in plain text only, no logos without permission
- Children: we store only a **number** of children, never names or birthdays
- App Store / Play Store rules: in-app account deletion (required by Apple), data safety forms

---

## 10. Assumptions I made (tell me if any are wrong)

1. **Portion sizes:** children count as about 0.6 of an adult portion by default, and the user can change this. This is a planning assumption, not nutrition advice.
2. **Free version:** about 20 recipes, 1 active meal plan, shopping list, basic budget. Premium unlocks everything else. The limits are in a config file and easy to change.
3. **One household per account** for now. Sharing a list with a partner can be added later (it was planned for in the database).
4. **No nutrition values** at launch. We'd only add them later from a reliable source (e.g. the official BLS food database).
5. **Recipes:** I'll write classic, well-known family dishes (e.g. Linsensuppe, Spaghetti Bolognese, Kartoffelsuppe, Pfannkuchen) with structured ingredients. I won't copy recipes from websites or cookbooks. You should still taste-test and proofread them.
