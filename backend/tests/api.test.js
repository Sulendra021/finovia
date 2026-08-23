const request = require("supertest");
const express = require("express");
const prisma = require("../src/config/prisma");

const authRoutes = require("../src/routes/authRoutes");
const creditCardRoutes = require("../src/routes/creditCardRoutes");
const applicationRoutes = require("../src/routes/applicationRoutes");
const userRoutes = require("../src/routes/userRoutes");
const adminRoutes = require("../src/routes/adminRoutes");
const { errorHandler } = require("../src/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

describe("Finovia API Integration Tests with PostgreSQL & Prisma", () => {
  let userToken;
  let userId;
  let adminToken;
  let adminId;
  let createdCardId;

  beforeAll(async () => {
    // Clean database before tests
    await prisma.wishlistItem.deleteMany();
    await prisma.application.deleteMany();
    await prisma.creditCard.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("Auth: Register normal user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe("testuser@example.com");
    expect(res.body.token).toBeDefined();
    userToken = res.body.token;
    userId = res.body._id;
  });

  test("Auth: Login normal user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Auth: Register admin user directly in DB", async () => {
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("adminpassword", salt);

    const adminUser = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
      },
    });
    adminId = adminUser.id;

    const res = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "adminpassword",
    });

    expect(res.status).toBe(200);
    expect(res.body.role).toBe("admin");
    adminToken = res.body.token;
  });

  test("Products CRUD: Admin creates a Credit Card", async () => {
    const res = await request(app)
      .post("/api/credit-cards")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Prisma Test Card",
        bank: "Test Bank",
        category: "Cashback",
        joiningFee: "Free",
        annualFee: "Free",
        rating: 4.8,
        tags: ["Test", "Cashback"],
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Prisma Test Card");
    expect(res.body._id).toBeDefined();
    createdCardId = res.body._id;
  });

  test("Products CRUD: Public GET credit cards", async () => {
    const res = await request(app).get("/api/credit-cards");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("Wishlist: Add product to user wishlist", async () => {
    const res = await request(app)
      .post("/api/users/wishlist")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        productType: "CreditCard",
        productId: createdCardId,
      });

    expect(res.status).toBe(201);
    expect(res.body.length).toBe(1);
    expect(res.body[0].productId).toBe(createdCardId);
  });

  test("Wishlist: Get user wishlist", async () => {
    const res = await request(app)
      .get("/api/users/wishlist/me")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("Wishlist: Remove product from user wishlist", async () => {
    const res = await request(app)
      .delete(`/api/users/wishlist/${createdCardId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
  });

  test("Applications: User submits lead application", async () => {
    const res = await request(app)
      .post("/api/applications")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        productType: "CreditCard",
        productId: createdCardId,
        applicantName: "Test Applicant",
        applicantEmail: "testuser@example.com",
        applicantPhone: "9876543210",
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("redirected");
  });

  test("Admin: Dashboard stats query", async () => {
    const res = await request(app)
      .get("/api/admin/stats")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.users).toBe(2);
    expect(res.body.leads).toBe(1);
  });
});
