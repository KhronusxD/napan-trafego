import React from "react";
import {
  Save,
  Edit2,
  Wallet,
  CalendarDays,
  Users,
  Award,
  Target,
  Filter,
  ArrowRight,
  Megaphone,
} from "lucide-react";
import { StrategyCard, FunnelStage } from "../shared";

interface StrategyTabProps {
  isEditingStrategy: boolean;
  localStrategy: any;
  isSavingStrategy: boolean;
  setIsEditingStrategy: (val: boolean) => void;
  setLocalStrategy: (val: any) => void;
  handleSaveStrategy: () => void;
}

export function StrategyTab({
  isEditingStrategy,
  localStrategy,
  isSavingStrategy,
  setIsEditingStrategy,
  setLocalStrategy,
  handleSaveStrategy,
}: StrategyTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Strategy Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-800">
          Planejamento Estratégico
        </h2>
        <button
          onClick={() =>
            isEditingStrategy
              ? handleSaveStrategy()
              : setIsEditingStrategy(true)
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditingStrategy
            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
            : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
            }`}
        >
          {isEditingStrategy ? (
            <>
              <Save className="w-4 h-4" /> Salvar Alterações
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" /> Editar Estratégia
            </>
          )}
        </button>
      </div>

      {/* Budget & Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">
              Verba Mensal
            </h3>
            {isEditingStrategy ? (
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-medium">R$</span>
                <input
                  type="text"
                  value={localStrategy.verbaMensal}
                  onChange={(e) =>
                    setLocalStrategy({
                      ...localStrategy,
                      verbaMensal: e.target.value,
                    })
                  }
                  className="text-2xl font-semibold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ) : (
              <div className="text-2xl font-semibold text-neutral-900">
                R$ {localStrategy.verbaMensal}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <CalendarDays className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-neutral-500 mb-1">
              Data de Recarga
            </h3>
            {isEditingStrategy ? (
              <input
                type="text"
                value={localStrategy.dataRecarga}
                onChange={(e) =>
                  setLocalStrategy({
                    ...localStrategy,
                    dataRecarga: e.target.value,
                  })
                }
                className="text-xl font-medium text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <div className="text-xl font-medium text-neutral-900">
                {localStrategy.dataRecarga}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StrategyCard
          title="Personas Alvo"
          icon={<Users className="w-5 h-5 text-blue-500" />}
          items={localStrategy.personas}
          isEditing={isEditingStrategy}
          onChange={(newItems) =>
            setLocalStrategy({ ...localStrategy, personas: newItems })
          }
        />
        <StrategyCard
          title="Vantagens Únicas (USPs)"
          icon={<Award className="w-5 h-5 text-amber-500" />}
          items={localStrategy.uniqueAdvantages}
          isEditing={isEditingStrategy}
          onChange={(newItems) =>
            setLocalStrategy({
              ...localStrategy,
              uniqueAdvantages: newItems,
            })
          }
        />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-neutral-800">
            Resumo da Estratégia
          </h3>
        </div>
        {isEditingStrategy ? (
          <textarea
            value={localStrategy.trafficStrategy}
            onChange={(e) =>
              setLocalStrategy({
                ...localStrategy,
                trafficStrategy: e.target.value,
              })
            }
            className="w-full min-h-[100px] p-3 text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        ) : (
          <p className="text-neutral-600 leading-relaxed">
            {localStrategy.trafficStrategy}
          </p>
        )}
      </div>

      {/* Visual Funnel Map */}
      {localStrategy.funnel && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-neutral-800">
                Mapa do Funil de Tráfego
              </h3>
            </div>
            {isEditingStrategy && (
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                Modo de Edição
              </span>
            )}
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Captação Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-blue-500" />
                <h4 className="font-medium text-neutral-900">
                  Captação (Públicos)
                </h4>
              </div>

              <FunnelStage
                label="Público Frio"
                color="bg-blue-50 border-blue-200 text-blue-700 focus-within:ring-blue-500"
                content={localStrategy.funnel.captacao.frio}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      captacao: {
                        ...localStrategy.funnel.captacao,
                        frio: val,
                      },
                    },
                  })
                }
              />
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-neutral-300 rotate-90 md:rotate-0" />
              </div>
              <FunnelStage
                label="Público Morno"
                color="bg-amber-50 border-amber-200 text-amber-700 focus-within:ring-amber-500"
                content={localStrategy.funnel.captacao.morno}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      captacao: {
                        ...localStrategy.funnel.captacao,
                        morno: val,
                      },
                    },
                  })
                }
              />
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-neutral-300 rotate-90 md:rotate-0" />
              </div>
              <FunnelStage
                label="Público Quente"
                color="bg-red-50 border-red-200 text-red-700 focus-within:ring-red-500"
                content={localStrategy.funnel.captacao.quente}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      captacao: {
                        ...localStrategy.funnel.captacao,
                        quente: val,
                      },
                    },
                  })
                }
              />
            </div>

            {/* Distribuição Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <Megaphone className="w-5 h-5 text-purple-500" />
                <h4 className="font-medium text-neutral-900">
                  Distribuição (Mensagem)
                </h4>
              </div>

              <FunnelStage
                label="Topo de Funil"
                color="bg-purple-50 border-purple-200 text-purple-700 focus-within:ring-purple-500"
                content={localStrategy.funnel.distribuicao.topo}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      distribuicao: {
                        ...localStrategy.funnel.distribuicao,
                        topo: val,
                      },
                    },
                  })
                }
              />
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-neutral-300 rotate-90 md:rotate-0" />
              </div>
              <FunnelStage
                label="Meio de Funil"
                color="bg-indigo-50 border-indigo-200 text-indigo-700 focus-within:ring-indigo-500"
                content={localStrategy.funnel.distribuicao.meio}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      distribuicao: {
                        ...localStrategy.funnel.distribuicao,
                        meio: val,
                      },
                    },
                  })
                }
              />
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-neutral-300 rotate-90 md:rotate-0" />
              </div>
              <FunnelStage
                label="Fundo de Funil"
                color="bg-emerald-50 border-emerald-200 text-emerald-700 focus-within:ring-emerald-500"
                content={localStrategy.funnel.distribuicao.fundo}
                isEditing={isEditingStrategy}
                onChange={(val) =>
                  setLocalStrategy({
                    ...localStrategy,
                    funnel: {
                      ...localStrategy.funnel,
                      distribuicao: {
                        ...localStrategy.funnel.distribuicao,
                        fundo: val,
                      },
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
