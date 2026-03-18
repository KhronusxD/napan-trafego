import React from "react";
import {
  RefreshCw,
  Calendar,
  ChevronDown,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Users,
  CheckCircle2,
  Activity,
  Filter,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  PieChart,
  Pie,
} from "recharts";
import { MetricCard } from "../shared";

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

interface FunnelDataSources {
  meta: Record<string, number>;
  google: Record<string, number>;
  all: Record<string, number>;
}

interface OverviewTabProps {
  isFetchingSheet: boolean;
  isFetchingTraffic: boolean;
  isFetchingGoogleAds: boolean;
  dateRange: string;
  customStartDate: string;
  customEndDate: string;
  chartSource: "all" | "meta" | "google";
  chartType: "bar" | "line";
  computedMetrics: ComputedMetrics;
  computedTrafficMetrics: ComputedTrafficMetrics;
  funnelDataSources: FunnelDataSources;
  dailyChartData: any[];
  formattedRevenue: string;
  calculatedRoi: string;
  currentCalculatedRoiNum: number;
  prevCalculatedRoiNum: number;
  metaRoi: string;
  googleRoi: string;
  isWhatsapp: boolean;
  isItvManaus: boolean;
  totalLeads: number;
  prevTotalLeads: number;
  currentCac: number;
  prevCac: number;
  currentCpl: number;
  prevCpl: number;
  mockMetrics: any;
  setDateRange: (val: string) => void;
  setCustomStartDate: (val: string) => void;
  setCustomEndDate: (val: string) => void;
  setChartSource: (val: "all" | "meta" | "google") => void;
  setChartType: (val: "bar" | "line") => void;
  handleRefresh: () => void;
}

