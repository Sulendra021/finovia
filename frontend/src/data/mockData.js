import {
  CreditCard, Landmark, TrendingUp, Wallet, ShieldCheck, Search, Tag, Newspaper, Users, ArrowDownUp,
  BookOpen, Zap, Award,
} from "lucide-react";

export const NAV = [
  { key: "cards", label: "Credit Cards", icon: CreditCard, image: "/nav/credit_card.webp" },
  { key: "bank", label: "Bank Accounts", icon: Landmark, image: "/nav/bank_account.webp" },
  { key: "demat", label: "Demat Accounts", icon: TrendingUp, image: "/nav/demat_account.webp" },
  { key: "loans", label: "Loans", icon: Wallet, image: "/nav/lone.webp" },
  { key: "insurance", label: "Insurance", icon: ShieldCheck, image: "/nav/insurance.webp" },
  { key: "offers", label: "Offers", icon: Tag },
  { key: "blog", label: "Blog", icon: Newspaper },
];

export const banks = [
  { id: 1, name: "HDFC Bank", shortName: "HDFC", logo: "/logos/hdfc.svg", website: "https://www.hdfcbank.com" },
  { id: 2, name: "ICICI Bank", shortName: "ICICI", logo: "/logos/icici.svg", website: "https://www.icicibank.com" },
  { id: 3, name: "State Bank of India", shortName: "SBI", logo: "/logos/sbi.png", website: "https://www.sbi.co.in" },
  { id: 4, name: "Axis Bank", shortName: "Axis", logo: "/logos/axis.svg", website: "https://www.axisbank.com" },
  { id: 5, name: "Kotak Mahindra Bank", shortName: "Kotak", logo: "/logos/kotak.svg", website: "https://www.kotak.com" },
  { id: 6, name: "IndusInd Bank", shortName: "IndusInd", logo: "/logos/indusind.webp", website: "https://www.indusind.com" },
  { id: 7, name: "Yes Bank", shortName: "YES", logo: "/logos/yes.png", website: "https://www.yesbank.in" },
  { id: 8, name: "IDFC FIRST Bank", shortName: "IDFC FIRST", logo: "/logos/idfc.svg", website: "https://www.idfcfirstbank.com" },
  { id: 9, name: "Federal Bank", shortName: "Federal", logo: "/logos/federal.svg", website: "https://www.federalbank.co.in" },
  { id: 10, name: "Bank of Baroda", shortName: "BOB", logo: "/logos/bob.svg", website: "https://www.bankofbaroda.in" },
  { id: 11, name: "Punjab National Bank", shortName: "PNB", logo: "/logos/pnb.svg", website: "https://www.pnbindia.in" },
  { id: 12, name: "Canara Bank", shortName: "Canara", logo: "/logos/canara.svg.webp", website: "https://canarabank.com" },
  { id: 13, name: "Union Bank of India", shortName: "Union", logo: "/logos/union.svg", website: "https://www.unionbankofindia.co.in" },
  { id: 14, name: "Bank of India", shortName: "BOI", logo: "/logos/Bank_of_India.png", website: "https://bankofindia.co.in" },
  { id: 15, name: "Indian Bank", shortName: "Indian Bank", logo: "/logos/indian.png", website: "https://www.indianbank.in" },
  { id: 16, name: "Indian Overseas Bank", shortName: "IOB", logo: "/logos/Indian_Overseas_Bank_Logo.svg.webp", website: "https://www.iob.in" },
  { id: 17, name: "UCO Bank", shortName: "UCO", logo: "/logos/UCO_Bank.jpg", website: "https://www.ucobank.com" },
  { id: 18, name: "Bank of Maharashtra", shortName: "BOM", logo: "/logos/Bank_of_Maharashtra_logo.svg.webp", website: "https://bankofmaharashtra.in" },
  { id: 19, name: "AU Small Finance Bank", shortName: "AU Bank", logo: "/logos/aubank.png", website: "https://www.aubank.in" },
  { id: 20, name: "RBL Bank", shortName: "RBL", logo: "/logos/rbl.png", website: "https://www.rblbank.com" },
];

export const TRUSTED_BANKS = banks;

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

