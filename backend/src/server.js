require("dotenv").config({ override: true });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const connectDB = require("./config/db");
const prisma = require("./config/prisma");
const { requestTracer } = require("./middleware/requestTracer");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiter");

const authRoutes = require("./routes/authRoutes");
const creditCardRoutes = require("./routes/creditCardRoutes");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const dematRoutes = require("./routes/dematRoutes");
const loanRoutes = require("./routes/loanRoutes");
const insuranceRoutes = require("./routes/insuranceRoutes");
const offerRoutes = require("./routes/offerRoutes");
const blogRoutes = require("./routes/blogRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bulkRoutes = require("./routes/bulkRoutes");

const app = express();

// Security headers with Helmet
app.use(helmet());

// Allowed origins check for CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://finovia-ten.vercel.app",
  ...(process.env.CLIENT_URL || "").split(","),
]
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin ? origin.trim().replace(/\/$/, "") : origin;
      if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Payload size limit to prevent Denial of Service (DoS)
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Request tracer & structured correlation logger middleware
app.use(requestTracer);

// Global API Rate Limiter
app.use("/api/", apiLimiter);

// Render commonly probes the service root.
app.get("/", (req, res) =>
  res.json({
    status: "ok",
    service: "finovia-backend",
    health: "/api/health",
    readiness: "/api/readiness",
  })
);

// Liveness probe (/health)
app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
    service: "finovia-backend",
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
  })
);

// Readiness probe (/readiness) - verifies PostgreSQL database connection health
app.get("/api/readiness", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({
      status: "ready",
      database: "connected",
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  } catch (err) {
    return res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      timestamp: new Date().toISOString(),
      requestId: req.requestId,
    });
  }
});

// Apply strict rate limiting to auth routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/bank-accounts", bankAccountRoutes);
app.use("/api/demat-accounts", dematRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/data", bulkRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => console.log(`Finovia API running on port ${PORT}`));
}

startServer().catch((err) => {
  console.error(`Server startup error: ${err.message}`);
  process.exit(1);
});
