import React from "react";
import {
  Calendar,
  ChevronDown,
  X,
  MousePointerClick,
  Users,
  ShoppingCart,
  CheckCircle2,
  Target,
  CreditCard,
  ArrowRight,
} from "lucide-react";

interface FunnelDataSources {
  meta: Record<string, number>;
  google: Record<string, number>;
  all: Record<string, number>;
}

interface ComputedTrafficMetrics {
  investimentoMeta: number;
  investimentoGoogle: number;
  investimentoTotal: number;
  prevInvestimentoMeta: number;
  prevInvestimentoGoogle: number;
  prevInvestimentoTotal: number;
  metaPurchases: number;
  googlePurchases: number;
  prevMetaPurchases: number;
  prevGooglePurchases: number;
  faturamentoMeta: number;
  faturamentoGoogle: number;
  prevFaturamentoMeta: number;
  prevFaturamentoGoogle: number;
}

interface ComputedMetrics {
  revenue: number;
  purchases: number;
  prevRevenue: number;
  prevPurchases: number;
  totalEntrada: number;
  servicoAprovado: number;
  totalSaidas: number;
  prevTotalEntrada: number;
  prevServicoAprovado: number;
  prevTotalSaidas: number;
}

interface FunnelTabProps {
  isFetchingTraffic: boolean;
  isFetchingGoogleAds: boolean;
  trafficError: string | null;
  googleAdsError: string | null;
  dateRange: string;
  customStartDate: string;
  customEndDate: string;
  funnelSource: "all" | "meta" | "google";
  funnelDataSources: FunnelDataSources;
  computedTrafficMetrics: ComputedTrafficMetrics;
  computedMetrics: ComputedMetrics;
  isItvManaus: boolean;
  setDateRange: (val: string) => void;
  setCustomStartDate: (val: string) => void;
  setCustomEndDate: (val: string) => void;
  setFunnelSource: (val: "all" | "meta" | "google") => void;
}

