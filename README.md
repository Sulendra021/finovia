# Finovia

A fintech marketplace platform that helps users discover, compare & apply for
credit cards, bank accounts, demat accounts, loans and insurance — with a full
Express/MongoDB API and an admin panel behind it.

```
finovia-project/
  backend/     Node.js + Express + MongoDB REST API
  frontend/    React + Vite + Tailwind CSS single-page app
```

## Quick start

Two terminals:

```bash
# Terminal 1 - API
cd backend
npm install
cp .env.example .env      # fill in MONGO_URI + JWT_SECRET
npm run seed                # populate sample products + a bootstrap admin
npm run dev                  # http://localhost:5000

# Terminal 2 - UI
cd frontend
npm install
cp .env.example .env
npm run dev                  # http://localhost:5173
```

Open http://localhost:5173. Product pages fetch live data from the backend
and silently fall back to bundled sample data if the API isn't reachable, so
the site always renders either way.

**Admin login** (created by `npm run seed`): `admin@finovia.in` / `admin123`
— log in on `/auth` and you'll be dropped into `/admin` automatically.

## What's implemented

### Backend
- JWT auth (register / login / me)
- Full CRUD REST routes for all 7 product types, built on a shared controller
  factory so adding an 8th product type is a ~10-line change
- User management (list, promote/demote to admin, delete) and a per-user
  wishlist
- `Application` model + routes capturing the "Apply Now -> lead -> commission"
  step from the user journey, with a `/api/admin/stats` endpoint for
  dashboard counts
- Admin-only write access (`POST`/`PUT`/`DELETE`) enforced by JWT + role
  middleware
- Seed script that populates every collection and creates a bootstrap admin

### Frontend
- Every module as its own route: Home, Credit Cards, Bank Accounts, Demat
  Accounts, Loans, Insurance, Offers & Deals, Blog & News, Calculators,
  Login/Register
- **Admin Panel** (`/admin`, role-gated): dashboard with live stats, a
  generic CRUD table + modal form reused across all 7 product types, user
  management, and clearly-labeled placeholders for WhatsApp Automation and AI
  Recommendations (see "Known gaps" below)
- **User Dashboard** (`/dashboard`): tracks the logged-in user's applications
  and wishlist
- **Calculators**: EMI, SIP/Investment, and Fixed Deposit, all with live
  sliders
- **Dark / light mode** toggle, persisted to `localStorage`, defaults to the
  system preference
- Basic **SEO**: per-page `<title>`/meta description, `robots.txt`,
  `sitemap.xml`
- Basic **PWA**: web app manifest + a minimal service worker for
  installability and offline app-shell caching
- Product pages fetch live data from the backend and fall back to bundled
  mock data if the API is unreachable

## Known gaps (can't be faked without real credentials)

- **WhatsApp Automation** - needs a WhatsApp Business API account and Meta
  app approval. The admin panel has a placeholder page explaining this.
- **AI Recommendations** - needs a paid LLM/recommendation API key. Same
  placeholder treatment.
- **Payment gateway / affiliate redirect** - "Apply Now" creates a lead in
  the database (the commission-tracking step) but doesn't redirect to a real
  partner bank or payment processor, since none is configured.
- **Referral program** - not built; would need its own model + UI.

Everything else from the original workflow - architecture, tech stack, key
features, application modules, admin workflow, and development roadmap
phases 1-4 - is implemented.

## Tech stack

React 18, Vite, Tailwind CSS, react-router-dom, axios, lucide-react - Node.js,
Express, MongoDB (Mongoose), JWT, bcryptjs, nodemailer.
