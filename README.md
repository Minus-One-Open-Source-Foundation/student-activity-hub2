# Student Activity Hub (frontend)

Brief: a React + Vite frontend for a Student Activity Hub — a dashboard-style web app for students to manage personal info, academic records, activities, achievements, portfolio and analytics.

This repository contains the frontend application built with React, Vite and MUI. It provides a starting UI (login/register flow, sidebar navigation and pages) that can be wired to a backend API.

## Table of contents
- What this project is
- Tech stack
- Quick start
- Available scripts
- Environment variables
- Project structure
- Key implementation details
- Deployment suggestions
- Contributing
- License & contact

## What this project is

- Purpose: a student dashboard UI for collecting and displaying student data and activities.
- Authentication: lightweight in-memory auth is provided in `src/contexts/AuthContext.jsx` for local/demo use (replace with real auth for production).
- Pages include: Dashboard, Personal Info, Academic Records, Activities, Achievements, Portfolio and Analytics (see `src/pages`).

## Tech stack

- React 19
- Vite
- MUI (Material UI) for components and theming
- react-router-dom for client routing
- axios for API calls
- recharts for charts
- ESLint for linting

## Prerequisites

- Node.js >= 18 (recommended)
- npm (or yarn/pnpm)

## Quick start

1. Clone the repo

```bash
git clone <repo-url> && cd frontend
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Open http://localhost:5173 (Vite default) in your browser.

Notes:
- The frontend currently uses an in-memory demo auth (see `src/contexts/AuthContext.jsx`). For integration with a real backend, update `src/services/api.js` to point to your API and replace the demo auth with calls to your auth endpoints.

## Available scripts

These are defined in `package.json`:

- `npm run dev` — start Vite dev server
- `npm run build` — build for production (output to `dist`)
- `npm run preview` — locally preview production build
- `npm run lint` — run ESLint on the project

## Environment variables

Currently the API base URL is hardcoded in `src/services/api.js` as:

```js
baseURL: "http://localhost:5000/api"
```

Recommended change for production and flexibility: use Vite environment variables and reference them as `import.meta.env.VITE_API_URL`.

Example .env:

```
VITE_API_URL=https://api.example.com/api
```

Then update `src/services/api.js` to:

```js
import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export default api
```

Restart the dev server after changing environment variables.

## Project structure (important files)

Top-level:

- `index.html` - Vite entry
- `vite.config.js` - Vite configuration
- `package.json` - scripts & dependencies
- `README.md` - (this file)

src/ (main application code):

- `main.jsx` — app bootstrap, theme and providers
- `App.jsx` — routes and top-level layout logic (auth gating + sidebar)
- `contexts/AuthContext.jsx` — demo authentication provider (use real auth in prod)
- `services/api.js` — axios instance for API calls
- `components/` — reusable UI components (Sidebar, Navbar, FileUpload)
- `pages/` — page-level components for each route (Dashboard, Login, Register, etc.)
- `assets/` — images and static assets

## Key implementation notes

- Routing: controlled by `react-router-dom` inside `App.jsx`. Unauthenticated users are redirected to `/login`.
- Theme: MUI theme is set up in `main.jsx` and a custom theme is applied in `App.jsx`.
- Auth: `AuthContext` currently stores users and session in memory — good for demos only. Replace with token-based auth for production.
- API: `src/services/api.js` centralizes the axios instance. Use interceptors to attach tokens for authenticated requests.

## Features (what's included)

- Login and register pages (demo in-memory)
- Sidebar navigation with routes to student-focused pages
- Dashboard + analytics (uses Recharts)
- File upload component (placeholder) and modular components for reuse

## Suggestions & next steps (low-risk improvements)

1. Replace in-memory auth with real auth endpoints (register/login) and persist tokens (HTTP-only cookies or secure localStorage with refresh tokens).
2. Move API base URL to Vite env var (`VITE_API_URL`) and add token interceptor to `api.js`.
3. Add tests (React Testing Library + Vitest) and CI checks for linting and build.
4. Add a `LICENSE` file (MIT or your preferred license).

## Deployment

This app is ready to build with Vite. Example simple flow:

```bash
npm run build
# upload the contents of the dist/ directory to your static host (Netlify, Vercel, Surge, S3+CloudFront, etc.)
```

Vercel/Netlify: connect the repo and set `VITE_API_URL` in the project's environment variables.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run lint/tests locally
4. Open a PR with a clear description

Please follow the existing coding style and add tests for new features when possible.

## Troubleshooting

- If you see CORS errors when calling your API, ensure the backend allows requests from the frontend origin and that credentials (cookies) are configured if used.
- If the app does not pick up env changes, restart the dev server.

## License & contact

- No license specified in this repository. Add a `LICENSE` file (for example MIT) to make the terms explicit.
- Maintainers: Team-Minus-One

---

If you'd like, I can:

1. Replace the hardcoded base URL in `src/services/api.js` with `import.meta.env.VITE_API_URL` and create a `.env.example` file.
2. Add a basic `LICENSE` file (MIT) if you want a permissive license.

Tell me which follow-up you'd like and I'll make the changes.
