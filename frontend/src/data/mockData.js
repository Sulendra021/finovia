import {
  CreditCard, Landmark, TrendingUp, Wallet, ShieldCheck, Search, Home as HomeIcon,
  Car, Briefcase, HeartPulse, PiggyBank, Tag, Newspaper, Users, ArrowDownUp,
  BookOpen, Zap, Award, GraduationCap, Plane, Building2,
} from "lucide-react";

export const NAV = [
  { key: "cards", label: "Credit Cards", icon: CreditCard },
  { key: "bank", label: "Bank Accounts", icon: Landmark },
  { key: "demat", label: "Demat Accounts", icon: TrendingUp },
  { key: "loans", label: "Loans", icon: Wallet },
  { key: "insurance", label: "Insurance", icon: ShieldCheck },
  { key: "offers", label: "Offers", icon: Tag },
  { key: "blog", label: "Blog", icon: Newspaper },
];

export const TRUSTED_BANKS = [
  "SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra",
  "RBL Bank", "Yes Bank", "IDFC First", "IndusInd Bank", "Punjab National Bank",
];

export const CREDIT_CARDS = [
  { id: 1, name: "Infinia Metal", bank: "HDFC Bank", category: "Premium", gradient: "from-slate-900 via-slate-800 to-slate-950", joiningFee: "10,000", annualFee: "10,000", rewardRate: "3.3%", cashback: "Up to 5%", rating: 4.8, tags: ["Airport Lounge", "Golf Access", "Concierge"] },
  { id: 2, name: "Millennia Cashback", bank: "HDFC Bank", category: "Cashback", gradient: "from-blue-700 via-blue-600 to-blue-800", joiningFee: "1,000", annualFee: "1,000", rewardRate: "1-5%", cashback: "5% Online", rating: 4.5, tags: ["Online Shopping", "No-Fee First Year"] },
  { id: 3, name: "Amazon Pay ICICI", bank: "ICICI Bank", category: "Cashback", gradient: "from-orange-600 via-orange-500 to-amber-600", joiningFee: "Free", annualFee: "Free", rewardRate: "1-5%", cashback: "5% Amazon", rating: 4.6, tags: ["Lifetime Free", "Amazon Prime"] },
  { id: 4, name: "Regalia Gold", bank: "HDFC Bank", category: "Travel", gradient: "from-amber-500 via-yellow-500 to-amber-600", joiningFee: "2,500", annualFee: "2,500", rewardRate: "1-4 pts/₹150", cashback: "Travel Vouchers", rating: 4.4, tags: ["Lounge Access", "Club Vistara"] },
  { id: 5, name: "Axis Ace", bank: "Axis Bank", category: "Cashback", gradient: "from-emerald-700 via-emerald-600 to-teal-700", joiningFee: "499", annualFee: "499", rewardRate: "2-5%", cashback: "5% Bill Pay", rating: 4.5, tags: ["Google Pay", "Bill Payments"] },
  { id: 6, name: "Kotak League Platinum", bank: "Kotak Mahindra", category: "Rewards", gradient: "from-red-700 via-rose-600 to-red-800", joiningFee: "499", annualFee: "499", rewardRate: "1-4 pts/₹150", cashback: "Movie Offers", rating: 4.2, tags: ["Dining Offers", "Fuel Surcharge Waiver"] },
];

