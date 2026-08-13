import React, { useState, useMemo } from "react";
import { Calculator, TrendingUp, PiggyBank } from "lucide-react";

function Slider({ label, value, onChange, min, max, step, format }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
        <span>{label}</span>
        <span className="fin-num font-semibold text-slate-800 dark:text-slate-100">{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="fin-focus w-full accent-blue-600" />
    </div>
  );
}

function ResultRow({ label, value, big }) {
  return (
    <div className="flex items-center justify-between">
      <span className={big ? "text-sm text-slate-500 dark:text-slate-400" : "text-xs text-slate-400 dark:text-slate-500"}>{label}</span>
      <span className={`fin-num font-bold ${big ? "text-2xl text-blue-600" : "text-sm text-slate-800 dark:text-slate-100"}`}>{value}</span>
    </div>
  );
}

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const emi = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const val = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return val || 0;
  }, [amount, rate, tenure]);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - amount;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-blue-600" />
        <h3 className="fin-display font-semibold text-slate-900 dark:text-white">EMI Calculator</h3>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        <Slider label="Loan amount" value={amount} onChange={setAmount} min={50000} max={5000000} step={10000} format={inr} />
        <Slider label="Interest rate" value={rate} onChange={setRate} min={7} max={20} step={0.1} format={(v) => `${v}%`} />
        <Slider label="Tenure (years)" value={tenure} onChange={setTenure} min={1} max={30} step={1} format={(v) => v} />
      </div>
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <ResultRow label="Monthly EMI" value={inr(emi)} big />
        <ResultRow label="Total interest payable" value={inr(totalInterest)} />
        <ResultRow label="Total payment" value={inr(totalPayment)} />
      </div>
    </div>
  );
}

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const { invested, futureValue } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return { invested: monthly * n, futureValue: fv || 0 };
  }, [monthly, rate, years]);
  const gains = futureValue - invested;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h3 className="fin-display font-semibold text-slate-900 dark:text-white">SIP / Investment Calculator</h3>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        <Slider label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} format={inr} />
        <Slider label="Expected annual return" value={rate} onChange={setRate} min={1} max={30} step={0.5} format={(v) => `${v}%`} />
        <Slider label="Time period (years)" value={years} onChange={setYears} min={1} max={40} step={1} format={(v) => v} />
      </div>
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <ResultRow label="Future value" value={inr(futureValue)} big />
        <ResultRow label="Total invested" value={inr(invested)} />
        <ResultRow label="Estimated gains" value={inr(gains)} />
      </div>
    </div>
  );
}

export function FdCalculator() {
  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(3);
  const maturity = useMemo(() => {
    const n = 4; // quarterly compounding, typical for Indian FDs
    return principal * Math.pow(1 + rate / 100 / n, n * years);
  }, [principal, rate, years]);
  const interestEarned = maturity - principal;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-6">
        <PiggyBank className="w-5 h-5 text-amber-600" />
        <h3 className="fin-display font-semibold text-slate-900 dark:text-white">Fixed Deposit Calculator</h3>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        <Slider label="Principal amount" value={principal} onChange={setPrincipal} min={5000} max={5000000} step={5000} format={inr} />
        <Slider label="Interest rate" value={rate} onChange={setRate} min={3} max={9} step={0.1} format={(v) => `${v}%`} />
        <Slider label="Tenure (years)" value={years} onChange={setYears} min={1} max={10} step={1} format={(v) => v} />
      </div>
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <ResultRow label="Maturity value" value={inr(maturity)} big />
        <ResultRow label="Interest earned" value={inr(interestEarned)} />
        <ResultRow label="Compounding" value="Quarterly" />
      </div>
    </div>
  );
}
