# SyaFest — Event Management Platform

A multi-page Next.js application for discovering community events (concerts,
workshops, meetups, markets) around Malang & Batu. Built as a course project
to demonstrate functional components, props, `useState`/`useEffect`,
file-based routing, component reusability, and API integration.

## Project overview

SyaFest lists local events with a category filter, a searchable-by-browsing
event grid, and a detail page per event. Event data is served from a local
Next.js API route (acting as a lightweight backend) backed by a JSON file,
so the app runs fully offline with no external services required.

**Pages**
| Route | Description |
|---|---|
| `/` | Home page — hero section + preview of 3 upcoming events |
| `/about` | About page — project story, values, stats |
| `/contact` | Contact page with a validated form, submitted to an API route |
| `/events` | Dynamic listing page — all events with category filter |
| `/events/[id]` | Dynamic detail page — full info for a single event |
| `/register` | Create an account (Firebase Authentication) |
| `/login` | Log in to an existing account (Firebase Authentication) |

**Reusable components** (`/components`)
- `Header` / `Footer` — site chrome, shared via `Layout`
- `EventCard` — ticket-stub styled card used on Home and Events pages
- `ContactForm` — controlled form with client + server-side validation
- `StateNotice` — `Loading`, `ErrorNotice`, `EmptyNotice` for async states

## Technologies used

- [Next.js](https://nextjs.org/) 16 (Pages Router, file-based routing)
- React 19 (functional components, `useState`, `useEffect`)
- Next.js API Routes (`/pages/api`) as a mock backend
- Firebase Authentication (email/password) + Firestore
- CSS Modules (no UI framework — custom design tokens in `globals.css`)
- Local JSON as the data source (`/data/events.json`)

## How to run the project locally

```bash
# 1. Install dependencies
npm install

# 2. Set up Firebase
# Copy .env.local.example to .env.local and fill in your Firebase project's
# config values (Firebase Console → Project settings → Your apps).
cp .env.local.example .env.local

# 3. Run the development server
npm run dev

# 4. Open the app
# http://localhost:3000
```

To build and run a production version instead:

```bash
npm run build
npm start
```

## GitHub repository

<!-- Replace with your actual repo link after you push this project -->
https://github.com/<your-username>/syafest-event-management

## Notes on API integration

`/pages/api/events.js` simulates a real backend: it accepts `?category=` and
`?id=` query params, adds a short artificial delay, and returns proper HTTP
status codes (`404` for a missing event, `405` for a wrong method). The
frontend consumes this with `fetch`, and every data page (`/`, `/events`,
`/events/[id]`) implements explicit **loading**, **error**, and **empty**
states rather than assuming the request always succeeds.

`/pages/api/contact.js` validates the contact form server-side (required
fields + email format) before returning a success message, demonstrating a
full request/response cycle beyond just reading data.

## Notes on Firebase Authentication

`contexts/AuthContext.js` wraps the whole app (see `pages/_app.js`) and
exposes `register`, `login`, `logout`, and the current `user` via a
`useAuth()` hook. On register, a matching profile document is written to
the Firestore `users` collection (`lib/firebase.js` initializes both
Firebase Auth and Firestore). The header switches between "Log in / Sign up"
and the user's name + "Log out" based on live auth state via
`onAuthStateChanged`.
