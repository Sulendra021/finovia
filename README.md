# Finovia - Financial Marketplace Platform

Finovia is a comprehensive fintech marketplace platform designed to help users discover, compare, and apply for financial products—including Credit Cards, Bank Accounts, Demat Accounts, Personal/Business Loans, and Insurance policies. It features a modern, responsive React frontend powered by an Express backend utilizing PostgreSQL and Prisma ORM, equipped with robust authentication, role-based authorization, administrative product management, and a high-performance bulk data engine.

---

## Features

- **User Authentication & OTP Verification**: Email/password registration, SMTP-backed 6-digit OTP email verification, secure password reset, and JWT cookie management.
- **Financial Marketplace**: Explore and compare Credit Cards, Bank Accounts, Demat Accounts, Loans, Insurance, Offers, and Financial Articles/Blogs.
- **Interactive Calculators**: Built-in EMI, SIP, and FD (Fixed Deposit) financial calculators with dynamic sliders and calculations.
- **User Dashboard & Wishlist**: Track submitted applications and save favorite financial products for easy comparison.
- **Admin Management Panel**: Full CRUD operations for all product categories, user administration, application lead tracking, and revenue commission insights.
- **Generic Bulk Data & Pipeline API**: High-performance JSON bulk processing supporting batched inserts (`createMany`), updates, upserts (`upsertMany`), deletes, and MongoDB-like aggregation pipeline execution translated to Prisma.
- **Database & Prisma ORM**: Fully typed schema backed by PostgreSQL, migration pipelines, and automated seeding.
- **Theme & UX System**: Dark/Light mode toggle, smooth page transitions, skeleton loaders, and global toast notifications using `react-hot-toast`.
- **API Security & Observability**: Helmet security headers, rate limiting (`express-rate-limit`), correlation request tracing (`X-Request-ID`), structured logging with Winston, and health checks (`/api/health`, `/api/readiness`).

---

## Tech Stack

### Frontend
- **Framework & Core**: React 18, Vite 5, React Router DOM v6
- **Styling & UI**: Tailwind CSS v3, Lucide React Icons
- **HTTP & Feedback**: Axios, React Hot Toast

### Backend
- **Runtime & Framework**: Node.js (CommonJS), Express v4
- **Database ORM**: Prisma v5, PostgreSQL Driver (`pg`)
- **Security & Authentication**: JSON Web Token (`jsonwebtoken`), Bcrypt.js, Helmet, Express Rate Limit, Cookie Parser
- **Mailing & Utilities**: Nodemailer (SMTP OTP & Password Resets)
- **Logging**: Winston, Morgan, Custom Correlation Request Tracer

### Database & Testing
- **Database**: PostgreSQL
- **ORM & Migrations**: Prisma ORM
- **Testing**: Jest v30, Supertest v7

---

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    React + Vite Frontend                    │
│             (Components, Contexts, Axios Client)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / REST API
┌──────────────────────────────▼──────────────────────────────┐
│                    Node.js + Express API                    │
│      (Security Headers, Request Tracer, Rate Limiter)      │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐┌──────────────▼──────────────┐
│   Auth & Product Routes     ││      Bulk & Pipeline API     │
│   (JWT & Role Middleware)   ││   (Validator & Translator)  │
└──────────────┬──────────────┘└──────────────┬──────────────┘
               │                              │
┌──────────────▼──────────────────────────────▼──────────────┐
│                    Prisma ORM Client                        │
└──────────────────────────────┬──────────────────────────────┘
                               │ PostgreSQL Connection
┌──────────────────────────────▼──────────────────────────────┐
│                    PostgreSQL Database                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Prerequisites

To run this application, ensure you have the following installed on your system:
- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **PostgreSQL**: `v14.x` or higher (running database instance)

---

## Environment Variables

Both `backend` and `frontend` require `.env` files for configuration.

### Backend (`backend/.env`)

Create `backend/.env` based on `backend/.env.example`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/finovia_db?schema=public"
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

