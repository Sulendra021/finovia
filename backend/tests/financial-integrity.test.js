const request = require("supertest");
const express = require("express");
const prisma = require("../src/config/prisma");
const applicationRoutes = require("../src/routes/applicationRoutes");
const { errorHandler } = require("../src/middleware/errorMiddleware");

const app = express();
app.use(express.json());
app.use("/api/applications", applicationRoutes);
app.use(errorHandler);

describe("Financial & Lead Integrity Test Suite", () => {
  beforeAll(async () => {
    await prisma.application.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should prevent duplicate application leads (Idempotency check)", async () => {
    const payload = {
      productType: "CreditCard",
      productId: "card_123",
      applicantName: "Idempotent User",
      applicantEmail: "idempotent@example.com",
      applicantPhone: "9998887776",
    };

    // First request - creates record
    const res1 = await request(app).post("/api/applications").send(payload);
    expect(res1.statusCode).toBe(201);
    expect(res1.body.idempotent).toBeUndefined();

    // Rapid second request (double click) - returns existing record safely without duplicate creation
    const res2 = await request(app).post("/api/applications").send(payload);
    expect(res2.statusCode).toBe(200);
    expect(res2.body.idempotent).toBe(true);
    expect(res2.body.id).toBe(res1.body.id);
  });
});
