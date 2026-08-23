import React from "react";

export function CalculatorHeader({ icon: Icon, iconBgClass, iconColorClass, title, subtitle, presets, onSelectPreset, presetBorderHoverClass }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
      <div>
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
            <Icon className="w-4 h-4" />
          </div>
          <h3 className="fin-display text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      </div>

      {presets && presets.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 shrink-0">Presets:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => onSelectPreset(p)}
              className={`fin-focus text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 ${presetBorderHoverClass || "hover:border-blue-500"} bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CalculatorInputGroup({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  accentClass = "accent-blue-600",
  minLabel,
  midLabel,
  maxLabel,
  inputWidth = "w-36",
  toggleOptions,
  selectedToggle,
  onToggleChange
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">{label}</label>
        <div className="flex items-center gap-2">
          <div className="relative">
            {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600">{prefix}</span>}
            <input
              type="number"
              step={step}
              value={value}
              onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
              className={`fin-focus ${inputWidth} ${prefix ? "pl-7" : "pl-3"} ${suffix ? "pr-7" : "pr-3"} py-1.5 text-right font-mono text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white`}
            />
            {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">{suffix}</span>}
          </div>

          {toggleOptions && toggleOptions.length > 0 && (
            <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
              {toggleOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onToggleChange(opt.value)}
                  className={`px-2 py-1 rounded-lg transition-colors ${selectedToggle === opt.value ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs" : "text-slate-500"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`fin-focus w-full ${accentClass} h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer`}
      />
      {(minLabel || midLabel || maxLabel) && (
        <div className="flex justify-between text-[11px] font-semibold text-slate-400">
          <span>{minLabel}</span>
          <span>{midLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}

export function CalculatorResultCard({
  categoryTitle,
  mainValueLabel,
  mainValueFormatted,
  mainValueColorClass = "text-blue-600 dark:text-blue-400",
  percent1,
  percent1Label,
  percent1ColorClass = "bg-blue-600 text-blue-600 dark:text-blue-400",
  percent2,
  percent2Label,
  percent2ColorClass = "bg-amber-500 text-amber-500",
  rows = [],
  actionButtonText,
  onAction
}) {
  return (
    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{categoryTitle}</span>

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{mainValueLabel}</p>
          <h4 className={`fin-display text-3xl sm:text-4xl font-extrabold ${mainValueColorClass} mt-0.5`}>
            {mainValueFormatted}
          </h4>
        </div>

        {/* Visual Split Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <div style={{ width: `${percent1}%` }} className={`${percent1ColorClass.split(" ")[0]} h-full transition-all`} />
            <div style={{ width: `${percent2}%` }} className={`${percent2ColorClass.split(" ")[0]} h-full transition-all`} />
          </div>
          <div className="flex justify-between text-[11px] font-semibold">
            <span className={percent1ColorClass.split(" ").slice(1).join(" ") || percent1ColorClass}>{percent1Label} ({percent1}%)</span>
            <span className={percent2ColorClass.split(" ").slice(1).join(" ") || percent2ColorClass}>{percent2Label} ({percent2}%)</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          {rows.map((row, idx) => (
            <div key={idx} className={`flex justify-between text-xs ${row.isTotal ? "pt-2 border-t border-slate-200/60 dark:border-slate-800" : ""}`}>
              <span className={`text-slate-500 dark:text-slate-400 ${row.isTotal ? "font-bold text-slate-800 dark:text-slate-200" : "font-medium"}`}>{row.label}</span>
              <span className={`font-bold ${row.valueColorClass || "text-slate-800 dark:text-slate-200"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {actionButtonText && (
        <button
          onClick={onAction || (() => window.scrollTo({ top: 500, behavior: "smooth" }))}
          className={`fin-focus w-full py-2.5 rounded-xl text-white font-semibold text-xs transition-colors shadow-sm ${
            mainValueColorClass.includes("emerald")
              ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
              : mainValueColorClass.includes("amber")
              ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
              : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
          }`}
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
}
