import React from "react";
import {
  RefreshCw,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Calendar,
  ChevronDown,
  Activity,
  Search,
} from "lucide-react";
import { VariationBadge } from "../../Dashboard";

interface MonthlyTabProps {
  isFetchingSheet: boolean;
  isFetchingTraffic: boolean;
  isFetchingGoogleAds: boolean;
  monthlyTabMonth: string;
  monthlyMetrics: any;
  expandedWeekIds: string[];
  setMonthlyTabMonth: (val: string) => void;
  setExpandedWeekIds: (fn: (prev: string[]) => string[]) => void;
  handleRefresh: () => void;
}

export function MonthlyTab({
  isFetchingSheet,
  isFetchingTraffic,
  isFetchingGoogleAds,
  monthlyTabMonth,
  monthlyMetrics,
  expandedWeekIds,
  setMonthlyTabMonth,
  setExpandedWeekIds,
  handleRefresh,
}: MonthlyTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-800">
          Resumo Mensal
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={handleRefresh} className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-600 transition-colors">
            <RefreshCw className={`w-4 h-4 ${isFetchingSheet || isFetchingTraffic || isFetchingGoogleAds ? 'animate-spin' : ''}`} />
          </button>
          <input
            type="month"
            value={monthlyTabMonth}
            onChange={(e) => setMonthlyTabMonth(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 text-neutral-700 py-2 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {monthlyMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-500">Faturamento</h3>
              <div className="p-2 bg-neutral-50 rounded-lg"><DollarSign className="w-5 h-5 text-emerald-600" /></div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-semibold text-neutral-900 mb-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyMetrics.month.revenue)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-500">Investimento</h3>
              <div className="p-2 bg-neutral-50 rounded-lg"><TrendingUp className="w-5 h-5 text-indigo-600" /></div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-semibold text-neutral-900 mb-1">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyMetrics.month.totalInv)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-500">Compras</h3>
              <div className="p-2 bg-neutral-50 rounded-lg"><ShoppingCart className="w-5 h-5 text-blue-600" /></div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-semibold text-neutral-900 mb-1">
                {monthlyMetrics.month.purchases.toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-neutral-500">ROI</h3>
              <div className="p-2 bg-neutral-50 rounded-lg"><BarChart3 className="w-5 h-5 text-purple-600" /></div>
            </div>
            <div className="mt-auto">
              <div className="text-2xl font-semibold text-neutral-900 mb-1">
                {monthlyMetrics.month.roi.toFixed(2)}x
              </div>
            </div>
          </div>
        </div>
      )}

      {monthlyMetrics && monthlyMetrics.weeks.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 mt-8">
          <h3 className="font-semibold text-neutral-800 mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Comparativo Semanal
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {monthlyMetrics.weeks.map((week: any) => {
              const isExpanded = expandedWeekIds.includes(week.id);
              return (
                <div key={week.id} className={`border ${isExpanded ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50/50 block-expanded z-10 scale-[1.01]' : 'border-neutral-100 shadow-sm'} bg-white rounded-xl p-5 transition-all duration-300 relative`}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200/60 cursor-pointer group" onClick={() => {
                    setExpandedWeekIds((prev: string[]) =>
                      prev.includes(week.id)
                        ? prev.filter((id: string) => id !== week.id)
                        : [...prev, week.id]
                    );
                  }}>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors group-hover:text-indigo-600">
                        {week.label}
                        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-indigo-500' : ''}`} />
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded shadow-inner">
                      {week.dateLabel}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Faturamento</span>
                      <div className="flex items-center gap-2">
                        <VariationBadge current={week.metrics.revenue} previous={week.prevMetrics.revenue} />
                        <span className="font-semibold text-neutral-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.revenue)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Investimento</span>
                      <div className="flex items-center gap-2">
                        <VariationBadge current={week.metrics.totalInv} previous={week.prevMetrics.totalInv} neutral />
                        <span className="font-semibold text-indigo-700">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.totalInv)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-neutral-500">Compras</span>
                      <div className="flex items-center gap-2">
                        <VariationBadge current={week.metrics.purchases} previous={week.prevMetrics.purchases} />
                        <span className="font-semibold text-blue-700">{week.metrics.purchases}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-neutral-200/60">
                      <span className="font-medium text-neutral-600">ROI da Semana</span>
                      <div className="flex items-center gap-2">
                        <VariationBadge current={week.metrics.roi} previous={week.prevMetrics.roi} />
                        <span className={`font-bold ${week.metrics.roi >= 2 ? 'text-emerald-600' : week.metrics.roi >= 1 ? 'text-amber-600' : 'text-red-600'}`}>
                          {week.metrics.roi.toFixed(2)}x
                        </span>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-indigo-100 flex gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      {/* Meta Ads Column */}
                      <div className="flex-1 bg-blue-50/50 border border-blue-100/50 rounded-lg p-3">
                        <h5 className="text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Activity className="w-3 h-3" /> Meta Ads</h5>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-blue-600/70">Fat.</span>
                            <span className="font-semibold text-blue-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.metaRevenue)}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-blue-600/70">Inv.</span>
                            <span className="font-semibold text-blue-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.invMeta)}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-blue-600/70">Compras</span>
                            <span className="font-semibold text-blue-900 truncate max-w-[80px] text-right" title={String(week.metrics.metaPurchases)}>{Math.round(week.metrics.metaPurchases || 0)}</span>
                          </div>
                          <div className="flex justify-between text-[13px] pt-1 border-t border-blue-100">
                            <span className="font-medium text-blue-800">ROI</span>
                            <span className="font-bold text-blue-700">{week.metrics.metaRoi.toFixed(2)}x</span>
                          </div>
                        </div>
                      </div>

                      {/* Google Ads Column */}
                      <div className="flex-1 bg-rose-50/50 border border-rose-100/50 rounded-lg p-3">
                        <h5 className="text-[11px] font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Search className="w-3 h-3" /> Google Ads</h5>
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-rose-600/70">Fat.</span>
                            <span className="font-semibold text-rose-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.googleRevenue)}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-rose-600/70">Inv.</span>
                            <span className="font-semibold text-rose-900">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(week.metrics.invGoogle)}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-rose-600/70">Compras</span>
                            <span className="font-semibold text-rose-900 truncate max-w-[80px] text-right" title={String(week.metrics.googlePurchases)}>{Math.round(week.metrics.googlePurchases || 0)}</span>
                          </div>
                          <div className="flex justify-between text-[13px] pt-1 border-t border-rose-100">
                            <span className="font-medium text-rose-800">ROI</span>
                            <span className="font-bold text-rose-700">{week.metrics.googleRoi.toFixed(2)}x</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
