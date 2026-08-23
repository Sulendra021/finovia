import React, { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { CalculatorHeader, CalculatorInputGroup, CalculatorResultCard } from "./CalculatorBase.jsx";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const SIP_PRESETS = [
  { label: "Wealth Builder", monthly: 5000, rate: 12, years: 10 },
  { label: "Retirement Fund", monthly: 15000, rate: 14, years: 20 },
  { label: "Short Term Goal", monthly: 10000, rate: 10, years: 3 },
];

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const { invested, futureValue } = useMemo(() => {
    if (!monthly || !rate || !years) return { invested: 0, futureValue: 0 };
    const r = rate / 12 / 100;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    return { invested: monthly * n, futureValue: isFinite(fv) ? fv : 0 };
  }, [monthly, rate, years]);

  const gains = Math.max(0, futureValue - invested);
  const investedPercent = futureValue > 0 ? Math.round((invested / futureValue) * 100) : 50;
  const gainsPercent = 100 - investedPercent;

  const applyPreset = (preset) => {
    setMonthly(preset.monthly);
    setRate(preset.rate);
    setYears(preset.years);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
      <CalculatorHeader
        icon={TrendingUp}
        iconBgClass="bg-emerald-50 dark:bg-emerald-950"
        iconColorClass="text-emerald-600 dark:text-emerald-400"
        title="SIP Investment Growth Calculator"
        subtitle="Estimate wealth creation through systematic monthly investments."
        presets={SIP_PRESETS}
        onSelectPreset={applyPreset}
        presetBorderHoverClass="hover:border-emerald-500"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <CalculatorInputGroup
            label="Monthly Investment"
            value={monthly}
            onChange={setMonthly}
            min={500}
            max={200000}
            step={500}
            prefix="₹"
            accentClass="accent-emerald-600"
            minLabel="₹500"
            midLabel="₹1 Lakh"
            maxLabel="₹2 Lakh"
          />

          <CalculatorInputGroup
            label="Expected Annual Return"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            inputWidth="w-28"
            accentClass="accent-emerald-600"
            minLabel="1%"
            midLabel="15%"
            maxLabel="30%"
          />

          <CalculatorInputGroup
            label="Time Horizon (Years)"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="Yrs"
            inputWidth="w-24"
            accentClass="accent-emerald-600"
            minLabel="1 Yr"
            midLabel="20 Yrs"
            maxLabel="40 Yrs"
          />
        </div>

        <CalculatorResultCard
          categoryTitle="Projected Maturity"
          mainValueLabel="Future Value"
          mainValueFormatted={inr(futureValue)}
          mainValueColorClass="text-emerald-600 dark:text-emerald-400"
          percent1={investedPercent}
          percent1Label="Invested"
          percent1ColorClass="bg-slate-700 dark:bg-slate-300 text-slate-600 dark:text-slate-300"
          percent2={gainsPercent}
          percent2Label="Est. Returns"
          percent2ColorClass="bg-emerald-500 text-emerald-500"
          rows={[
            { label: "Total Amount Invested", value: inr(invested) },
            { label: "Estimated Wealth Gain", value: inr(gains), valueColorClass: "text-emerald-600 dark:text-emerald-400 font-bold" },
          ]}
          actionButtonText="Explore Top Mutual Funds"
        />
      </div>
    </div>
  );
}