export function OverviewTab({
  isFetchingSheet,
  isFetchingTraffic,
  isFetchingGoogleAds,
  dateRange,
  customStartDate,
  customEndDate,
  chartSource,
  chartType,
  computedMetrics,
  computedTrafficMetrics,
  funnelDataSources,
  dailyChartData,
  formattedRevenue,
  calculatedRoi,
  currentCalculatedRoiNum,
  prevCalculatedRoiNum,
  metaRoi,
  googleRoi,
  isWhatsapp,
  isItvManaus,
  totalLeads,
  prevTotalLeads,
  currentCac,
  prevCac,
  currentCpl,
  prevCpl,
  mockMetrics,
  setDateRange,
  setCustomStartDate,
  setCustomEndDate,
  setChartSource,
  setChartType,
  handleRefresh,
}: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Header with Date Picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-800">
          Resumo de Performance
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-600 transition-colors"
            title="Atualizar dados base"
          >
            <RefreshCw className={`w-4 h-4 ${isFetchingSheet || isFetchingTraffic || isFetchingGoogleAds ? 'animate-spin' : ''}`} />
          </button>
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

      {/* Metric Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isWhatsapp || isItvManaus ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-4`}>
        {isItvManaus ? (
          <>
            <MetricCard
              title="Total de Entrada"
              value={computedMetrics.totalEntrada.toString()}
              currentAmount={computedMetrics.totalEntrada}
              previousAmount={computedMetrics.prevTotalEntrada}
              isCurrency={false}
              icon={<Users className="w-5 h-5 text-blue-600" />}
            />
            <MetricCard
              title="Serviço Aprovado"
              value={computedMetrics.servicoAprovado.toString()}
              currentAmount={computedMetrics.servicoAprovado}
              previousAmount={computedMetrics.prevServicoAprovado}
              isCurrency={false}
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            />
            <MetricCard
              title="Total de Saídas"
              value={computedMetrics.totalSaidas.toString()}
              currentAmount={computedMetrics.totalSaidas}
              previousAmount={computedMetrics.prevTotalSaidas}
              isCurrency={false}
              icon={<ShoppingCart className="w-5 h-5 text-orange-600" />}
            />
            <MetricCard
              title="Investimento Total"
              value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoTotal)}
              currentAmount={computedTrafficMetrics.investimentoTotal}
              previousAmount={computedTrafficMetrics.prevInvestimentoTotal}
              isCurrency={true}
              icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
              inverseChange
              subtitle={
                <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      Meta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoMeta)} ({computedTrafficMetrics.investimentoTotal > 0 ? ((computedTrafficMetrics.investimentoMeta / computedTrafficMetrics.investimentoTotal) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Google: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoGoogle)} ({computedTrafficMetrics.investimentoTotal > 0 ? ((computedTrafficMetrics.investimentoGoogle / computedTrafficMetrics.investimentoTotal) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              }
            />
            <MetricCard
              title="Leads Totais"
              value={totalLeads.toString()}
              currentAmount={totalLeads}
              previousAmount={prevTotalLeads}
              isCurrency={false}
              icon={<Users className="w-5 h-5 text-purple-600" />}
              subtitle={
                <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      Meta: {funnelDataSources.meta['Adições no Carrinho']} ({totalLeads > 0 ? ((funnelDataSources.meta['Adições no Carrinho'] / totalLeads) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Google: {funnelDataSources.google['Compras Meta']} ({totalLeads > 0 ? ((funnelDataSources.google['Compras Meta'] / totalLeads) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              }
            />
            <MetricCard
              title="Faturamento"
              value={formattedRevenue}
              currentAmount={computedMetrics.revenue}
              previousAmount={computedMetrics.prevRevenue}
              isCurrency={true}
              icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
              subtitle={
                <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      Meta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.faturamentoMeta)} ({computedMetrics.revenue > 0 ? ((computedTrafficMetrics.faturamentoMeta / computedMetrics.revenue) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Google: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.faturamentoGoogle)} ({computedMetrics.revenue > 0 ? ((computedTrafficMetrics.faturamentoGoogle / computedMetrics.revenue) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <>
            <MetricCard
              title="Faturamento"
              value={formattedRevenue}
              currentAmount={computedMetrics.revenue}
              previousAmount={computedMetrics.prevRevenue}
              isCurrency={true}
              icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
              subtitle={
                <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      Meta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.faturamentoMeta)} ({computedMetrics.revenue > 0 ? ((computedTrafficMetrics.faturamentoMeta / computedMetrics.revenue) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Google: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.faturamentoGoogle)} ({computedMetrics.revenue > 0 ? ((computedTrafficMetrics.faturamentoGoogle / computedMetrics.revenue) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              }
            />
            <MetricCard
              title="Investimento"
              value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoTotal)}
              currentAmount={computedTrafficMetrics.investimentoTotal}
              previousAmount={computedTrafficMetrics.prevInvestimentoTotal}
              isCurrency={true}
              icon={<TrendingUp className="w-5 h-5 text-indigo-600" />}
              inverseChange
              subtitle={
                <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      Meta: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoMeta)} ({computedTrafficMetrics.investimentoTotal > 0 ? ((computedTrafficMetrics.investimentoMeta / computedTrafficMetrics.investimentoTotal) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                      Google: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(computedTrafficMetrics.investimentoGoogle)} ({computedTrafficMetrics.investimentoTotal > 0 ? ((computedTrafficMetrics.investimentoGoogle / computedTrafficMetrics.investimentoTotal) * 100).toFixed(1) : 0}%)
                    </span>
                  </div>
                </div>
              }
            />
            <MetricCard
              title={isWhatsapp ? "Leads Totais" : "Compras"}
              value={isWhatsapp ? totalLeads.toString() : computedMetrics.purchases.toString()}
              currentAmount={isWhatsapp ? totalLeads : computedMetrics.purchases}
              previousAmount={isWhatsapp ? prevTotalLeads : computedMetrics.prevPurchases}
              isCurrency={false}
              icon={isWhatsapp ? <Users className="w-5 h-5 text-blue-600" /> : <ShoppingCart className="w-5 h-5 text-blue-600" />}
              subtitle={
                !isWhatsapp ? (
                  <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        Meta: {computedTrafficMetrics.metaPurchases.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({computedMetrics.purchases > 0 ? ((computedTrafficMetrics.metaPurchases / computedMetrics.purchases) * 100).toFixed(1) : 0}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Google: {computedTrafficMetrics.googlePurchases.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ({computedMetrics.purchases > 0 ? ((computedTrafficMetrics.googlePurchases / computedMetrics.purchases) * 100).toFixed(1) : 0}%)
                      </span>
                    </div>
                  </div>
                ) : undefined
              }
            />
            {isWhatsapp ? (
              <MetricCard
                title="Fechamentos"
                value={computedMetrics.purchases.toString()}
                currentAmount={computedMetrics.purchases}
                previousAmount={computedMetrics.prevPurchases}
                isCurrency={false}
                icon={<CheckCircle2 className="w-5 h-5 text-purple-600" />}
              />
            ) : (
              <MetricCard
                title="ROI"
                value={calculatedRoi}
                currentAmount={currentCalculatedRoiNum}
                previousAmount={prevCalculatedRoiNum}
                isCurrency={false}
                icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
                subtitle={
                  <div className="flex flex-col gap-1 mt-1 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                        Meta: {metaRoi}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        Google: {googleRoi}
                      </span>
                    </div>
                  </div>
                }
              />
            )}
            {isWhatsapp ? (
              <MetricCard
                title="CAC"
                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentCac)}
                currentAmount={currentCac}
                previousAmount={prevCac}
                isCurrency={true}
                icon={<Activity className="w-5 h-5 text-orange-600" />}
                inverseChange
              />
            ) : null}
            {isWhatsapp && (
              <MetricCard
                title="CPL"
                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentCpl)}
                currentAmount={currentCpl}
                previousAmount={prevCpl}
                isCurrency={true}
                icon={<Filter className="w-5 h-5 text-teal-600" />}
                inverseChange
              />
            )}
          </>
        )}
      </div>

      {/* Daily Profitability Chart */}
      {dailyChartData.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">Faturamento Diário</h3>
              <p className="text-sm text-neutral-500">Acompanhe as receitas e investimentos diários detalhados</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Chart Source Toggle */}
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button
                  onClick={() => setChartSource('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartSource === 'all' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  Juntos
                </button>
                <button
                  onClick={() => setChartSource('meta')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartSource === 'meta' ? 'bg-white text-blue-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  Meta Ads
                </button>
                <button
                  onClick={() => setChartSource('google')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartSource === 'google' ? 'bg-white text-emerald-600 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  Google Ads
                </button>
              </div>

              {/* Chart Type Toggle */}
              <div className="flex bg-neutral-100 p-1 rounded-lg">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartType === 'bar' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  Barras
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${chartType === 'line' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
                    }`}
                >
                  Linhas
                </button>
              </div>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart
                  data={dailyChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="dateStr"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                    dx={-10}
                  />
                  <RechartsTooltip
                    cursor={{ fill: '#F3F4F6' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                    labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <ReferenceLine y={0} stroke="#9CA3AF" />

                  <Bar dataKey="totalRevenue" name="Receita Total" fill="#34D399" radius={[4, 4, 0, 0]} maxBarSize={40} />

                  {chartSource === 'meta' && (
                    <>
                      <Bar dataKey="metaRevenue" name="Receita Meta" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="metaCost" name="Custo Meta" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </>
                  )}

                  {chartSource === 'google' && (
                    <>
                      <Bar dataKey="googleRevenue" name="Receita Google" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="googleCost" name="Custo Google" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </>
                  )}

                  {chartSource === 'all' && (
                    <>
                      <Bar dataKey="totalCost" name="Custo Total" fill="#F87171" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Bar dataKey="profit" name="Lucro" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                    </>
                  )}

                </BarChart>
              ) : (
                <RechartsLineChart
                  data={dailyChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis
                    dataKey="dateStr"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                    dx={-10}
                  />
                  <RechartsTooltip
                    cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                    labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <ReferenceLine y={0} stroke="#9CA3AF" />

                  <Line type="monotone" dataKey="totalRevenue" name="Receita Total" stroke="#34D399" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />

                  {chartSource === 'meta' && (
                    <>
                      <Line type="monotone" dataKey="metaRevenue" name="Receita Meta" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="metaCost" name="Custo Meta" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </>
                  )}

                  {chartSource === 'google' && (
                    <>
                      <Line type="monotone" dataKey="googleRevenue" name="Receita Google" stroke="#10B981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="googleCost" name="Custo Google" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </>
                  )}

                  {chartSource === 'all' && (
                    <>
                      <Line type="monotone" dataKey="totalCost" name="Custo Total" stroke="#F87171" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="profit" name="Lucro" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </>
                  )}

                </RechartsLineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Main Charts Row */}
      {isWhatsapp && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Origins Pie Chart */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">
                Origem dos Leads
              </h3>
              <p className="text-sm text-neutral-500">Distribuição entre Meta, Google e outras fontes</p>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              {(() => {
                const metaOrigin = computedTrafficMetrics.metaPurchases;
                const googleOrigin = computedTrafficMetrics.googlePurchases;
                const totalOrigin = totalLeads;
                const otherOrigin = Math.max(0, totalOrigin - (metaOrigin + googleOrigin));

                const pieData = [
                  { name: 'Meta Ads', value: metaOrigin, fill: '#3B82F6' },
                  { name: 'Google Ads', value: googleOrigin, fill: '#10B981' },
                  { name: 'Orgânico/Outros', value: otherOrigin, fill: '#9CA3AF' },
                ].filter(item => item.value > 0);

                if (pieData.length === 0) {
                  return <div className="text-neutral-400">Sem dados suficientes</div>;
                }

                return (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      />
                      <RechartsTooltip
                        cursor={{ fill: '#F3F4F6' }}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => value}
                        labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                      />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                );
              })()}
            </div>
          </div>

          {/* Additional Placeholder for CPL / CPA over time*/}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-800">
                Custo por Lead Diário
              </h3>
              <p className="text-sm text-neutral-500">Evolução do custo de aquisição</p>
            </div>

            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={dailyChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis
                    dataKey="dateStr"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickFormatter={(value) => `R$ ${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                    dx={-10}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <RechartsTooltip
                    cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '3 3' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
                    labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  <Line type="monotone" dataKey="totalCost" name="Custo Total" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-neutral-800">
              Insights Gerados por IA
            </h2>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 rounded-md">
            Em construção
          </span>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            {mockMetrics.insights.map((insight: string, index: number) => (
              <li
                key={index}
                className="flex items-start gap-3 text-neutral-600"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <p className="leading-relaxed">{insight}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
