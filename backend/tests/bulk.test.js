const request = require("supertest");
const express = require("express");
const prisma = require("../src/config/prisma");

const authRoutes = require("../src/routes/authRoutes");
const bulkRoutes = require("../src/routes/bulkRoutes");
const { errorHandler } = require("../src/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/data", bulkRoutes);
app.use(errorHandler);

describe("Generic Bulk Data Management & JSON Pipeline System", () => {
  let adminToken;
  let userToken;

  beforeAll(async () => {
    // Reset test collections
    await prisma.wishlistItem.deleteMany();
    await prisma.application.deleteMany();
    await prisma.creditCard.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin user
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin_bulk@finovia.in",
        password: hashedPassword,
        role: "admin",
      },
    });

    // Login Admin
    const adminRes = await request(app).post("/api/auth/login").send({
      email: "admin_bulk@finovia.in",
      password: "admin123",
    });
    adminToken = adminRes.body.token;

    // Create Normal User
    const userRes = await request(app).post("/api/auth/register").send({
      name: "Normal User",
      email: "normal_user@finovia.in",
      password: "user123",
    });
    userToken = userRes.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Security & Authorization: Reject non-admin access", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        model: "credit_cards",
        operation: "createMany",
        data: [{ name: "Card 1", bank: "Bank 1", category: "Rewards" }],
      });

    expect(res.status).toBe(403);
  });

  test("Validation: Reject unauthorized model", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "unauthorized_table",
        operation: "createMany",
        data: [{ name: "Test" }],
      });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].field).toBe("model");
  });

  test("Validation: Safeguard full-table deletion", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        operation: "deleteMany",
      });

    expect(res.status).toBe(400);
    expect(res.body.errors[0].message).toContain("Safeguard Triggered");
  });

  test("Bulk Operations: 1. Bulk Create (createMany)", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        operation: "createMany",
        data: [
          { name: "Bulk Card Alpha", bank: "HDFC", category: "Cashback", rating: 4.8 },
          { name: "Bulk Card Beta", bank: "ICICI", category: "Travel", rating: 4.2 },
          { name: "Bulk Card Gamma", bank: "SBI", category: "Rewards", rating: 3.9 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(3);
  });

  test("Bulk Operations: 2. Bulk Update (updateMany)", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        operation: "updateMany",
        where: { bank: "HDFC" },
        data: { annualFee: "₹500" },
      });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test("Bulk Operations: 2b. Itemized Bulk Update (bulkUpdate)", async () => {
    const cardRes = await prisma.creditCard.findFirst({ where: { name: "Bulk Card Beta" } });

    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        operation: "bulkUpdate",
        data: [
          {
            where: { id: cardRes.id },
            data: { rating: 4.9, joiningFee: "Waived" },
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });

  test("Bulk Operations: 4. Bulk Upsert (upsertMany)", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "users",
        operation: "upsertMany",
        uniqueBy: "email",
        data: [
          { name: "Normal User Updated", email: "normal_user@finovia.in", password: "user123" },
          { name: "New Upserted User", email: "new_upsert@finovia.in", password: "user123" },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
  });

  test("JSON Pipeline: $match, $sort, $limit, $skip", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        pipeline: [
          { $match: { rating: { $gte: 4.0 } } },
          { $sort: { rating: -1 } },
          { $skip: 0 },
          { $limit: 10 },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].name).toBe("Bulk Card Beta");
    expect(res.body.data[0]._id).toBeDefined();
  });

  test("JSON Pipeline: JSONB Nested Filtering", async () => {
    // Add JSONB metadata user
    await prisma.user.create({
      data: {
        name: "Metadata User",
        email: "metadata_user@finovia.in",
        password: "password",
        metadata: { country: "India", verified: true },
      },
    });

    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "users",
        pipeline: [
          {
            $match: {
              "metadata.country": "India",
              "metadata.verified": true,
            },
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].email).toBe("metadata_user@finovia.in");
  });

  test("JSON Pipeline: $group stage", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        pipeline: [
          { $match: { active: true } },
          { $group: { _id: "$category" } },
        ],
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test("Transactions: Atomic multi-operation transaction", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        transaction: true,
        operations: [
          {
            model: "credit_cards",
            operation: "createMany",
            data: [{ name: "Tx Card 1", bank: "Axis", category: "Rewards" }],
          },
          {
            model: "loans",
            operation: "createMany",
            data: [{ name: "Tx Loan 1", rate: "8.5%", amount: "₹5 Lakh", tenure: "3 Years" }],
          },
        ],
      });

    expect(res.status).toBe(200);
    expect(res.body.transaction).toBe(true);
    expect(res.body.results.length).toBe(2);
  });

  test("Bulk Operations: 3. Bulk Delete (deleteMany)", async () => {
    const res = await request(app)
      .post("/api/data/bulk")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        model: "credit_cards",
        operation: "deleteMany",
        where: { bank: "Axis" },
      });

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
  });
});