# SMTP Transporter for OTP & Email Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Frontend (`frontend/.env`)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database & Prisma Setup

1. **Configure Database Connection**: Ensure `DATABASE_URL` in `backend/.env` points to your PostgreSQL instance.
2. **Generate Prisma Client**:
   ```bash
   cd backend
   npx prisma generate
   ```
3. **Run Database Migrations / Sync**:
   ```bash
   npx prisma db push
   ```
4. **Seed Database**:
   Populate initial admin user (`admin@finovia.in` / `admin123`) and product marketplace data:
   ```bash
   npm run seed
   ```

---

## Running Locally

Execute the backend API and frontend dev server in separate terminal windows.

### 1. Start Backend API
```bash
cd backend
npm run dev
```
The Express backend will start on `http://localhost:5000`.

### 2. Start Frontend Application
```bash
cd frontend
npm run dev
```
The React frontend will start on `http://localhost:5173`.

---

## Available Scripts

### Backend (`backend/package.json`)
- `npm run dev`: Runs the backend using `nodemon` for auto-reloading on changes.
- `npm start`: Starts the backend production server using `node src/server.js`.
- `npm run seed`: Seeds the database with products and bootstrap admin credentials.
- `npm run seed:destroy`: Clears all product, application, user, and code data from the database.
- `npm test`: Runs test suites with Jest sequentially (`--runInBand`).

### Frontend (`frontend/package.json`)
- `npm run dev`: Starts Vite dev server on `http://localhost:5173`.
- `npm run build`: Bundles the React application for production deployment in `dist/`.
- `npm run preview`: Locally previews the production build output.

---

## API Documentation

### Public & Auth Endpoints
- `POST /api/auth/register`: Register a new user account.
- `POST /api/auth/login`: Authenticate existing user and set JWT cookie.
- `POST /api/auth/logout`: Clear authentication session.
- `GET /api/auth/me`: Retrieve current authenticated user profile.
- `POST /api/auth/send-otp`: Request 6-digit email OTP for verification or login.
- `POST /api/auth/verify-otp`: Verify OTP code.
- `POST /api/auth/forgot-password`: Send password reset link to user email.
- `POST /api/auth/reset-password`: Update user password with token.

### Marketplace Endpoints (Public GET, Admin-Protected POST/PUT/DELETE)
- `/api/credit-cards`
- `/api/bank-accounts`
- `/api/demat-accounts`
- `/api/loans`
- `/api/insurance`
- `/api/offers`
- `/api/blog`

### User Applications & Wishlist (User Auth Protected)
- `POST /api/applications`: Submit lead application for a product.
- `GET /api/applications/my`: Get submitted applications for logged-in user.
- `POST /api/users/wishlist`: Add product to user wishlist.
- `GET /api/users/wishlist`: Retrieve saved wishlist items.

### Admin Endpoints (Admin Protected)
- `GET /api/admin/stats`: Get dashboard overview metrics (user count, applications, commissions).
- `GET /api/admin/applications`: Fetch all platform lead applications.
- `PUT /api/admin/applications/:id`: Update application status (`pending`, `redirected`, `approved`, `rejected`).
- `GET /api/users`: List all platform users.
- `PUT /api/users/:id/role`: Update user role (`user` or `admin`).

