// Security Whitelists & Limits for Generic Bulk Data Management Engine
const ALLOWED_MODELS = {
  users: {
    prismaDelegate: "user",
    fields: ["id", "name", "email", "password", "role", "metadata", "createdAt", "updatedAt"],
    uniqueKeys: ["id", "email"],
    jsonbFields: ["metadata"],
    relations: {
      wishlist: { model: "wishlistItem", foreignKey: "userId" },
      applications: { model: "application", foreignKey: "userId" },
    },
  },
  credit_cards: {
    prismaDelegate: "creditCard",
    fields: [
      "id",
      "name",
      "bank",
      "category",
      "joiningFee",
      "annualFee",
      "rewardRate",
      "cashback",
      "rating",
      "tags",
      "gradient",
      "active",
      "description",
      "applyUrl",
      "buttonText",
      "imageUrl",
      "imageAlt",
      "createdAt",
      "updatedAt",
    ],
    uniqueKeys: ["id"],
    relations: {},
  },
  bank_accounts: {
    prismaDelegate: "bankAccount",
    fields: ["id", "name", "bank", "type", "interest", "minBalance", "features", "active", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  demat_accounts: {
    prismaDelegate: "dematAccount",
    fields: ["id", "name", "brokerage", "amc", "opening", "rating", "features", "active", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  loans: {
    prismaDelegate: "loan",
    fields: ["id", "name", "rate", "amount", "tenure", "processingFee", "desc", "active", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  insurance: {
    prismaDelegate: "insurance",
    fields: ["id", "name", "provider", "premium", "coverage", "claimRatio", "active", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  offers: {
    prismaDelegate: "offer",
    fields: ["id", "title", "bank", "category", "expiry", "color", "active", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  blog_posts: {
    prismaDelegate: "blogPost",
    fields: ["id", "title", "category", "excerpt", "content", "readTime", "author", "published", "createdAt", "updatedAt"],
    uniqueKeys: ["id"],
    relations: {},
  },
  applications: {
    prismaDelegate: "application",
    fields: [
      "id",
      "userId",
      "productType",
      "productId",
      "applicantName",
      "applicantEmail",
      "applicantPhone",
      "status",
      "commissionEarned",
      "createdAt",
      "updatedAt",
    ],
    uniqueKeys: ["id"],
    relations: {
      user: { model: "user", foreignKey: "userId" },
    },
  },
};

// Aliases for user-friendly model naming
ALLOWED_MODELS["user"] = ALLOWED_MODELS["users"];
ALLOWED_MODELS["creditCard"] = ALLOWED_MODELS["credit_cards"];
ALLOWED_MODELS["bankAccount"] = ALLOWED_MODELS["bank_accounts"];
ALLOWED_MODELS["dematAccount"] = ALLOWED_MODELS["demat_accounts"];
ALLOWED_MODELS["loan"] = ALLOWED_MODELS["loans"];
ALLOWED_MODELS["blogPost"] = ALLOWED_MODELS["blog_posts"];
ALLOWED_MODELS["application"] = ALLOWED_MODELS["applications"];

const ALLOWED_OPERATORS = [
  "$match",
  "$and",
  "$or",
  "$not",
  "$in",
  "$nin",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$eq",
  "$ne",
  "$contains",
  "$startsWith",
  "$endsWith",
  "$sort",
  "$skip",
  "$limit",
  "$select",
  "$count",
  "$group",
  "$lookup",
];

const MAX_LIMIT = 500;
const MAX_STAGES = 20;

module.exports = {
  ALLOWED_MODELS,
  ALLOWED_OPERATORS,
  MAX_LIMIT,
  MAX_STAGES,
};
