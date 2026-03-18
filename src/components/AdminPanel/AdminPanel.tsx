import React, { useState, useEffect } from 'react';
import { ClientsManager } from './ClientsManager';
import { AccessManager } from './AccessManager';
import { TemplatesManager } from './TemplatesManager';

interface AdminPanelProps {
  dbCompanies: any[];
  fetchCompanies: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ dbCompanies, fetchCompanies }) => {
  const [adminTab, setAdminTab] = useState<'clients' | 'access' | 'templates'>('clients');

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with sub-tabs */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">Administração</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setAdminTab('clients')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${adminTab === 'clients' ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
          >
            Clientes
          </button>
          <button
            onClick={() => setAdminTab('access')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${adminTab === 'access' ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
          >
            Acessos de Usuário
          </button>
          <button
            onClick={() => setAdminTab('templates')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${adminTab === 'templates' ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
          >
            Padrões de Visualização
          </button>
        </div>
      </div>

      {/* Tab content */}
      {adminTab === 'clients' && <ClientsManager dbCompanies={dbCompanies} fetchCompanies={fetchCompanies} />}
      {adminTab === 'access' && <AccessManager dbCompanies={dbCompanies} />}
      {adminTab === 'templates' && <TemplatesManager />}
    </div>
  );
};
