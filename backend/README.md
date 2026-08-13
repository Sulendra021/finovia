# Finovia Backend

Node.js + Express + MongoDB (Mongoose) REST API for the Finovia financial marketplace.

## Setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run seed             # populate sample products + a bootstrap admin account
npm run dev               # start with nodemon on http://localhost:5000
```

`npm run seed` also creates an admin login if one doesn't exist yet:
`admin@finovia.in` / `admin123` — use it to log into the frontend's `/admin` panel.

## Structure

```
src/
  server.js            entry point
  config/db.js         MongoDB connection
  models/               CreditCard, BankAccount, DematAccount, Loan,
                        Insurance, Offer, BlogPost, User, Application
  controllers/          factory.js provides shared CRUD logic; each
                        product controller wraps it around its model.
                        adminController.js aggregates dashboard stats.
                        userController.js also handles wishlist add/remove.
  routes/                one router per resource, mounted under /api/*
  middleware/            authMiddleware (JWT + admin check), errorMiddleware
  seed/                  seedData.js + seed.js to populate/reset sample data
                        and bootstrap an admin account
```

## API overview

| Resource | Base path |
|---|---|
| Auth | `/api/auth` (`POST /register`, `POST /login`, `GET /me`) |
| Credit Cards | `/api/credit-cards` |
| Bank Accounts | `/api/bank-accounts` |
| Demat Accounts | `/api/demat-accounts` |
| Loans | `/api/loans` |
| Insurance | `/api/insurance` |
| Offers | `/api/offers` |
| Blog | `/api/blog` |
| Applications (leads) | `/api/applications` |
| Users (admin) | `/api/users` |
| Wishlist | `/api/users/wishlist/*` |
| Admin stats | `/api/admin/stats` |

Every product resource above supports:
- `GET /` — list all
- `GET /:id` — single record
- `POST /`, `PUT /:id`, `DELETE /:id` — admin only (JWT + `role: "admin"`)

`POST /api/applications` is the "Apply Now" endpoint — it's what step 5→6 of
the user journey (Apply Now → Commission) hits when a user applies to a
product. `GET /api/applications/me` returns the logged-in user's own
applications, used by the frontend Dashboard page.

`GET /api/admin/stats` returns counts (users, products by type, leads, total
commission) used by the Admin Panel's overview page.

To manually promote a user to admin instead of using the seeded account:
`db.users.updateOne({email: "you@example.com"}, {$set: {role: "admin"}})`
