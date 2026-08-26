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

  const categoriesSet = new Set([category]);
  if (nameLower.includes("cashback") || bestSuitedStr.includes("cashback") || bestSuitedStr.includes("shopping") || nameLower.includes("millennia") || nameLower.includes("swiggy")) {
    categoriesSet.add("Cashback");
  }
  if (nameLower.includes("travel") || bestSuitedStr.includes("travel") || nameLower.includes("flight") || nameLower.includes("lounge") || nameLower.includes("irctc") || nameLower.includes("marriott")) {
    categoriesSet.add("Travel");
  }
  if (nameLower.includes("reward") || nameLower.includes("points") || bestSuitedStr.includes("reward") || bestSuitedStr.includes("dining")) {
    categoriesSet.add("Rewards");
  }
  if (category === "Premium" || nameLower.includes("infinia") || nameLower.includes("regalia") || nameLower.includes("metal") || nameLower.includes("diners")) {
    categoriesSet.add("Premium");
  }
  const categories = Array.from(categoriesSet);

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
    categories,
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
  { name: "Infinia Metal", bank: "HDFC Bank", category: "Premium", categories: ["Premium", "Rewards", "Travel"], gradient: "from-slate-900 via-slate-800 to-slate-950", joiningFee: "10,000", annualFee: "10,000", rewardRate: "3.3%", cashback: "Up to 5%", rating: 4.8, tags: ["Airport Lounge", "Golf Access", "Concierge"] },
  { name: "Millennia Cashback", bank: "HDFC Bank", category: "Cashback", categories: ["Cashback", "Rewards"], gradient: "from-blue-700 via-blue-600 to-blue-800", joiningFee: "1,000", annualFee: "1,000", rewardRate: "1-5%", cashback: "5% Online", rating: 4.5, tags: ["Online Shopping", "No-Fee First Year"] },
  { name: "Amazon Pay ICICI", bank: "ICICI Bank", category: "Cashback", categories: ["Cashback", "Rewards"], gradient: "from-orange-600 via-orange-500 to-amber-600", joiningFee: "Free", annualFee: "Free", rewardRate: "1-5%", cashback: "5% Amazon", rating: 4.6, tags: ["Lifetime Free", "Amazon Prime"] },
  { name: "Regalia Gold", bank: "HDFC Bank", category: "Travel", categories: ["Travel", "Rewards", "Premium"], gradient: "from-amber-500 via-yellow-500 to-amber-600", joiningFee: "2,500", annualFee: "2,500", rewardRate: "1-4 pts/₹150", cashback: "Travel Vouchers", rating: 4.4, tags: ["Lounge Access", "Club Vistara"] },
  { name: "Axis Ace", bank: "Axis Bank", category: "Cashback", categories: ["Cashback", "Rewards"], gradient: "from-emerald-700 via-emerald-600 to-teal-700", joiningFee: "499", annualFee: "499", rewardRate: "2-5%", cashback: "5% Bill Pay", rating: 4.5, tags: ["Google Pay", "Bill Payments"] },
  { name: "Kotak League Platinum", bank: "Kotak Mahindra", category: "Rewards", categories: ["Rewards", "Premium"], gradient: "from-red-700 via-rose-600 to-red-800", joiningFee: "499", annualFee: "499", rewardRate: "1-4 pts/₹150", cashback: "Movie Offers", rating: 4.2, tags: ["Dining Offers", "Fuel Surcharge Waiver"] },
  ...hdfcMapped
];

