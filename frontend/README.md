# Finovia Frontend

React + Vite + Tailwind CSS single-page app for the Finovia financial
marketplace, routed with `react-router-dom`.

## Setup

```bash
cd frontend
npm install
cp .env.example .env   # points at the backend API (defaults to localhost:5000/api)
npm run dev              # http://localhost:5173
```

## Structure

```
src/
  main.jsx              entry point - wraps <App /> in Theme/Auth providers
                        + <BrowserRouter>, registers the service worker
  App.jsx                 route table + persistent Navbar/Footer
  index.css               Tailwind + fonts + shared animation classes
  data/mockData.js       static fixtures (same shape as backend/src/seed/seedData.js)
  hooks/useLiveData.js    fetches from the API, falls back to mock data
  services/api.js         axios client + one function per backend resource
  context/
    AuthContext.jsx        logged-in user, login/logout, session check
    ThemeContext.jsx       dark/light mode, persisted to localStorage
  components/
    Navbar.jsx, Footer.jsx, ProtectedRoute.jsx, Seo.jsx
    shared.jsx             Logo, RatingStars, SectionEyebrow, PageHero,
                           CreditCardTile, MiniCardVisual
    calculators.jsx        EmiCalculator, SipCalculator, FdCalculator
    admin/ResourceTable.jsx  generic CRUD table + modal form, reused by
                             every admin product page
  pages/
    HomePage, CreditCardsPage, BankAccountsPage, DematPage, LoansPage,
    InsurancePage, OffersPage, BlogPage, CalculatorsPage, AuthPage,
    DashboardPage
    admin/                 AdminLayout, AdminDashboard, one page per
                           product resource, AdminUsers, AdminComingSoon
```

## Routes

| Path | Page | Access |
|---|---|---|
| `/` | Home | public |
| `/cards`, `/bank`, `/demat`, `/loans`, `/insurance`, `/offers`, `/blog` | product listing pages | public |
| `/calculators` | EMI / SIP / FD calculators | public |
| `/auth` | Login / Register | public |
| `/dashboard` | My applications + wishlist | logged in |
| `/admin` | Admin Panel (dashboard, products, users) | admin role only |

## Connecting to the backend

Every product page uses `hooks/useLiveData.js`, which tries the matching
`services/api.js` function first and quietly falls back to `data/mockData.js`
if the backend isn't reachable - so the UI always renders, with or without
the API running.

`AuthPage.jsx` and the Admin Panel are fully wired to the live backend
already (they have no meaningful mock-data fallback): login/register hit
`/api/auth`, and every admin CRUD screen hits its resource's real REST
endpoints and will show a "couldn't reach the backend" message if it's down.
