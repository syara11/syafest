# SyaFest

A web app for finding community events (concerts, workshops, meetups, night markets) around Malang & Batu. This is a college project I built to practice React/Next.js — everything from component reusability and routing to actual API integration and real auth with Firebase.

## About this project

At its core, SyaFest is an event listing app. There's a category filter, a detail page for each event, and now a full login/register system too. Event data still comes from a local JSON file (not a real database) — that's intentional, so the app can run without needing a full backend setup, but it's still served through a proper Next.js API route instead of just importing the JSON straight into components.

**Pages:**
- `/` — home, shows the 3 closest upcoming events
- `/about` — a short story about SyaFest
- `/contact` — contact form, with validation
- `/events` — all events, filterable by category
- `/events/[id]` — single event detail
- `/register` & `/login` — auth powered by Firebase

**Components I reused across pages:**
- `Header` & `Footer` — mounted once in `Layout`, shows up on every page
- `EventCard` — the torn-ticket-stub styled card, used on both home & events
- `ContactForm` — its own form component, validated on both client and server
- `StateNotice` — handles loading/error/empty states so I'm not rewriting the same conditionals everywhere

## Stack

- Next.js 16 (Pages Router — still using `pages/`, haven't migrated to App Router)
- React 19, all functional components, using `useState` & `useEffect`
- Next.js API Routes acting as a makeshift backend
- Firebase Auth + Firestore for login/register
- Plain CSS Modules, no Tailwind or UI library

## Running it locally

```bash
npm install
```

Then set up Firebase — copy `.env.local.example` to `.env.local` and fill it in with your own Firebase project's config (grab it from Firebase Console → Project Settings → Your apps):

```bash
cp .env.local.example .env.local
```

Then run:

```bash
npm run dev
```

Open `localhost:3000`.

To try the production build instead:
```bash
npm run build
npm start
```

## Repo

https://github.com/syara11/syafest

## About the API

`/api/events` isn't just dumping raw JSON — it handles `?category=` and `?id=` for filtering/detail, adds a small artificial delay so the loading state is actually visible (otherwise the fetch resolves too fast and the spinner never shows up while testing), and returns proper status codes (404 when an event isn't found, etc). Every page that pulls data also handles all three states — loading, error, and empty — instead of assuming the fetch always succeeds.

`/api/contact` is validated server-side too, not just on the form.

## About Firebase

All the auth logic lives in one place: `contexts/AuthContext.js`. It handles register, login, logout, and keeps track of who's currently logged in, and gets used through `useAuth()` in whatever component needs it. On register, besides creating the Firebase Auth account, I also save the profile data (name, email) to a Firestore `users` collection — so if I ever need to show more user info later, I can just query it from there.

The header switches its layout automatically based on login state — that runs through Firebase's `onAuthStateChanged`, so it's real-time and doesn't need a manual refresh.