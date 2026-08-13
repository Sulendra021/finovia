const hdfcRaw = require("./hdfc_credit_cards.json");

const hdfcMapped = hdfcRaw.map(card => {
  let category = "Rewards";
  const nameLower = card.card_name.toLowerCase();
  const bestSuited = card.features.find(f => f.toUpperCase().includes("BEST SUITED FOR"));
  const bestSuitedStr = bestSuited ? bestSuited.toLowerCase() : "";

  if (nameLower.includes("infinia") || nameLower.includes("regalia") || nameLower.includes("diners club black") || nameLower.includes("metal") || nameLower.includes("marriott")) {
    category = "Premium";
  } else if (bestSuitedStr.includes("travel") || bestSuitedStr.includes("flight") || nameLower.includes("intermiles") || nameLower.includes("indigo") || nameLower.includes("irctc")) {
    category = "Travel";
  } else if (bestSuitedStr.includes("shopping") || bestSuitedStr.includes("cashback") || nameLower.includes("millennia") || nameLower.includes("swiggy") || nameLower.includes("pixel") || nameLower.includes("payzapp")) {
    category = "Cashback";
  } else {
    category = "Rewards";
  }

  const fee = card.annual_charge || "Free";

  let ratingVal = 4.5;
  if (card.rating === "Popular") ratingVal = 4.7;
  else if (card.rating === "Average") ratingVal = 4.1;

  const tags = [];
  card.features.forEach(f => {
    if (!f.toUpperCase().includes("RENEWAL FEE") && !f.toUpperCase().includes("BEST SUITED FOR")) {
      const clean = f.replace(/WELCOME BENEFIT\s*/i, "").trim();
      if (clean && tags.length < 3) {
        tags.push(clean);
      }
    }
  });
  if (tags.length === 0) {
    tags.push("HDFC Bank", "Credit Card");
  }

  let gradient = "from-blue-700 via-blue-600 to-blue-800";
  if (category === "Premium") {
    gradient = "from-slate-900 via-slate-800 to-slate-950";
  } else if (category === "Travel") {
    gradient = "from-amber-500 via-yellow-500 to-amber-600";
  } else if (category === "Cashback") {
    gradient = "from-emerald-700 via-emerald-600 to-teal-700";
  }

  return {
    name: card.card_name,
    bank: "HDFC Bank",
    category,
    joiningFee: fee,
    annualFee: fee,
    rewardRate: "1-5%",
    cashback: "Up to 5%",
    rating: ratingVal,
    tags,
    gradient,
    active: true,
    description: card.description,
    applyUrl: card.apply_url,
    buttonText: card.button_text,
    imageUrl: card.image_url,
    imageAlt: card.image_alt
  };
});

const creditCards = [
  { name: "Infinia Metal", bank: "HDFC Bank", category: "Premium", gradient: "from-slate-900 via-slate-800 to-slate-950", joiningFee: "10,000", annualFee: "10,000", rewardRate: "3.3%", cashback: "Up to 5%", rating: 4.8, tags: ["Airport Lounge", "Golf Access", "Concierge"] },
  { name: "Millennia Cashback", bank: "HDFC Bank", category: "Cashback", gradient: "from-blue-700 via-blue-600 to-blue-800", joiningFee: "1,000", annualFee: "1,000", rewardRate: "1-5%", cashback: "5% Online", rating: 4.5, tags: ["Online Shopping", "No-Fee First Year"] },
  { name: "Amazon Pay ICICI", bank: "ICICI Bank", category: "Cashback", gradient: "from-orange-600 via-orange-500 to-amber-600", joiningFee: "Free", annualFee: "Free", rewardRate: "1-5%", cashback: "5% Amazon", rating: 4.6, tags: ["Lifetime Free", "Amazon Prime"] },
  { name: "Regalia Gold", bank: "HDFC Bank", category: "Travel", gradient: "from-amber-500 via-yellow-500 to-amber-600", joiningFee: "2,500", annualFee: "2,500", rewardRate: "1-4 pts/₹150", cashback: "Travel Vouchers", rating: 4.4, tags: ["Lounge Access", "Club Vistara"] },
  { name: "Axis Ace", bank: "Axis Bank", category: "Cashback", gradient: "from-emerald-700 via-emerald-600 to-teal-700", joiningFee: "499", annualFee: "499", rewardRate: "2-5%", cashback: "5% Bill Pay", rating: 4.5, tags: ["Google Pay", "Bill Payments"] },
  { name: "Kotak League Platinum", bank: "Kotak Mahindra", category: "Rewards", gradient: "from-red-700 via-rose-600 to-red-800", joiningFee: "499", annualFee: "499", rewardRate: "1-4 pts/₹150", cashback: "Movie Offers", rating: 4.2, tags: ["Dining Offers", "Fuel Surcharge Waiver"] },
  ...hdfcMapped
];

const bankAccounts = [
  { name: "SBI Digital Savings", bank: "SBI", type: "Savings", interest: "2.70", minBalance: "0", features: ["Zero balance", "Free debit card", "UPI enabled"] },
  { name: "HDFC Regular Savings", bank: "HDFC Bank", type: "Savings", interest: "3.00", minBalance: "10,000", features: ["Free NEFT/RTGS", "Doorstep banking", "Locker discount"] },
  { name: "Kotak 811", bank: "Kotak Mahindra", type: "Zero Balance", interest: "3.50", minBalance: "0", features: ["100% digital", "Instant account", "No min balance"] },
  { name: "ICICI Salary Account", bank: "ICICI Bank", type: "Salary", interest: "3.00", minBalance: "0", features: ["Zero balance for salaried", "Free cheque book", "Preferential loan rates"] },
  { name: "Axis Current Pro", bank: "Axis Bank", type: "Current", interest: "0.00", minBalance: "25,000", features: ["Business banking suite", "Free POS terminal", "Overdraft facility"] },
  { name: "RBL Savings Select", bank: "RBL Bank", type: "Savings", interest: "6.00", minBalance: "5,000", features: ["High interest rate", "Free demat linkage", "Priority support"] },
];

