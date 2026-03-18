import React from "react";
import { Search, X } from "lucide-react";

interface RevenueTabProps {
  isFetchingSheet: boolean;
  sheetError: string | null;
  sheetData: any[];
  sheetHeaders: string[];
  currentCompany: any;
}

export function RevenueTab({
  isFetchingSheet,
  sheetError,
  sheetData,
  sheetHeaders,
  currentCompany,
}: RevenueTabProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-neutral-800">
            Auditoria de Faturamento
          </h2>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Google Sheets
          </span>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar transação..."
            className="pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {isFetchingSheet ? (
        <div className="p-16 flex flex-col items-center justify-center text-neutral-500">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p>Sincronizando com Google Sheets...</p>
        </div>
      ) : sheetError ? (
        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Erro ao carregar dados</h3>
          <p className="text-neutral-500 max-w-md mx-auto mb-6">{sheetError}</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 text-left max-w-2xl mx-auto">
            <strong>Como resolver:</strong>
            <ol className="list-decimal ml-5 mt-2 space-y-1">
              <li>Abra a planilha no Google Sheets.</li>
              <li>Clique em "Compartilhar" no canto superior direito.</li>
              <li>Em "Acesso geral", mude para <strong>"Qualquer pessoa com o link"</strong>.</li>
              <li>Verifique se existe uma aba (página) com o nome exato: <strong>"{currentCompany?.name}"</strong>.</li>
            </ol>
          </div>
        </div>
      ) : sheetData.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-500 font-medium border-b border-neutral-200">
                <tr>
                  {sheetHeaders.map((header, i) => (
                    <th key={i} className="px-6 py-3 whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {sheetData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-neutral-50/50 transition-colors"
                  >
                    {sheetHeaders.map((header, colIndex) => {
                      const value = row[header];
                      const isStatus = header.toLowerCase().includes('status');

                      return (
                        <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-neutral-600">
                          {isStatus ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value?.toLowerCase() === "aprovado" || value?.toLowerCase() === "pago"
                                ? "bg-emerald-100 text-emerald-800"
                                : value?.toLowerCase() === "pendente"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-neutral-100 text-neutral-800"
                                }`}
                            >
                              {value || '-'}
                            </span>
                          ) : (
                            value || '-'
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-sm text-neutral-500">
            <span>Mostrando {sheetData.length} resultados da planilha</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-neutral-200 rounded hover:bg-neutral-100 disabled:opacity-50">
                Anterior
              </button>
              <button className="px-3 py-1 border border-neutral-200 rounded hover:bg-neutral-100">
                Próxima
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="p-12 text-center text-neutral-500">
          <p>A aba "{currentCompany?.name}" foi encontrada, mas está vazia.</p>
        </div>
      )}
    </div>
  );
}
