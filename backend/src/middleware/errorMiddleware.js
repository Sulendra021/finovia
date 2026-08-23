const { logger } = require("./requestTracer");

function notFound(req, res, next) {
  const err = new Error(`Route not found - ${req.originalUrl}`);
  err.statusCode = 404;
  err.code = "NOT_FOUND";
  next(err);
}

// Global standardized error handler
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_SERVER_ERROR";
  let details = err.details || undefined;

  // Prisma Error Mapping
  if (err.code === "P2002") {
    statusCode = 409;
    code = "DUPLICATE_RESOURCE";
    const targetFields = err.meta && err.meta.target ? err.meta.target.join(", ") : "field";
    message = `A record with this ${targetFields} already exists.`;
  } else if (err.code === "P2025") {
    statusCode = 404;
    code = "NOT_FOUND";
    message = "Requested record was not found.";
  } else if (err.code === "P2003") {
    statusCode = 400;
    code = "FOREIGN_KEY_VIOLATION";
    message = "Invalid related entity reference.";
  }

  const requestId = req.requestId || undefined;

  // Log error with context, redacting sensitive details
  logger.error(
    {
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode,
      code,
      message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    },
    `API Error: ${message}`
  );

  // Return standard error structure while supporting top-level message for legacy clients
  res.status(statusCode).json({
    success: false,
    message, // Backwards compatibility for existing toast/error handlers
    error: {
      code,
      message,
      details,
    },
    requestId,
  });
}

module.exports = { notFound, errorHandler };
