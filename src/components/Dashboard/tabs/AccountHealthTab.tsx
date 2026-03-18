import React from "react";
import { Activity } from "lucide-react";
import { HealthCategoryCard, AdHealthModule, EditableMetricCard } from "../shared";

interface AccountHealthTabProps {
  currentCompany: any;
  accountHealth: any;
  basicScore: number;
  campaignScore: number;
  trackingScore: number;
  croScore: number;
  creativeScore: number;
  dataScore: number;
  financeScore: number;
  overallHealthScore: number;
  overallHealthConfig: any;
  isSavingHealth: boolean;
  getHealthColorConfig: (score: number) => any;
  getMetricHealthColor: (metric: any) => string;
  handleHealthCheckChange: (category: "basic" | "campaign" | "tracking", item: string, value: boolean) => void;
  handleMetricChange: (moduleName: string, metricKey: string, field: 'value' | 'good' | 'excellent', newValue: string) => void;
}

export function AccountHealthTab({
  currentCompany,
  accountHealth,
  basicScore,
  campaignScore,
  trackingScore,
  croScore,
  creativeScore,
  dataScore,
  financeScore,
  overallHealthScore,
  overallHealthConfig,
  isSavingHealth,
  getHealthColorConfig,
  getMetricHealthColor,
  handleHealthCheckChange,
  handleMetricChange,
}: AccountHealthTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-neutral-800 mb-1">
            Auditoria: Saúde da Conta
          </h2>
          <p className="text-sm text-neutral-500">
            Verifique se a configuração técnica da {currentCompany?.name} está de acordo com as melhores práticas.
          </p>
        </div>
        <div className={`flex items-center gap-4 px-5 py-3 rounded-xl border ${overallHealthConfig.bg} ${overallHealthConfig.border}`}>
          <div>
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Nota Geral</div>
            <div className={`text-2xl font-bold ${overallHealthConfig.text}`}>{overallHealthScore.toFixed(1)} <span className="text-sm">/ 10</span></div>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" className="stroke-neutral-200" strokeWidth="6" fill="none" />
              <circle cx="28" cy="28" r="24" className={`${overallHealthConfig.circle} transition-all duration-1000 ease-out`} strokeWidth="6" fill="none" strokeDasharray="150" strokeDashoffset={150 - (150 * overallHealthScore) / 10} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className={`w-5 h-5 ${overallHealthConfig.text}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Configs */}
        <HealthCategoryCard
          title="Configurações Básicas"
          score={basicScore}
          config={getHealthColorConfig(basicScore)}
          items={[
            { id: 'bmVerified', label: 'Business Manager Verificada' },
            { id: 'paymentMethods', label: 'Métodos de Pagamento Secundários Ativos' },
            { id: 'pagesConnected', label: 'Páginas do Facebook/IG Conectadas Corretamente' },
            { id: 'spendingLimit', label: 'Limite de Gastos Configurado' },
          ]}
          state={accountHealth.basic}
          onChange={(item, val) => handleHealthCheckChange('basic', item, val)}
        />

        {/* Campaign Structure */}
        <HealthCategoryCard
          title="Estrutura de Campanhas"
          score={campaignScore}
          config={getHealthColorConfig(campaignScore)}
          items={[
            { id: 'naming', label: 'Nomenclatura Padrão Aplicada Sistematicamente' },
            { id: 'audiences', label: 'Públicos Frios e Quentes Separados' },
            { id: 'cboAbo', label: 'Estratégias de CBO/ABO aplicadas no Estágio Correto' },
          ]}
          state={accountHealth.campaign}
          onChange={(item, val) => handleHealthCheckChange('campaign', item, val)}
        />

        {/* Tracking & API */}
        <HealthCategoryCard
          title="Traqueamento e API"
          score={trackingScore}
          config={getHealthColorConfig(trackingScore)}
          items={[
            { id: 'pixel', label: 'Pixel Base Instalado' },
            { id: 'capi', label: 'API de Conversões (CAPI) Configurada com Nota > 8' },
            { id: 'events', label: 'Eventos Base (Page View, Lead, Purchase) Priorizados' },
            { id: 'utm', label: 'UTMs Padronizadas em todos os Anúncios' },
          ]}
          state={accountHealth.tracking}
          onChange={(item, val) => handleHealthCheckChange('tracking', item, val)}
        />
      </div>

      {/* Advanced Analytical Modules Divider */}
      <div className="pt-8 pb-4">
        <h2 className="text-xl font-bold text-neutral-800 mb-1">Módulos Analíticos Avançados</h2>
        <p className="text-sm text-neutral-500">Métricas operacionais de performance divididas por área de atuação. Edite os valores ou limiares (engrenagem) para personalizar a régua.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Modulo 1: CRO */}
        <AdHealthModule title="CRO e Experiência de Página" score={croScore} config={getHealthColorConfig(croScore)}>
          {Object.entries((accountHealth.metrics as any).cro).map(([key, metric]: [string, any]) => (
            <EditableMetricCard key={key} metric={metric} metricKey={key} moduleName="cro" getMetricHealthColor={getMetricHealthColor} onChange={handleMetricChange} />
          ))}
        </AdHealthModule>

        {/* Modulo 2: Creative */}
        <AdHealthModule title="Saúde Criativa e Retenção" score={creativeScore} config={getHealthColorConfig(creativeScore)}>
          {Object.entries((accountHealth.metrics as any).creative).map(([key, metric]: [string, any]) => (
            <EditableMetricCard key={key} metric={metric} metricKey={key} moduleName="creative" getMetricHealthColor={getMetricHealthColor} onChange={handleMetricChange} />
          ))}
        </AdHealthModule>

        {/* Modulo 3: Data */}
        <AdHealthModule title="Qualidade de Dados (CAPI)" score={dataScore} config={getHealthColorConfig(dataScore)}>
          {Object.entries((accountHealth.metrics as any).data).map(([key, metric]: [string, any]) => (
            <EditableMetricCard key={key} metric={metric} metricKey={key} moduleName="data" getMetricHealthColor={getMetricHealthColor} onChange={handleMetricChange} />
          ))}
        </AdHealthModule>

        {/* Modulo 4: Finance */}
        <AdHealthModule title="Saúde Financeira e Escala" score={financeScore} config={getHealthColorConfig(financeScore)}>
          {Object.entries((accountHealth.metrics as any).finance).map(([key, metric]: [string, any]) => (
            <EditableMetricCard key={key} metric={metric} metricKey={key} moduleName="finance" getMetricHealthColor={getMetricHealthColor} onChange={handleMetricChange} />
          ))}
        </AdHealthModule>
      </div>

      {isSavingHealth && (
        <div className="fixed bottom-6 right-6 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium animate-in slide-in-from-bottom-5">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          Sincronizando...
        </div>
      )}
    </div>
  );
}
