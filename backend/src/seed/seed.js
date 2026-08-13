// Run with: npm run seed        (populate)
//           npm run seed:destroy (wipe product collections)
require("dotenv").config({ path: require("path").join(__dirname, "../../.env"), override: true });
const mongoose = require("mongoose");
const connectDB = require("../config/db");

const CreditCard = require("../models/CreditCard");
const BankAccount = require("../models/BankAccount");
const DematAccount = require("../models/DematAccount");
const Loan = require("../models/Loan");
const Insurance = require("../models/Insurance");
const Offer = require("../models/Offer");
const BlogPost = require("../models/BlogPost");
const User = require("../models/User");

const { creditCards, bankAccounts, dematAccounts, loans, insurance, offers, blogPosts } = require("./seedData");

async function importData() {
  try {
    await connectDB();
    await Promise.all([
      CreditCard.deleteMany(),
      BankAccount.deleteMany(),
      DematAccount.deleteMany(),
      Loan.deleteMany(),
      Insurance.deleteMany(),
      Offer.deleteMany(),
      BlogPost.deleteMany(),
    ]);

    await CreditCard.insertMany(creditCards);
    await BankAccount.insertMany(bankAccounts);
    await DematAccount.insertMany(dematAccounts);
    await Loan.insertMany(loans);
    await Insurance.insertMany(insurance);
    await Offer.insertMany(offers);
    await BlogPost.insertMany(blogPosts);

    const adminEmail = "admin@finovia.in";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({ name: "Finovia Admin", email: adminEmail, password: "admin123", role: "admin" });
      console.log(`Admin account created -> email: ${adminEmail}  password: admin123`);
    }

    console.log("Finovia data seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await connectDB();
    await Promise.all([
      CreditCard.deleteMany(),
      BankAccount.deleteMany(),
      DematAccount.deleteMany(),
      Loan.deleteMany(),
      Insurance.deleteMany(),
      Offer.deleteMany(),
      BlogPost.deleteMany(),
    ]);
    console.log("Finovia product data destroyed");
    process.exit();
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
