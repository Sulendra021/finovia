const request = require("supertest");
const express = require("express");
const prisma = require("../src/config/prisma");

const authRoutes = require("../src/routes/authRoutes");
const creditCardRoutes = require("../src/routes/creditCardRoutes");
const bankAccountRoutes = require("../src/routes/bankAccountRoutes");
const applicationRoutes = require("../src/routes/applicationRoutes");
const userRoutes = require("../src/routes/userRoutes");
const { errorHandler } = require("../src/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/bank-accounts", bankAccountRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

describe("Edge Case & Error Validation Test Suite", () => {
  beforeAll(async () => {
    await prisma.application.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("Validation & Missing Payload Edge Cases (400 Bad Request)", () => {
    it("should return 400 when registering with missing email or password", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Missing Fields User",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/required/i);
    });

    it("should return 400 when creating application with empty string fields", async () => {
      const res = await request(app).post("/api/applications").send({
        productType: "",
        productId: "",
        applicantName: "",
        applicantEmail: "",
        applicantPhone: "",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toMatch(/Missing required/i);
    });
  });

  describe("Duplicate Resource & Constraint Violations (409 Conflict)", () => {
    it("should return 409 Conflict when attempting to register a duplicate email", async () => {
      const payload = {
        name: "Unique User",
        email: "unique@example.com",
        password: "password123",
      };

      // Initial registration
      await request(app).post("/api/auth/register").send(payload);

      // Duplicate registration attempt
      const res = await request(app).post("/api/auth/register").send(payload);
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already exists/i);
    });
  });

  describe("Resource Not Found (404 Not Found)", () => {
    it("should return 404 when querying non-existent credit card ID", async () => {
      const res = await request(app).get("/api/credit-cards/non-existent-uuid-12345");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
  });
});
