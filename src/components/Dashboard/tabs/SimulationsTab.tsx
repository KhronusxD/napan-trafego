import React from "react";
import { Lightbulb, Settings, Download } from "lucide-react";

interface SimulationsTabProps {
  simulationTabMonth: string;
  simInvestment: number;
  simCpc: number;
  simViewRate: number;
  simCartRate: number;
  simCheckoutRate: number;
  simPurcRate: number;
  simTicket: number;
  simBaseMetrics: any;
  simulatedClicks: number;
  simulatedViews: number;
  simulatedCarts: number;
  simulatedCheckouts: number;
  simulatedPurchases: number;
  simulatedCpa: number;
  simulatedRevenue: number;
  simulatedRoi: number;
  simulatedGlobalRevenue: number;
  setSimulationTabMonth: (val: string) => void;
  setSimInvestment: (val: number) => void;
  setSimCpc: (val: number) => void;
  setSimViewRate: (val: number) => void;
  setSimCartRate: (val: number) => void;
  setSimCheckoutRate: (val: number) => void;
  setSimPurcRate: (val: number) => void;
  setSimTicket: (val: number) => void;
}

export function SimulationsTab({
  simulationTabMonth,
  simInvestment,
  simCpc,
  simViewRate,
  simCartRate,
  simCheckoutRate,
  simPurcRate,
  simTicket,
  simBaseMetrics,
  simulatedClicks,
  simulatedViews,
  simulatedCarts,
  simulatedCheckouts,
  simulatedPurchases,
  simulatedCpa,
  simulatedRevenue,
  simulatedRoi,
  simulatedGlobalRevenue,
  setSimulationTabMonth,
  setSimInvestment,
  setSimCpc,
  setSimViewRate,
  setSimCartRate,
  setSimCheckoutRate,
  setSimPurcRate,
  setSimTicket,
}: SimulationsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-1 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Laboratório de Metas 🚀
          </h2>
          <p className="text-sm text-neutral-500">
            Ajuste os controles abaixo para projetar cenários dinamicamente.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
          <span className="text-sm font-medium text-neutral-500 pl-2">Mês Base:</span>
          <input
            type="month"
            value={simulationTabMonth}
            onChange={(e) => setSimulationTabMonth(e.target.value)}
            className="bg-white border border-neutral-200 text-neutral-700 py-1.5 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button
            onClick={() => {
              if (simBaseMetrics) {
                setSimInvestment(simBaseMetrics.metaInv || 0);
                setSimTicket(simBaseMetrics.baseMetaTicket || 0);
                setSimCpc(simBaseMetrics.baseMetaCpc || 0);
                setSimViewRate(simBaseMetrics.baseMetaViewRate || 0);
                setSimCartRate(simBaseMetrics.baseMetaCartRate || 0);
                setSimCheckoutRate(simBaseMetrics.baseMetaCheckoutRate || 0);
                setSimPurcRate(simBaseMetrics.baseMetaPurcRate || 0);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors border border-indigo-200"
            title="Puxar dados do mês base (Apenas Meta Ads)"
          >
            <Download className="w-4 h-4" />
            Puxar Base
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Controles Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
              <Settings className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-neutral-800">Mesa de Controle</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Orçamento (Investimento)</label>
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simInvestment)}</span>
                </div>
                <input type="range" min="100" max="50000" step="100" value={simInvestment} onChange={(e) => setSimInvestment(Number(e.target.value))} className="w-full transition-all accent-indigo-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Custo por Visita (CPC)</label>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simCpc)}</span>
                </div>
                <input type="range" min="0.05" max="10" step="0.05" value={simCpc} onChange={(e) => setSimCpc(Number(e.target.value))} className="w-full transition-all accent-blue-600" />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Taxa de Carregamento (Link {'>'} Site)</label>
                  <span className="text-sm font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">{simViewRate.toFixed(1)}%</span>
                </div>
                <input type="range" min="10" max="100" step="1" value={simViewRate} onChange={(e) => setSimViewRate(Number(e.target.value))} className="w-full transition-all accent-neutral-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Taxa de Adição ao Carrinho</label>
                  <span className="text-sm font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">{simCartRate.toFixed(1)}%</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={simCartRate} onChange={(e) => setSimCartRate(Number(e.target.value))} className="w-full transition-all accent-neutral-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Taxa de Início de Checkout</label>
                  <span className="text-sm font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md">{simCheckoutRate.toFixed(1)}%</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={simCheckoutRate} onChange={(e) => setSimCheckoutRate(Number(e.target.value))} className="w-full transition-all accent-neutral-600" />
              </div>

              <div className="space-y-3 border-b border-neutral-100 pb-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Taxa de Conversão Final (Compra)</label>
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">{simPurcRate.toFixed(1)}%</span>
                </div>
                <input type="range" min="1" max="100" step="1" value={simPurcRate} onChange={(e) => setSimPurcRate(Number(e.target.value))} className="w-full transition-all accent-emerald-600" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-700">Ticket Médio (Preço Médio)</label>
                  <span className="text-sm font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simTicket)}</span>
                </div>
                <input type="range" min="10" max="5000" step="10" value={simTicket} onChange={(e) => setSimTicket(Number(e.target.value))} className="w-full transition-all accent-purple-600" />
              </div>
            </div>

            <div className="mt-2 bg-neutral-800 text-white shadow-inner rounded-xl p-5 border border-neutral-700 flex flex-col gap-3">
              <h4 className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">Volumes Esperados na Cascata</h4>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">Cliques no Link:</span>
                <span className="font-semibold text-white">{Math.round(simulatedClicks).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">Views de Página:</span>
                <span className="font-semibold text-white">{Math.round(simulatedViews).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">Carrinhos (AddToCart):</span>
                <span className="font-semibold text-white">{Math.round(simulatedCarts).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">Checkouts Iniciados:</span>
                <span className="font-semibold text-white">{Math.round(simulatedCheckouts).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-neutral-600">
                <span className="text-neutral-300">Compras Fechadas:</span>
                <span className="font-bold text-emerald-400">{Math.round(simulatedPurchases).toLocaleString('pt-BR')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-neutral-300">CPA (Custo por Compra):</span>
                <span className="font-bold text-emerald-400">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simulatedCpa)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Futuro Visual Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl shadow-md text-white flex flex-col min-w-0">
              <span className="text-indigo-100 text-sm font-medium mb-1 truncate" title="Faturamento Presumido">Faturamento Presumido</span>
              <span className="text-2xl 2xl:text-3xl font-black tracking-tight truncate block w-full" title={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simulatedRevenue)}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simulatedRevenue)}
              </span>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-md text-white flex flex-col">
              <span className="text-emerald-100 text-sm font-medium mb-1">Vendas Concluídas</span>
              <span className="text-3xl font-black tracking-tight">{Math.round(simulatedPurchases).toLocaleString('pt-BR')}</span>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-6 rounded-2xl shadow-md text-white flex flex-col">
              <span className="text-orange-100 text-sm font-medium mb-1">ROI Garantido</span>
              <span className="text-3xl font-black tracking-tight">{simulatedRoi.toFixed(2)}x</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
            <h3 className="font-semibold text-neutral-800 mb-8 z-10 relative flex justify-between items-center">
              Comparação: Mês Base vs Simulação
              {simBaseMetrics && (
                <span className="text-xs font-normal text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                  Referência: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(simBaseMetrics.revenue)} Fat. / {simBaseMetrics.roi.toFixed(2)}x ROI
                </span>
              )}
            </h3>

            {/* Chart Playground */}
            <div className="h-64 flex items-end justify-center gap-12 mt-4 px-4 relative z-10 w-full mx-auto max-w-2xl border-b-2 border-dashed border-neutral-200 pb-2">
              {(() => {
                const maxRev = Math.max((simBaseMetrics?.revenue || 0), simulatedGlobalRevenue, 1);
                const revBaseHeight = simBaseMetrics ? (simBaseMetrics.revenue / maxRev) * 100 : 0;
                const revSimHeight = (simulatedGlobalRevenue / maxRev) * 100;

                const maxRoi = Math.max((simBaseMetrics?.roi || 0), simulatedRoi, 1);
                const roiBaseHeight = simBaseMetrics ? (simBaseMetrics.roi / maxRoi) * 100 : 0;
                const roiSimHeight = (simulatedRoi / maxRoi) * 100;

                return (
                  <>
                    {/* Group 1: Revenue */}
                    <div className="flex flex-col items-center gap-2 group w-24">
                      <div className="w-full flex items-end justify-between gap-1 h-48 relative">
                        <div className="w-1/2 bg-neutral-200 rounded-t-md relative transition-all duration-700 ease-out flex flex-col justify-end" style={{ height: `${revBaseHeight}%` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{simBaseMetrics ? new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(simBaseMetrics.revenue) : '0'}</span>
                        </div>
                        <div className="w-1/2 bg-indigo-500 rounded-t-md relative transition-all duration-700 ease-out shadow-lg flex flex-col justify-end" style={{ height: `${revSimHeight}%` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-indigo-600 whitespace-nowrap">{new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(simulatedGlobalRevenue)}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-neutral-500">Faturamento</span>
                    </div>

                    {/* Group 2: ROI */}
                    <div className="flex flex-col items-center gap-2 group w-24">
                      <div className="w-full flex items-end justify-between gap-1 h-48 relative">
                        <div className="w-1/2 bg-neutral-200 rounded-t-md relative transition-all duration-700 ease-out flex flex-col justify-end" style={{ height: `${roiBaseHeight}%` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{simBaseMetrics ? simBaseMetrics.roi.toFixed(1) + 'x' : '0x'}</span>
                        </div>
                        <div className="w-1/2 bg-amber-500 rounded-t-md relative transition-all duration-700 ease-out shadow-lg flex flex-col justify-end" style={{ height: `${roiSimHeight}%` }}>
                          <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-600 whitespace-nowrap">{simulatedRoi.toFixed(1)}x</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-neutral-500">ROI Geral</span>
                    </div>
                  </>
                )
              })()}
            </div>
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