### Bulk & Pipeline Engine Endpoint (Admin Protected)
- `POST /api/data/bulk`: Execute generic bulk operations (`createMany`, `updateMany`, `bulkUpdate`, `upsertMany`, `deleteMany`) or pipeline stage queries (`$match`, `$sort`, `$skip`, `$limit`, `$select`, `$lookup`, `$group`).

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message description",
  "requestId": "req-uuid-string"
}
```

---

## Authentication

- **Implementation**: Standard JWT tokens sent via HTTP headers (`Authorization: Bearer <token>`) or `jwt` HTTP-only cookies.
- **Password Security**: Passwords are hashed using `bcryptjs` before being persisted to PostgreSQL.
- **Route Protection**:
  - `protect`: Middleware validating JWT authenticity.
  - `admin`: Middleware validating user role equals `admin`.
- **Application Safeguard**: Unauthenticated users attempting to click "Apply" or "Open Account" are greeted with a `react-hot-toast` error and redirected to `/auth`.

---

## Bulk JSON API & Pipeline

Admin users can interact with `/api/data/bulk` to perform set operations across models (`users`, `credit_cards`, `bank_accounts`, `demat_accounts`, `loans`, `insurance`, `offers`, `blog_posts`, `applications`).

### Sample Upsert Operation (`upsertMany`)
```json
{
  "model": "credit_cards",
  "operation": "upsertMany",
  "uniqueBy": "id",
  "data": [
    {
      "id": "card-uuid-1",
      "name": "Alpha Cash Credit Card",
      "bank": "Alpha Bank",
      "category": "Cashback",
      "joiningFee": "Free",
      "annualFee": "₹499"
    }
  ]
}
```

### Sample Pipeline Stage Query
```json
{
  "model": "credit_cards",
  "pipeline": [
    { "$match": { "category": "Cashback", "rating": { "$gte": 4.0 } } },
    { "$sort": { "rating": -1 } },
    { "$limit": 10 }
  ]
}
```

---

## Database Models Overview

- **User**: Name, email, hashed password, role (`user`/`admin`), verification status, metadata JSON.
- **OtpCode**: Temporary 6-digit email OTPs with expiration timestamps.
- **PasswordResetToken**: Reset token string mapped to users.
- **WishlistItem**: Saved product IDs per user.
- **CreditCard**, **BankAccount**, **DematAccount**, **Loan**, **Insurance**, **Offer**, **BlogPost**: Marketplace financial offerings.
- **Application**: Tracks user applications, contact info, application status (`pending`, `redirected`, `approved`, `rejected`), and commission calculations.

---

## SEO & Accessibility

- **Semantic HTML**: Proper heading structure (`<h1>`-`<h3>`) across all marketplace views.
- **Robots & Sitemap**: Configured `robots.txt` and `sitemap.xml` in `/frontend/public`.
- **Accessibility**: Keyboard navigation support (`Escape` key modal closes, visible focus rings) and contrast-aware dark mode.

---

## Testing

Jest integration tests are configured under `backend/tests/`.

### Execute Test Suite
```bash
cd backend
npm test
```
Runs:
- `api.test.js`: API endpoints and response codes validation.
- `security.test.js`: Auth protection, rate-limiting, and input validation tests.
- `financial-integrity.test.js`: Commission and data calculation tests.

---

## Production Build

To build the React frontend for production distribution:

```bash
cd frontend
npm run build
```
Build output is saved to `frontend/dist/`.

---

## Security & Logging

- **Headers**: Secured with `helmet` middleware.
- **Rate Limiting**: `express-rate-limit` prevents brute-force attempts on `/api/auth` routes.
- **Traceability**: `requestTracer` assigns a unique `X-Request-ID` to all incoming HTTP requests for structured correlation logging.

---

## Troubleshooting

- **Database Connection Failed**: Verify PostgreSQL is running and `DATABASE_URL` credentials match in `backend/.env`.
- **CORS Error**: Check `CLIENT_URL` in `backend/.env` matches your frontend origin (`http://localhost:5173`).
- **Prisma Schema Mismatch**: Run `npx prisma generate` followed by `npx prisma db push` inside `backend/`.

---

## Terms & Privacy

- **Privacy Policy**: [Privacy Policy Document](file:///home/rohit/.gemini/antigravity/brain/3bb18eb5-9271-4910-a3dc-0a19cf4deca1/privacy_policy.md)
- **Terms of Service**: [Terms of Service Document](file:///home/rohit/.gemini/antigravity/brain/3bb18eb5-9271-4910-a3dc-0a19cf4deca1/terms_of_service.md)

---

## License

[LICENSE TO BE CONFIRMED]
