import React, { useState, useMemo } from "react";
import { PiggyBank } from "lucide-react";
import { CalculatorHeader, CalculatorInputGroup, CalculatorResultCard } from "./CalculatorBase.jsx";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const FD_PRESETS = [
  { label: "Short Term FD", principal: 100000, rate: 6.8, years: 1 },
  { label: "Tax Saver (5 Yrs)", principal: 200000, rate: 7.2, years: 5 },
  { label: "Senior Citizen Special", principal: 500000, rate: 7.75, years: 3 },
];

export function FdCalculator() {
  const [principal, setPrincipal] = useState(200000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(3);

  const maturity = useMemo(() => {
    if (!principal || !rate || !years) return 0;
    const n = 4; // Quarterly compounding
    const val = principal * Math.pow(1 + rate / 100 / n, n * years);
    return isFinite(val) ? val : 0;
  }, [principal, rate, years]);

  const interestEarned = Math.max(0, maturity - principal);
  const principalPercent = maturity > 0 ? Math.round((principal / maturity) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  const applyPreset = (preset) => {
    setPrincipal(preset.principal);
    setRate(preset.rate);
    setYears(preset.years);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
      <CalculatorHeader
        icon={PiggyBank}
        iconBgClass="bg-amber-50 dark:bg-amber-950"
        iconColorClass="text-amber-600 dark:text-amber-400"
        title="Fixed Deposit Maturity Calculator"
        subtitle="Calculate FD returns with quarterly interest compounding."
        presets={FD_PRESETS}
        onSelectPreset={applyPreset}
        presetBorderHoverClass="hover:border-amber-500"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <CalculatorInputGroup
            label="Deposit Amount"
            value={principal}
            onChange={setPrincipal}
            min={5000}
            max={5000000}
            step={5000}
            prefix="₹"
            accentClass="accent-amber-600"
            minLabel="₹5,000"
            midLabel="₹25 Lakh"
            maxLabel="₹50 Lakh"
          />

          <CalculatorInputGroup
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={3}
            max={12}
            step={0.1}
            suffix="%"
            inputWidth="w-28"
            accentClass="accent-amber-600"
            minLabel="3%"
            midLabel="7.5%"
            maxLabel="12%"
          />

          <CalculatorInputGroup
            label="Tenure (Years)"
            value={years}
            onChange={setYears}
            min={1}
            max={10}
            step={1}
            suffix="Yrs"
            inputWidth="w-24"
            accentClass="accent-amber-600"
            minLabel="1 Yr"
            midLabel="5 Yrs"
            maxLabel="10 Yrs"
          />
        </div>

        <CalculatorResultCard
          categoryTitle="Calculated Returns"
          mainValueLabel="Maturity Value"
          mainValueFormatted={inr(maturity)}
          mainValueColorClass="text-amber-600 dark:text-amber-400"
          percent1={principalPercent}
          percent1Label="Principal"
          percent1ColorClass="bg-slate-700 dark:bg-slate-300 text-slate-600 dark:text-slate-300"
          percent2={interestPercent}
          percent2Label="FD Interest"
          percent2ColorClass="bg-amber-500 text-amber-500"
          rows={[
            { label: "Principal Deposit", value: inr(principal) },
            { label: "Total Interest Earned", value: inr(interestEarned), valueColorClass: "text-amber-600 dark:text-amber-400 font-bold" },
            { label: "Compounding", value: "Quarterly (4x/yr)", valueColorClass: "text-slate-700 dark:text-slate-300 font-semibold" },
          ]}
          actionButtonText="Compare Bank Account Rates"
        />
      </div>
    </div>
  );
}