const dematAccounts = [
  { name: "Zerodha", brokerage: "₹20 flat / Free equity delivery", amc: "300", opening: "Free", rating: 4.6, features: ["Kite trading app", "Free equity investing", "Advanced charting"] },
  { name: "Groww", brokerage: "₹20 flat / order", amc: "0", opening: "Free", rating: 4.5, features: ["Beginner friendly", "Mutual funds + stocks", "Zero AMC first year"] },
  { name: "Upstox", brokerage: "₹20 flat / order", amc: "150", opening: "Free", rating: 4.3, features: ["Fast order execution", "Margin trading", "Low brokerage"] },
  { name: "Angel One", brokerage: "₹20 flat / order", amc: "240", opening: "Free", rating: 4.2, features: ["Smart API access", "Research reports", "ARQ advisory"] },
  { name: "ICICI Direct", brokerage: "0.55% delivery", amc: "700", opening: "Free", rating: 4.0, features: ["3-in-1 account", "Research backed", "Bank-linked trading"] },
];

const loans = [
  { name: "Personal Loan", rate: "10.5% - 18%", amount: "50,000 - 40,00,000", tenure: "1 - 5 yrs", processingFee: "Up to 2.5%", desc: "Instant unsecured funding for any personal need, minimal documentation." },
  { name: "Home Loan", rate: "8.4% - 10.2%", amount: "5,00,000 - 5,00,00,000", tenure: "Up to 30 yrs", processingFee: "Up to 1%", desc: "Fund your dream home with long tenures and competitive floating rates." },
  { name: "Car Loan", rate: "9.0% - 12.5%", amount: "1,00,000 - 1,00,00,000", tenure: "1 - 7 yrs", processingFee: "Up to 1.5%", desc: "Drive home a new or used car with up to 100% on-road funding." },
  { name: "Business Loan", rate: "11% - 20%", amount: "1,00,000 - 75,00,000", tenure: "1 - 5 yrs", processingFee: "Up to 3%", desc: "Working capital and expansion funding, collateral-free options available." },
  { name: "Education Loan", rate: "8.5% - 13%", amount: "50,000 - 1,50,00,000", tenure: "Up to 15 yrs", processingFee: "Nil - 1%", desc: "Study in India or abroad with moratorium until course completion." },
];

const insurance = [
  { name: "Health Insurance", provider: "HDFC ERGO", premium: "399 / month", coverage: "Up to ₹1 Cr", claimRatio: "98.5%" },
  { name: "Term Life Insurance", provider: "ICICI Prudential", premium: "699 / month", coverage: "Up to ₹2 Cr", claimRatio: "99.2%" },
  { name: "Motor Insurance", provider: "Bajaj Allianz", premium: "1,999 / year", coverage: "IDV based", claimRatio: "97.8%" },
  { name: "Travel Insurance", provider: "Tata AIG", premium: "199 / trip", coverage: "Up to $5,00,000", claimRatio: "96.4%" },
];

const offers = [
  { title: "5% Cashback on Grocery Spends", bank: "Axis Ace Card", category: "Cashback", expiry: "31 Aug 2026", color: "emerald" },
  { title: "Zero Processing Fee Home Loans", bank: "SBI", category: "Loans", expiry: "15 Sep 2026", color: "blue" },
  { title: "First Year Free + ₹500 Amazon Voucher", bank: "ICICI Bank", category: "Credit Card", expiry: "30 Aug 2026", color: "amber" },
  { title: "Flat 20% Off Health Premium", bank: "HDFC ERGO", category: "Insurance", expiry: "10 Sep 2026", color: "rose" },
  { title: "Free Demat Account + ₹0 AMC", bank: "Groww", category: "Demat", expiry: "Ongoing", color: "violet" },
  { title: "9.5% Special Rate Car Loans", bank: "Kotak Mahindra", category: "Loans", expiry: "05 Sep 2026", color: "blue" },
];

const blogPosts = [
  { title: "5 Credit Cards That Actually Beat Inflation This Year", category: "Credit Cards", excerpt: "A breakdown of reward rates versus real household spending categories.", readTime: "6 min read" },
  { title: "Fixed vs Floating: Picking the Right Home Loan Rate in 2026", category: "Loans", excerpt: "What changes when repo rates move, and how to hedge either way.", readTime: "8 min read" },
  { title: "Zero-Balance Accounts, Compared Honestly", category: "Bank Accounts", excerpt: "The fine print banks don't put on the homepage, explained plainly.", readTime: "5 min read" },
  { title: "Term Insurance at 25 vs 35: The Real Cost of Waiting", category: "Insurance", excerpt: "A simple premium comparison that makes the decision for you.", readTime: "4 min read" },
  { title: "Discount Brokers in India: Who's Actually Cheapest?", category: "Demat", excerpt: "Brokerage, AMC, and hidden charges lined up side by side.", readTime: "7 min read" },
  { title: "How Your CIBIL Score Actually Decides Your Interest Rate", category: "Credit Cards", excerpt: "The mechanics banks use, and three habits that move the needle fast.", readTime: "6 min read" },
];

module.exports = { creditCards, bankAccounts, dematAccounts, loans, insurance, offers, blogPosts };
