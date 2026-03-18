import React, { useState, useEffect } from "react";
import { CheckCircle2, Info, Settings, X, Plus } from "lucide-react";

// HealthCategoryCard
export function HealthCategoryCard({ title, score, config, items, state, onChange }: {
  title: string,
  score: number,
  config: any,
  items: { id: string, label: string }[],
  state: Record<string, boolean>,
  onChange: (id: string, val: boolean) => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
      <div className={`p-5 min-h-[140px] flex flex-col justify-between ${config.bg} border-b ${config.border} transition-colors duration-500`}>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-neutral-800 leading-tight">{title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white shadow-sm ${config.text}`}>
            {config.label}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-end justify-between mb-2">
            <span className={`text-3xl font-black ${config.text}`}>{score.toFixed(1)}</span>
            <span className="text-xs font-semibold text-neutral-500 uppercase">Score Calculado</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
            <div className={`h-full ${config.bar} transition-all duration-500 ease-out`} style={{ width: `${score * 10}%` }} />
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 bg-white">
        <ul className="space-y-3.5">
          {items.map(item => (
            <li key={item.id} className="flex items-start gap-3 group">
              <button
                onClick={() => onChange(item.id, !state[item.id])}
                className="mt-0.5 shrink-0 transition-transform active:scale-95 focus:outline-none"
              >
                {state[item.id] ? (
                  <CheckCircle2 className={`w-5 h-5 ${config.text}`} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-neutral-300 group-hover:border-neutral-400 transition-colors" />
                )}
              </button>
              <span
                className={`text-sm leading-tight mt-0.5 cursor-pointer select-none transition-colors ${state[item.id] ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-700'}`}
                onClick={() => onChange(item.id, !state[item.id])}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// AdHealthModule
export function AdHealthModule({ title, score, config, children }: { title: string, score: number, config: any, children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col overflow-hidden">
      <div className={`p-5 min-h-[140px] flex flex-col justify-between ${config.bg} border-b ${config.border} transition-colors duration-500`}>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-neutral-800 leading-tight">{title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white shadow-sm ${config.text}`}>
            {config.label}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-end justify-between mb-2">
            <span className={`text-3xl font-black ${config.text}`}>{score.toFixed(1)}</span>
            <span className="text-xs font-semibold text-neutral-500 uppercase">Média do Módulo</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
            <div className={`h-full ${config.bar} transition-all duration-500 ease-out`} style={{ width: `${score * 10}%` }} />
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 bg-white space-y-4">
        {children}
      </div>
    </div>
  );
}

// EditableMetricCard
export function EditableMetricCard({ metric, metricKey, moduleName, getMetricHealthColor, onChange }: {
  key?: React.Key, metric: any, metricKey: string, moduleName: string, getMetricHealthColor: (m: any) => string, onChange: (mod: string, key: string, field: 'value' | 'good' | 'excellent', val: string) => void
}) {
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [isEditingThresholds, setIsEditingThresholds] = useState(false);

  const [localVal, setLocalVal] = useState(metric.value.toString());
  const [localGood, setLocalGood] = useState(metric.good.toString());
  const [localExc, setLocalExc] = useState(metric.excellent.toString());

  useEffect(() => { setLocalVal(metric.value.toString()); }, [metric.value]);
  useEffect(() => { setLocalGood(metric.good.toString()); }, [metric.good]);
  useEffect(() => { setLocalExc(metric.excellent.toString()); }, [metric.excellent]);

  const valueColorClass = getMetricHealthColor(metric);

  const handleSaveValue = () => {
    setIsEditingValue(false);
    if (localVal !== metric.value.toString()) {
      onChange(moduleName, metricKey, 'value', localVal);
    }
  };

  const handleSaveThresholds = () => {
    setIsEditingThresholds(false);
    if (localGood !== metric.good.toString()) onChange(moduleName, metricKey, 'good', localGood);
    if (localExc !== metric.excellent.toString()) onChange(moduleName, metricKey, 'excellent', localExc);
  };

  return (
    <div className="flex flex-col p-3 rounded-xl border border-neutral-100 bg-neutral-50 hover:bg-neutral-50/80 transition-colors group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-neutral-700">{metric.label}</span>
          <div className="relative flex items-center justify-center">
            <Info className="w-4 h-4 text-neutral-400 peer hover:text-indigo-500 transition-colors cursor-help" />
            <div className="invisible peer-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-xl z-20 font-medium leading-relaxed">
              {metric.desc}
              <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsEditingThresholds(!isEditingThresholds)}
          className="p-1 rounded-md text-neutral-400 hover:text-indigo-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          title="Editar Limiares"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {isEditingValue ? (
            <div className="flex items-center gap-1">
              <input
                autoFocus
                type="number"
                step="0.1"
                className="w-16 text-xl font-bold bg-white border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 px-1"
                value={localVal}
                onChange={e => setLocalVal(e.target.value)}
                onBlur={handleSaveValue}
                onKeyDown={e => e.key === 'Enter' && handleSaveValue()}
              />
              <span className="text-neutral-500 font-medium">{metric.unit}</span>
            </div>
          ) : (
            <div
              className={`text-2xl font-black cursor-pointer hover:opacity-80 transition-opacity ${valueColorClass}`}
              onClick={() => setIsEditingValue(true)}
              title="Clique para editar"
            >
              {metric.value}{metric.unit}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 relative z-10">
          {isEditingThresholds ? (
            <div className="flex gap-2">
              <div className="flex flex-col text-[10px] items-end">
                <span className="font-semibold text-emerald-600 uppercase">Exc</span>
                <input type="number" step="0.1" className="w-10 p-0.5 text-center bg-white border border-neutral-300 rounded font-bold" value={localExc} onChange={e => setLocalExc(e.target.value)} onBlur={handleSaveThresholds} onKeyDown={e => e.key === 'Enter' && handleSaveThresholds()} />
              </div>
              <div className="flex flex-col text-[10px] items-end">
                <span className="font-semibold text-amber-500 uppercase">Bom</span>
                <input type="number" step="0.1" className="w-10 p-0.5 text-center bg-white border border-neutral-300 rounded font-bold" value={localGood} onChange={e => setLocalGood(e.target.value)} onBlur={handleSaveThresholds} onKeyDown={e => e.key === 'Enter' && handleSaveThresholds()} />
              </div>
            </div>
          ) : (
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex flex-col items-end text-neutral-400">
                <span className="text-emerald-500">Exc</span>
                {metric.inverse ? '>' : '<'} {metric.excellent}{metric.unit}
              </div>
              <div className="flex flex-col items-end text-neutral-400">
                <span className="text-amber-500">Bom</span>
                {metric.inverse ? '>' : '<'} {metric.good}{metric.unit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// MetricCard
export function MetricCard({
  title,
  value,
  currentAmount,
  previousAmount,
  isCurrency = false,
  icon,
  inverseChange = false,
  subtitle,
}: {
  title: string;
  value: string;
  currentAmount: number;
  previousAmount: number;
  isCurrency?: boolean;
  icon: React.ReactNode;
  inverseChange?: boolean;
  subtitle?: React.ReactNode;
}) {
  let percentChange = 0;
  if (previousAmount > 0) {
    percentChange = ((currentAmount - previousAmount) / previousAmount) * 100;
  } else if (currentAmount > 0) {
    percentChange = 100;
  }

  const isPositive = percentChange >= 0;
  const isGood = inverseChange ? !isPositive : isPositive;
  const formattedPercent = Math.abs(percentChange).toFixed(1) + "%";

  const formatAmount = (amt: number) => {
    if (isCurrency) return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amt);
    return amt % 1 !== 0 ? amt.toFixed(2) : amt.toString();
  };

  const tooltipText = `Anterior: ${formatAmount(previousAmount)} | Atual: ${formatAmount(currentAmount)}`;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <div className="p-2 bg-neutral-50 rounded-lg">{icon}</div>
      </div>
      <div className="mt-auto">
        <div className="text-2xl font-semibold text-neutral-900 mb-1">
          {value}
        </div>
        <div
          title={tooltipText}
          className={`text-sm font-medium flex items-center gap-1 w-max cursor-help border-b border-transparent hover:border-current transition-colors ${isGood ? "text-emerald-600" : "text-red-600"}`}
        >
          {isPositive ? "↑" : "↓"} {formattedPercent}
          <span className="text-neutral-400 font-normal ml-1">
            vs período anterior
          </span>
        </div>
        {subtitle && <div className="mt-3">{subtitle}</div>}
      </div>
    </div>
  );
}

// StrategyCard
export function StrategyCard({
  title,
  icon,
  items,
  isEditing,
  onChange,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  isEditing?: boolean;
  onChange?: (items: string[]) => void;
}) {
  const handleItemChange = (index: number, value: string) => {
    if (!onChange) return;
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddItem = () => {
    if (!onChange) return;
    onChange([...items, ""]);
  };

  const handleRemoveItem = (index: number) => {
    if (!onChange) return;
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h3 className="font-semibold text-neutral-800">{title}</h3>
      </div>
      <ul className="space-y-3 flex-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 text-xs font-medium text-neutral-500 mt-0.5">
              {index + 1}
            </div>
            {isEditing ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="flex-1 text-sm text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-neutral-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="text-neutral-600 pt-0.5 text-sm">{item}</span>
            )}
          </li>
        ))}
      </ul>
      {isEditing && (
        <button
          onClick={handleAddItem}
          className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <Plus className="w-4 h-4" /> Adicionar item
        </button>
      )}
    </div>
  );
}

// FunnelStage
export function FunnelStage({
  label,
  color,
  content,
  isEditing,
  onChange,
}: {
  label: string;
  color: string;
  content: string;
  isEditing?: boolean;
  onChange?: (val: string) => void;
}) {
  return (
    <div
      className={`p-4 rounded-xl border ${color} relative transition-all ${isEditing ? "ring-2 ring-offset-2 ring-transparent" : ""}`}
    >
      <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-80">
        {label}
      </div>
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full min-h-[80px] text-sm font-medium bg-white/50 border border-black/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-current resize-y"
          placeholder={`Descreva a estratégia para ${label.toLowerCase()}...`}
        />
      ) : (
        <div className="text-sm font-medium whitespace-pre-line">{content}</div>
      )}
    </div>
  );
}
