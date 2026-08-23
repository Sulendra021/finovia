const winston = require("winston");

// Sensitive keys filter for redacting credentials and tokens
const SANITIZE_KEYS = ["password", "token", "jwt", "authorization", "secret", "cookie", "apiKey"];

function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);

  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (SANITIZE_KEYS.some((k) => key.toLowerCase().includes(k))) {
      clean[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      clean[key] = sanitizeObject(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

// Winston logger instance with JSON formatting & redaction
const winstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

const logger = {
  info: (meta, message) => winstonLogger.info(message, sanitizeObject(meta)),
  warn: (meta, message) => winstonLogger.warn(message, sanitizeObject(meta)),
  error: (meta, message) => winstonLogger.error(message, sanitizeObject(meta)),
};

// Request Tracer middleware
function requestTracer(req, res, next) {
  const crypto = require("crypto");
  const requestId =
    req.headers["x-request-id"] ||
    req.headers["x-correlation-id"] ||
    (crypto.randomUUID ? crypto.randomUUID() : `req-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`);

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  const start = Date.now();

  res.on("finish", () => {
    const duration = `${Date.now() - start}ms`;
    const meta = {
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration,
      userId: req.user ? req.user.id : undefined,
      ip: req.ip || req.socket.remoteAddress,
      userAgent: req.get("user-agent"),
    };

    if (res.statusCode >= 500) {
      logger.error(meta, "Request completed with server error");
    } else if (res.statusCode >= 400) {
      logger.warn(meta, "Request completed with client error");
    } else {
      logger.info(meta, "Request completed successfully");
    }
  });

  next();
}

module.exports = { requestTracer, logger, sanitizeObject };