const bankAccounts = [
  { name: "SBI Digital Savings", bank: "SBI", type: "Savings", interest: "2.70", minBalance: "0", imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=120&auto=format&fit=crop&q=80", imageAlt: "SBI Logo", features: ["Zero balance", "Free debit card", "UPI enabled"] },
  { name: "HDFC Regular Savings", bank: "HDFC Bank", type: "Savings", interest: "3.00", minBalance: "10,000", imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=120&auto=format&fit=crop&q=80", imageAlt: "HDFC Bank Logo", features: ["Free NEFT/RTGS", "Doorstep banking", "Locker discount"] },
  { name: "Kotak 811", bank: "Kotak Mahindra", type: "Zero Balance", interest: "3.50", minBalance: "0", imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120&auto=format&fit=crop&q=80", imageAlt: "Kotak Mahindra Logo", features: ["100% digital", "Instant account", "No min balance"] },
  { name: "ICICI Salary Account", bank: "ICICI Bank", type: "Salary", interest: "3.00", minBalance: "0", imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80", imageAlt: "ICICI Bank Logo", features: ["Zero balance for salaried", "Free cheque book", "Preferential loan rates"] },
  { name: "Axis Current Pro", bank: "Axis Bank", type: "Current", interest: "0.00", minBalance: "25,000", imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80", imageAlt: "Axis Bank Logo", features: ["Business banking suite", "Free POS terminal", "Overdraft facility"] },
  { name: "RBL Savings Select", bank: "RBL Bank", type: "Savings", interest: "6.00", minBalance: "5,000", imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=120&auto=format&fit=crop&q=80", imageAlt: "RBL Bank Logo", features: ["High interest rate", "Free demat linkage", "Priority support"] },
];

const dematAccounts = [
  { name: "Zerodha", brokerage: "₹20 flat / Free equity delivery", amc: "300", opening: "Free", rating: 4.6, imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80", features: ["Kite trading app", "Free equity investing", "Advanced charting"] },
  { name: "Groww", brokerage: "₹20 flat / order", amc: "0", opening: "Free", rating: 4.5, imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=80", features: ["Beginner friendly", "Mutual funds + stocks", "Zero AMC first year"] },
  { name: "Upstox", brokerage: "₹20 flat / order", amc: "150", opening: "Free", rating: 4.3, imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=120&auto=format&fit=crop&q=80", features: ["Fast order execution", "Margin trading", "Low brokerage"] },
  { name: "Angel One", brokerage: "₹20 flat / order", amc: "240", opening: "Free", rating: 4.2, imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=120&auto=format&fit=crop&q=80", features: ["Smart API access", "Research reports", "ARQ advisory"] },
  { name: "ICICI Direct", brokerage: "0.55% delivery", amc: "700", opening: "Free", rating: 4.0, imageUrl: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=120&auto=format&fit=crop&q=80", features: ["3-in-1 account", "Research backed", "Bank-linked trading"] },
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
  {
    title: "5 Credit Cards That Actually Beat Inflation This Year",
    category: "Credit Cards",
    excerpt: "A breakdown of reward rates versus real household spending categories in 2026.",
    readTime: "6 min read",
    author: "Finovia Research Team",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">With inflation continuing to impact everyday expenses, finding financial tools that offer genuine value is crucial. Standard cash-back cards offering 1% returns are effectively losing ground against inflation rates hovering around 5-6% across essential categories.</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Why Inflation Demands a Smarter Credit Card Strategy</h2><p class="mb-4">To beat inflation, credit card rewards must exceed your category-specific inflation rates—particularly in dining, travel, groceries, and utility bills. By aligning your spending habits with tailored card benefits, you can reclaim lost purchasing power.</p><h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">1. The Grocery & Supermarket Optimizer</h3><p class="mb-4">Groceries account for over 25% of average urban household expenditure. Cards offering 5% accelerated reward points on online and offline supermarket purchases immediately offset food inflation.</p><div class="my-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border-l-4 border-blue-600 text-slate-700 dark:text-slate-200"><strong class="text-blue-900 dark:text-blue-300 font-semibold block mb-1">Key Takeaway:</strong><p class="text-sm m-0">Always align your highest monthly spending category with cards that feature no monthly cap on reward points accumulation.</p></div><h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">2. Fuel and Utility Surcharge Waivers</h3><p class="mb-4">Fuel prices fluctuate unpredictably, but fuel surcharge waivers combined with 4% reward points at partner outlets save the average commuter up to ₹4,500 annually.</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">How to Maximize Your Card Rewards</h2><ul class="list-disc pl-6 space-y-2 mb-6"><li><strong>Pay in full every month:</strong> High interest rates will negate any reward points earned.</li><li><strong>Track monthly reward caps:</strong> Ensure you don't spend past the accelerated reward threshold.</li><li><strong>Redeem for cash credit:</strong> Voucher values can depreciate, but direct statement credits retain 100% value.</li></ul>`
  },
  {
    title: "Fixed vs Floating: Picking the Right Home Loan Rate in 2026",
    category: "Loans",
    excerpt: "What changes when repo rates move, and how to hedge your home loan interest risk.",
    readTime: "8 min read",
    author: "Finovia Advisory Team",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">Choosing between a fixed rate and floating rate for your home loan is one of the most critical financial decisions you will make over a 15-to-30-year tenure. A difference of just 0.50% in interest rate can save or cost you lakhs of rupees in interest outflow.</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Understanding Floating Interest Rates</h2><p class="mb-4">Floating interest rates in India are linked directly to the RBI's repo rate via External Benchmark Lending Rates (EBLR). When the Central Bank cuts rates, your EMI burden or loan tenure reduces automatically.</p><div class="my-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border-l-4 border-amber-500 text-slate-700 dark:text-slate-200"><strong class="text-amber-900 dark:text-amber-300 font-semibold block mb-1">Pro Tip:</strong><p class="text-sm m-0">Making 1 extra EMI payment per year can reduce a 20-year home loan tenure down to 16 years!</p></div>`
  },
  {
    title: "Zero-Balance Accounts, Compared Honestly",
    category: "Bank Accounts",
    excerpt: "The fine print banks don't put on the homepage, explained plainly.",
    readTime: "5 min read",
    author: "Finovia Banking Team",
    imageUrl: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">Zero-balance savings accounts have revolutionized retail banking in India. With instant Video KYC, opening a bank account takes less than 5 minutes. However, "zero minimum balance" doesn't mean "zero charges".</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Hidden Charges to Watch Out For</h2><ul class="list-disc pl-6 space-y-2 mb-6"><li><strong>Physical Debit Card Issuance & Annual Fees:</strong> Ranging from ₹150 to ₹500/year.</li><li><strong>SMS Alert Fees:</strong> Ranging from ₹15 to ₹25 per quarter.</li><li><strong>ATM Cash Withdrawal Limits:</strong> Free withdrawals are typically capped at 3-5 transactions per month.</li></ul>`
  },
  {
    title: "Term Insurance at 25 vs 35: The Real Cost of Waiting",
    category: "Insurance",
    excerpt: "A simple premium comparison that makes the decision for you.",
    readTime: "4 min read",
    author: "Finovia Insurance Desk",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">Term insurance provides pure life cover at affordable rates. The younger and healthier you are when purchasing a policy, the lower your locked-in premium will remain for the entire policy duration (up to age 60 or 70).</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Premium Comparison: ₹1 Crore Cover</h2><ul class="list-disc pl-6 space-y-2 mb-6"><li><strong>At Age 25:</strong> ~₹650 per month (Locked for 35 years)</li><li><strong>At Age 35:</strong> ~₹1,350 per month (Locked for 25 years)</li></ul>`
  },
  {
    title: "Discount Brokers in India: Who's Actually Cheapest?",
    category: "Demat",
    excerpt: "Brokerage, AMC, and hidden charges lined up side by side.",
    readTime: "7 min read",
    author: "Finovia Wealth Desk",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">In stock market investing, trading costs compound significantly over time. Discount brokers have disrupted traditional flat percentage models with flat ₹20/order pricing. But how do they compare when factoring in AMC and DP charges?</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Key Cost Breakdown</h2><ul class="list-disc pl-6 space-y-2 mb-6"><li><strong>Equity Delivery:</strong> Zerodha offers ₹0 delivery brokerage, while others charge flat ₹20 or 0.05%.</li><li><strong>F&O Trades:</strong> Standardized across most platforms at ₹20 per executed order.</li><li><strong>DP Charges:</strong> Range from ₹13.50 to ₹18.50 per scrip per day on sales.</li></ul>`
  },
  {
    title: "How Your CIBIL Score Actually Decides Your Interest Rate",
    category: "Credit Cards",
    excerpt: "The mechanics banks use, and three habits that move the needle fast.",
    readTime: "6 min read",
    author: "Finovia Credit Desk",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    content: `<p class="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">Most borrowers know that a good credit score helps secure loan approvals. However, many are unaware that a score above 775 unlocks risk-based pricing, offering up to 1.5% lower interest rates on home and personal loans.</p><h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3 Quick Habits to Boost Your Score</h2><ul class="list-disc pl-6 space-y-2 mb-6"><li>Keep your Credit Utilization Ratio (CUR) below 30%.</li><li>Never miss or delay an EMI payment date.</li><li>Maintain a healthy mix of secured and unsecured credit lines.</li></ul>`
  }
];

module.exports = { creditCards, bankAccounts, dematAccounts, loans, insurance, offers, blogPosts };