export const BANK_ACCOUNTS = [
  { id: 1, name: "SBI Digital Savings", bank: "SBI", type: "Savings", interest: "2.70", minBalance: "0", icon: PiggyBank, features: ["Zero balance", "Free debit card", "UPI enabled"] },
  { id: 2, name: "HDFC Regular Savings", bank: "HDFC Bank", type: "Savings", interest: "3.00", minBalance: "10,000", icon: PiggyBank, features: ["Free NEFT/RTGS", "Doorstep banking", "Locker discount"] },
  { id: 3, name: "Kotak 811", bank: "Kotak Mahindra", type: "Zero Balance", interest: "3.50", minBalance: "0", icon: Wallet, features: ["100% digital", "Instant account", "No min balance"] },
  { id: 4, name: "ICICI Salary Account", bank: "ICICI Bank", type: "Salary", interest: "3.00", minBalance: "0", icon: Briefcase, features: ["Zero balance for salaried", "Free cheque book", "Preferential loan rates"] },
  { id: 5, name: "Axis Current Pro", bank: "Axis Bank", type: "Current", interest: "0.00", minBalance: "25,000", icon: Building2, features: ["Business banking suite", "Free POS terminal", "Overdraft facility"] },
  { id: 6, name: "RBL Savings Select", bank: "RBL Bank", type: "Savings", interest: "6.00", minBalance: "5,000", icon: PiggyBank, features: ["High interest rate", "Free demat linkage", "Priority support"] },
];

export const DEMAT_ACCOUNTS = [
  { id: 1, name: "Zerodha", brokerage: "₹20 flat / Free equity delivery", amc: "300", opening: "Free", rating: 4.6, features: ["Kite trading app", "Free equity investing", "Advanced charting"] },
  { id: 2, name: "Groww", brokerage: "₹20 flat / order", amc: "0", opening: "Free", rating: 4.5, features: ["Beginner friendly", "Mutual funds + stocks", "Zero AMC first year"] },
  { id: 3, name: "Upstox", brokerage: "₹20 flat / order", amc: "150", opening: "Free", rating: 4.3, features: ["Fast order execution", "Margin trading", "Low brokerage"] },
  { id: 4, name: "Angel One", brokerage: "₹20 flat / order", amc: "240", opening: "Free", rating: 4.2, features: ["Smart API access", "Research reports", "ARQ advisory"] },
  { id: 5, name: "ICICI Direct", brokerage: "0.55% delivery", amc: "700", opening: "Free", rating: 4.0, features: ["3-in-1 account", "Research backed", "Bank-linked trading"] },
];

export const LOANS = [
  { id: 1, name: "Personal Loan", icon: Wallet, rate: "10.5% - 18%", amount: "50,000 - 40,00,000", tenure: "1 - 5 yrs", processingFee: "Up to 2.5%", desc: "Instant unsecured funding for any personal need, minimal documentation." },
  { id: 2, name: "Home Loan", icon: HomeIcon, rate: "8.4% - 10.2%", amount: "5,00,000 - 5,00,00,000", tenure: "Up to 30 yrs", processingFee: "Up to 1%", desc: "Fund your dream home with long tenures and competitive floating rates." },
  { id: 3, name: "Car Loan", icon: Car, rate: "9.0% - 12.5%", amount: "1,00,000 - 1,00,00,000", tenure: "1 - 7 yrs", processingFee: "Up to 1.5%", desc: "Drive home a new or used car with up to 100% on-road funding." },
  { id: 4, name: "Business Loan", icon: Briefcase, rate: "11% - 20%", amount: "1,00,000 - 75,00,000", tenure: "1 - 5 yrs", processingFee: "Up to 3%", desc: "Working capital and expansion funding, collateral-free options available." },
  { id: 5, name: "Education Loan", icon: GraduationCap, rate: "8.5% - 13%", amount: "50,000 - 1,50,00,000", tenure: "Up to 15 yrs", processingFee: "Nil - 1%", desc: "Study in India or abroad with moratorium until course completion." },
];

export const INSURANCE = [
  { id: 1, name: "Health Insurance", icon: HeartPulse, provider: "HDFC ERGO", premium: "399 / month", coverage: "Up to ₹1 Cr", claimRatio: "98.5%" },
  { id: 2, name: "Term Life Insurance", icon: ShieldCheck, provider: "ICICI Prudential", premium: "699 / month", coverage: "Up to ₹2 Cr", claimRatio: "99.2%" },
  { id: 3, name: "Motor Insurance", icon: Car, provider: "Bajaj Allianz", premium: "1,999 / year", coverage: "IDV based", claimRatio: "97.8%" },
  { id: 4, name: "Travel Insurance", icon: Plane, provider: "Tata AIG", premium: "199 / trip", coverage: "Up to $5,00,000", claimRatio: "96.4%" },
];

