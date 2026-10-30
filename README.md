# MealSaver

A mobile app that helps families in Germany plan affordable meals, create shopping lists and stay within their weekly food budget.

*"MealSaver" is a working name. Change it with `EXPO_PUBLIC_APP_NAME` (see `docs/ENVIRONMENT.md`).*

**Status:** Phase 2 – foundation, navigation and design. See [`docs/PHASE-1-PLAN.md`](docs/PHASE-1-PLAN.md) for the full plan.

## Technology

React Native · Expo SDK 58 · TypeScript · Expo Router · Supabase · Jest

## Run the app on your iPhone (Mac)

You need: Node.js (LTS), the code on your Mac, and the **Expo Go** app on your iPhone. Your iPhone and Mac must be on the **same Wi-Fi**.

```
cd mealsaver
npm install
npx expo start
```

| Command | What it does |
|---|---|
| `cd mealsaver` | Go into the project folder. |
| `npm install` | Downloads all libraries the app needs (first time and after updates; takes 1–3 minutes). |
| `npx expo start` | Starts the development server and shows a QR code. |

Then open the iPhone **Camera** app, point it at the QR code and tap the banner. The app opens in Expo Go.
To stop the server: click into the Terminal window and press `Ctrl + C`.

## Quality checks

| Command | What it checks |
|---|---|
| `npm test` | Runs the automated tests. |
| `npm run typecheck` | Checks the TypeScript code for type errors. |
| `npm run lint` | Checks code style and common mistakes. |
| `npm run check` | Runs all three. |

## Folder structure

```
src/app/          Screens (each file is one screen; Expo Router)
src/components/   Reusable building blocks (buttons, cards, …)
src/config/       App name, markets (DE now, UK later), feature switches
src/domain/       Business logic: money, units, dates (+ tests)
src/i18n/         Texts: German (default) and English (prepared)
src/services/     Connection to Supabase
src/theme/        Colours, spacing, text styles
docs/             Plans and documentation
```

## Important rules for this project

- All money is stored as whole cents (3,99 € = `399`).
- All visible text lives in `src/i18n/locales/de.ts`, never directly in screens.
- No invented or scraped supermarket prices. Every price needs a source and a date and is labelled as an estimate unless verified.
- Secret keys never go into the app. See `docs/ENVIRONMENT.md`.
- Legal texts are placeholders until reviewed by a qualified professional.
