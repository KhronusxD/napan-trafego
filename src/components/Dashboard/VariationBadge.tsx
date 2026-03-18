import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface VariationBadgeProps {
  current: number;
  previous: number;
  inverse?: boolean;
  neutral?: boolean;
}

export const VariationBadge: React.FC<VariationBadgeProps> = ({
  current,
  previous,
  inverse = false,
  neutral = false
}) => {
  if (!previous || previous === 0) return null;

  const rawVariation = ((current - previous) / previous) * 100;
  const variation = isNaN(rawVariation) ? 0 : rawVariation;
  const isPositive = variation > 0;
  const isNeutral = variation === 0;

  // Decide colors
  let colorClass = "text-neutral-500 bg-neutral-100";
  let Icon = Minus;

  if (!isNeutral) {
    if (neutral) {
      colorClass = "text-neutral-600 bg-neutral-100";
      Icon = isPositive ? ArrowUpRight : ArrowDownRight;
    } else {
      const isGood = inverse ? !isPositive : isPositive;
      colorClass = isGood ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50";
      Icon = isPositive ? ArrowUpRight : ArrowDownRight;
    }
  }

  return (
    <div
      className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium ${colorClass}`}
      title={`Anterior: ${previous}`}
    >
      {!isNeutral && <Icon className="w-3 h-3" />}
      <span>{Math.abs(variation).toFixed(1)}%</span>
    </div>
  );
};
