const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

// Verifies the JWT sent in the Authorization header or attached cookies and attaches req.user
async function protect(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET environment variable is missing");
      }
      const decoded = jwt.verify(token, secret);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) return res.status(401).json({ message: "User not found" });

      // Attach user with _id alias for backward compatibility
      req.user = {
        ...user,
        _id: user.id,
      };
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token invalid or expired" });
    }
  }
  return res.status(401).json({ message: "Not authorized, no token provided" });
}

// Optional Auth middleware - attaches req.user if a valid token is present without rejecting unauthenticated requests
async function optionalAuth(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const secret = process.env.JWT_SECRET;
      if (secret) {
        const decoded = jwt.verify(token, secret);
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        });

        if (user) {
          req.user = {
            ...user,
            _id: user.id,
          };
        }
      }
    } catch (err) {
      // Ignore token verification errors for optional auth
    }
  }
  next();
}

// Restricts a route to users with role "admin"
function admin(req, res, next) {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "Admin access required" });
}

module.exports = { protect, optionalAuth, admin };
