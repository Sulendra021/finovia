const request = require("supertest");
const express = require("express");
const jwt = require("jsonwebtoken");

// Mock environment
process.env.JWT_SECRET = "test_super_secret_key_123456789";

const { protect, admin } = require("../src/middleware/authMiddleware");

const app = express();
app.use(express.json());

app.get("/api/test-protected", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

app.get("/api/test-admin", protect, admin, (req, res) => {
  res.json({ success: true, admin: true });
});

describe("Security Audit Integration Tests", () => {
  it("should reject unauthenticated access to protected routes", async () => {
    const res = await request(app).get("/api/test-protected");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch(/not authorized/i);
  });

  it("should reject tampered or invalid JWT tokens", async () => {
    const res = await request(app)
      .get("/api/test-protected")
      .set("Authorization", "Bearer invalid_tampered_token_string");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch(/token invalid or expired/i);
  });

  it("should reject expired JWT tokens", async () => {
    const expiredToken = jwt.sign({ id: "user_123" }, process.env.JWT_SECRET, {
      expiresIn: "-1s",
    });
    const res = await request(app)
      .get("/api/test-protected")
      .set("Authorization", `Bearer ${expiredToken}`);
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toMatch(/token invalid or expired/i);
  });
});