export function FunnelTab({
  isFetchingTraffic,
  isFetchingGoogleAds,
  trafficError,
  googleAdsError,
  dateRange,
  customStartDate,
  customEndDate,
  funnelSource,
  funnelDataSources,
  computedTrafficMetrics,
  computedMetrics,
  isItvManaus,
  setDateRange,
  setCustomStartDate,
  setCustomEndDate,
  setFunnelSource,
}: FunnelTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-neutral-800">
            Funil de Vendas & Tráfego
          </h2>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Google Sheets
          </span>
        </div>
        <div className="flex items-center gap-2">
          {dateRange === "Personalizado" && (
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg p-1">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="bg-transparent text-sm text-neutral-700 px-2 py-1 focus:outline-none"
              />
              <span className="text-neutral-400 text-sm">até</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="bg-transparent text-sm text-neutral-700 px-2 py-1 focus:outline-none"
              />
            </div>
          )}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-700 py-2 pl-10 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
            >
              <option>Hoje</option>
              <option>Ontem</option>
              <option>Hoje e ontem</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 14 dias</option>
              <option>Últimos 28 dias</option>
              <option>Últimos 30 dias</option>
              <option>Esta semana</option>
              <option>Semana passada</option>
              <option>Este mês</option>
              <option>Mês passado</option>
              <option>Máximo</option>
              <option>Personalizado</option>
            </select>
            <Calendar className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:justify-start">
        <div className="flex bg-neutral-100 p-1 rounded-lg">
          {(['all', 'meta', 'google'] as const).map(source => (
            <button
              key={source}
              onClick={() => setFunnelSource(source)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${funnelSource === source
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
                }`}
            >
              {source === 'all' ? 'Visão Geral (Todos)' : source === 'meta' ? 'Meta Ads' : 'Google Ads'}
            </button>
          ))}
        </div>
      </div>

      {isFetchingTraffic || isFetchingGoogleAds ? (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-16 flex flex-col items-center justify-center text-neutral-500">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p>Calculando métricas do funil...</p>
        </div>
      ) : trafficError || googleAdsError ? (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Erro ao carregar dados de tráfego</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-2">{trafficError}</p>
          <p className="text-neutral-500 max-w-md mx-auto mb-6">{googleAdsError}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual Funnel */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
            <h3 className="font-semibold text-neutral-800 mb-6">Jornada do Cliente</h3>

            <div className="space-y-4">
              {(isItvManaus ? [
                {
                  id: 'cliques',
                  label: 'Cliques no Link',
                  desc: 'Topo de Funil',
                  icon: <MousePointerClick className="w-5 h-5" />,
                  color: 'blue',
                  key: 'Cliques no Link'
                },
                {
                  id: 'views',
                  label: 'Visualizações de Página',
                  desc: 'Topo de Funil',
                  icon: <Users className="w-5 h-5" />,
                  color: 'indigo',
                  key: 'Visualizações de Página'
                },
                {
                  id: 'total_entrada',
                  label: 'Total de Entrada',
                  desc: 'Meio de Funil',
                  icon: <ShoppingCart className="w-5 h-5" />,
                  color: 'amber',
                  key: 'Total de Entrada',
                  valueOverwrite: computedMetrics.totalEntrada
                },
                {
                  id: 'servico_aprovado',
                  label: 'Serviço Aprovado',
                  desc: 'Fundo de Funil',
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  color: 'emerald',
                  key: 'Serviço Aprovado',
                  valueOverwrite: computedMetrics.servicoAprovado
                },
                {
                  id: 'total_consertos',
                  label: 'Total de Consertos',
                  desc: 'Fundo de Funil',
                  icon: <Target className="w-5 h-5" />,
                  color: 'orange',
                  key: 'Total de Consertos',
                  valueOverwrite: computedMetrics.totalSaidas
                }
              ] : [
                {
                  id: 'cliques',
                  label: 'Cliques no Link',
                  desc: 'Topo de Funil',
                  icon: <MousePointerClick className="w-5 h-5" />,
                  color: 'blue',
                  key: 'Cliques no Link'
                },
                {
                  id: 'views',
                  label: 'Visualizações de Página',
                  desc: 'Topo de Funil',
                  icon: <Users className="w-5 h-5" />,
                  color: 'indigo',
                  key: 'Visualizações de Página'
                },
                {
                  id: 'atc',
                  label: 'Adições ao Carrinho',
                  desc: 'Meio de Funil',
                  icon: <ShoppingCart className="w-5 h-5" />,
                  color: 'amber',
                  key: 'Adições no Carrinho'
                },
                {
                  id: 'checkout',
                  label: 'Checkout',
                  desc: 'Fundo de Funil',
                  icon: <CreditCard className="w-5 h-5" />,
                  color: 'orange',
                  key: 'Checkout'
                },
                {
                  id: 'purchases',
                  label: 'Compras Realizadas',
                  desc: 'Fundo de Funil',
                  icon: <Target className="w-5 h-5" />,
                  color: 'emerald',
                  key: 'Compras Meta'
                }
              ]).map((stage: any, index, array) => {
                const currentFunnelData = funnelDataSources[funnelSource];
                const value = stage.valueOverwrite !== undefined ? stage.valueOverwrite : (currentFunnelData[stage.key] || 0);
                const nextStage = array[index + 1];
                const nextValue = nextStage ? (nextStage.valueOverwrite !== undefined ? nextStage.valueOverwrite : (currentFunnelData[nextStage.key] || 0)) : null;
                const conversionRate = nextValue !== null && value > 0 ? ((nextValue / value) * 100).toFixed(1) : "0.0";

                const colorMap: Record<string, any> = {
                  blue: { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100', text: 'text-blue-600', title: 'text-blue-900', val: 'text-blue-700' },
                  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', iconBg: 'bg-indigo-100', text: 'text-indigo-600', title: 'text-indigo-900', val: 'text-indigo-700' },
                  amber: { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', text: 'text-amber-600', title: 'text-amber-900', val: 'text-amber-700' },
                  orange: { bg: 'bg-orange-50', border: 'border-orange-100', iconBg: 'bg-orange-100', text: 'text-orange-600', title: 'text-orange-900', val: 'text-orange-700' },
                  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', text: 'text-emerald-600', title: 'text-emerald-900', val: 'text-emerald-700' },
                };

                const colors = colorMap[stage.color];
                const widthClass = index === 0 ? 'w-full' : index === 1 ? 'w-[95%]' : index === 2 ? 'w-[90%]' : index === 3 ? 'w-[85%]' : 'w-[80%]';

                const getInvestmentForSource = () => {
                  if (funnelSource === 'meta') return computedTrafficMetrics.investimentoMeta;
                  if (funnelSource === 'google') return computedTrafficMetrics.investimentoGoogle;
                  return computedTrafficMetrics.investimentoTotal;
                };

                const costPerConversion = value > 0 ? getInvestmentForSource() / value : 0;

                return (
                  <div key={stage.id} className="relative">
                    <div className={`${colors.bg} border ${colors.border} rounded-xl p-4 flex items-center justify-between z-10 relative ${widthClass} mx-auto`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center ${colors.text}`}>
                          {stage.icon}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${colors.title}`}>{stage.label}</div>
                          <div className={`text-xs ${colors.text}/80`}>{stage.desc}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${colors.val}`}>
                          {value.toLocaleString('pt-BR')}
                        </div>
                        <div className={`text-xs font-medium ${colors.text}/70 mt-0.5`}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(costPerConversion)} / conv.
                        </div>
                      </div>
                    </div>

                    {nextStage && (
                      <div className="flex justify-center -my-2 relative z-0">
                        <div className="bg-white border border-neutral-200 rounded-full px-3 py-1 text-xs font-medium text-neutral-500 flex items-center gap-1 shadow-sm">
                          <ArrowRight className="w-3 h-3 rotate-90" />
                          {conversionRate}% conversão
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meta vs Total Comparison */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex flex-col">
            <h3 className="font-semibold text-neutral-800 mb-6">Origem das Compras</h3>

            <div className="flex-1 flex flex-col justify-center gap-8">
              {(() => {
                const metaPurchases = computedTrafficMetrics.metaPurchases;
                const googlePurchases = computedTrafficMetrics.googlePurchases;
                const trackedPurchases = metaPurchases + googlePurchases;
                const totalPurchases = computedMetrics.purchases;

                const metaPercentage = totalPurchases > 0 ? ((metaPurchases / totalPurchases) * 100).toFixed(1) : "0.0";
                const googlePercentage = totalPurchases > 0 ? ((googlePurchases / totalPurchases) * 100).toFixed(1) : "0.0";
                const otherPurchases = Math.max(0, totalPurchases - trackedPurchases);
                const otherPercentage = totalPurchases > 0 ? ((otherPurchases / totalPurchases) * 100).toFixed(1) : "0.0";

                return (
                  <>
                    <div className="text-center">
                      <div className="text-sm font-medium text-neutral-500 mb-1">Total de Compras (Geral)</div>
                      <div className="text-4xl font-bold text-neutral-900">{totalPurchases.toLocaleString('pt-BR')}</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-indigo-700 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            Meta Ads
                          </span>
                          <span className="font-bold text-indigo-700">{metaPurchases.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({metaPercentage}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${metaPercentage}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-emerald-700 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Google Ads
                          </span>
                          <span className="font-bold text-emerald-700">{googlePurchases.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({googlePercentage}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${googlePercentage}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-neutral-600 flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-neutral-300"></div>
                            Outras Fontes (Orgânico, etc)
                          </span>
                          <span className="font-bold text-neutral-700">{otherPurchases.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({otherPercentage}%)</span>
                        </div>
                        <div className="w-full bg-neutral-100 rounded-full h-2.5">
                          <div className="bg-neutral-300 h-2.5 rounded-full" style={{ width: `${otherPercentage}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-neutral-100">
                      <p className="text-xs text-neutral-500 text-center">
                        Os dados do Meta e Google vêm da planilha de tráfego, enquanto o total vem da planilha de faturamento real.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
