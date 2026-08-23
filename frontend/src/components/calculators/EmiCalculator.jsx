import React, { useState, useMemo } from "react";
import { Calculator } from "lucide-react";
import { CalculatorHeader, CalculatorInputGroup, CalculatorResultCard } from "./CalculatorBase.jsx";

const inr = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const LOAN_PRESETS = [
  { label: "Personal Loan", amount: 500000, rate: 11.5, tenure: 5 },
  { label: "Home Loan", amount: 5000000, rate: 8.5, tenure: 20 },
  { label: "Car Loan", amount: 800000, rate: 9.0, tenure: 7 },
];

export function EmiCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);
  const [tenureType, setTenureType] = useState("years");

  const months = tenureType === "years" ? tenure * 12 : tenure;

  const emi = useMemo(() => {
    if (!amount || !rate || !months) return 0;
    const r = rate / 12 / 100;
    const val = (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
    return isFinite(val) ? val : 0;
  }, [amount, rate, months]);

  const totalPayment = emi * months;
  const totalInterest = Math.max(0, totalPayment - amount);

  const principalPercent = totalPayment > 0 ? Math.round((amount / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  const applyPreset = (preset) => {
    setAmount(preset.amount);
    setRate(preset.rate);
    setTenure(preset.tenure);
    setTenureType("years");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 lg:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
      <CalculatorHeader
        icon={Calculator}
        iconBgClass="bg-blue-50 dark:bg-blue-950"
        iconColorClass="text-blue-600 dark:text-blue-400"
        title="Smart Loan EMI Calculator"
        subtitle="Calculate your monthly EMI and total interest payable instant outcome."
        presets={LOAN_PRESETS}
        onSelectPreset={applyPreset}
        presetBorderHoverClass="hover:border-blue-500"
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <CalculatorInputGroup
            label="Loan Amount"
            value={amount}
            onChange={setAmount}
            min={10000}
            max={10000000}
            step={10000}
            prefix="₹"
            accentClass="accent-blue-600"
            minLabel="₹10K"
            midLabel="₹50 Lakh"
            maxLabel="₹1 Cr"
          />

          <CalculatorInputGroup
            label="Interest Rate (% p.a.)"
            value={rate}
            onChange={setRate}
            min={5}
            max={25}
            step={0.1}
            suffix="%"
            inputWidth="w-28"
            accentClass="accent-blue-600"
            minLabel="5%"
            midLabel="15%"
            maxLabel="25%"
          />

          <CalculatorInputGroup
            label="Loan Tenure"
            value={tenure}
            onChange={setTenure}
            min={1}
            max={tenureType === "years" ? 30 : 360}
            step={1}
            inputWidth="w-20"
            accentClass="accent-blue-600"
            toggleOptions={[
              { label: "Yr", value: "years" },
              { label: "Mo", value: "months" },
            ]}
            selectedToggle={tenureType}
            onToggleChange={setTenureType}
            minLabel={tenureType === "years" ? "1 Yr" : "1 Mo"}
            midLabel={tenureType === "years" ? "15 Yrs" : "180 Mos"}
            maxLabel={tenureType === "years" ? "30 Yrs" : "360 Mos"}
          />
        </div>

        <CalculatorResultCard
          categoryTitle="Calculated Repayment"
          mainValueLabel="Monthly EMI"
          mainValueFormatted={inr(emi)}
          mainValueColorClass="text-blue-600 dark:text-blue-400"
          percent1={principalPercent}
          percent1Label="Principal"
          percent1ColorClass="bg-blue-600 text-blue-600 dark:text-blue-400"
          percent2={interestPercent}
          percent2Label="Interest"
          percent2ColorClass="bg-amber-500 text-amber-500"
          rows={[
            { label: "Principal Amount", value: inr(amount) },
            { label: "Total Interest Payable", value: inr(totalInterest), valueColorClass: "text-amber-600 dark:text-amber-400" },
            { label: "Total Amount Payable", value: inr(totalPayment), isTotal: true, valueColorClass: "text-slate-900 dark:text-white font-extrabold" },
          ]}
          actionButtonText="Compare Suitable Loans"
        />
      </div>
    </div>
  );
}