export const OFFERS = [
  { id: 1, title: "5% Cashback on Grocery Spends", bank: "Axis Ace Card", category: "Cashback", expiry: "31 Aug 2026", color: "emerald" },
  { id: 2, title: "Zero Processing Fee Home Loans", bank: "SBI", category: "Loans", expiry: "15 Sep 2026", color: "blue" },
  { id: 3, title: "First Year Free + ₹500 Amazon Voucher", bank: "ICICI Bank", category: "Credit Card", expiry: "30 Aug 2026", color: "amber" },
  { id: 4, title: "Flat 20% Off Health Premium", bank: "HDFC ERGO", category: "Insurance", expiry: "10 Sep 2026", color: "rose" },
  { id: 5, title: "Free Demat Account + ₹0 AMC", bank: "Groww", category: "Demat", expiry: "Ongoing", color: "violet" },
  { id: 6, title: "9.5% Special Rate Car Loans", bank: "Kotak Mahindra", category: "Loans", expiry: "05 Sep 2026", color: "blue" },
];

export const BLOG_POSTS = [
  { id: 1, title: "5 Credit Cards That Actually Beat Inflation This Year", category: "Credit Cards", excerpt: "A breakdown of reward rates versus real household spending categories.", readTime: "6 min read", date: "Aug 2, 2026" },
  { id: 2, title: "Fixed vs Floating: Picking the Right Home Loan Rate in 2026", category: "Loans", excerpt: "What changes when repo rates move, and how to hedge either way.", readTime: "8 min read", date: "Jul 28, 2026" },
  { id: 3, title: "Zero-Balance Accounts, Compared Honestly", category: "Bank Accounts", excerpt: "The fine print banks don't put on the homepage, explained plainly.", readTime: "5 min read", date: "Jul 24, 2026" },
  { id: 4, title: "Term Insurance at 25 vs 35: The Real Cost of Waiting", category: "Insurance", excerpt: "A simple premium comparison that makes the decision for you.", readTime: "4 min read", date: "Jul 19, 2026" },
  { id: 5, title: "Discount Brokers in India: Who's Actually Cheapest?", category: "Demat", excerpt: "Brokerage, AMC, and hidden charges lined up side by side.", readTime: "7 min read", date: "Jul 12, 2026" },
  { id: 6, title: "How Your CIBIL Score Actually Decides Your Interest Rate", category: "Credit Cards", excerpt: "The mechanics banks use, and three habits that move the needle fast.", readTime: "6 min read", date: "Jul 5, 2026" },
];

export const STEPS = [
  { n: 1, title: "Visitor", desc: "User lands on Finovia platform", icon: Users },
  { n: 2, title: "Search & Explore", desc: "Search financial products & explore categories", icon: Search },
  { n: 3, title: "Compare", desc: "Compare features, benefits & offers side by side", icon: ArrowDownUp },
  { n: 4, title: "View Details", desc: "Read detailed information about the product", icon: BookOpen },
  { n: 5, title: "Apply Now", desc: "Click Apply Now, redirected to partner bank", icon: Zap },
  { n: 6, title: "Commission", desc: "Successful lead generates commission for Finovia", icon: Award },
];

export const COLOR_MAP = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-200", dot: "bg-blue-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", dot: "bg-amber-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200", dot: "bg-rose-500" },
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", dot: "bg-violet-500" },
};

// NOTE: these constants are the same fixtures used to seed the backend
// (see backend/src/seed/seedData.js). Pages can swap `services/api.js`
// calls in for these once the backend is running - see src/services/api.js.
