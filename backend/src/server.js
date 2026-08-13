require("dotenv").config({ override: true });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

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

connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "finovia-backend" }));

app.use("/api/auth", authRoutes);
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

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Finovia API running on port ${PORT}`));
