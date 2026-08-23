// Run with: npm run seed        (populate)
//           npm run seed:destroy (wipe product collections)
require("dotenv").config({ path: require("path").join(__dirname, "../../.env"), override: true });
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");

const { creditCards, bankAccounts, dematAccounts, loans, insurance, offers, blogPosts } = require("./seedData");

async function importData() {
  try {
    await prisma.$transaction([
      prisma.creditCard.deleteMany(),
      prisma.bankAccount.deleteMany(),
      prisma.dematAccount.deleteMany(),
      prisma.loan.deleteMany(),
      prisma.insurance.deleteMany(),
      prisma.offer.deleteMany(),
      prisma.blogPost.deleteMany(),
    ]);

    await prisma.creditCard.createMany({ data: creditCards });
    await prisma.bankAccount.createMany({
      data: bankAccounts.map((b) => ({
        ...b,
        type: b.type === "Zero Balance" ? "Zero_Balance" : b.type,
      })),
    });

    await prisma.dematAccount.createMany({ data: dematAccounts });
    await prisma.loan.createMany({ data: loans });
    await prisma.insurance.createMany({ data: insurance });
    await prisma.offer.createMany({ data: offers });
    await prisma.blogPost.createMany({ data: blogPosts });

    const adminEmail = "admin@finovia.in";
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      await prisma.user.create({
        data: {
          name: "Finovia Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
        },
      });
      console.log(`Admin account created -> email: ${adminEmail}  password: admin123`);
    }

    console.log("Finovia data seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await prisma.$transaction([
      prisma.creditCard.deleteMany(),
      prisma.bankAccount.deleteMany(),
      prisma.dematAccount.deleteMany(),
      prisma.loan.deleteMany(),
      prisma.insurance.deleteMany(),
      prisma.offer.deleteMany(),
      prisma.blogPost.deleteMany(),
    ]);
    console.log("Finovia product data destroyed");
    process.exit(0);
  } catch (err) {
    console.error("Destroy error:", err);
    process.exit(1);
  }
}

if (process.argv.includes("--destroy")) {
  destroyData();
} else {
  importData();
}
