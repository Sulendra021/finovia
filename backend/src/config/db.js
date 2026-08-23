const prisma = require("./prisma");

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("PostgreSQL connected via Prisma Client");
  } catch (err) {
    console.error(`PostgreSQL connection error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
