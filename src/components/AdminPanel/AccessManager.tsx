import React, { useState, useEffect } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Feedback } from '../../types';

interface AccessManagerProps {
  dbCompanies: any[];
}

export const AccessManager: React.FC<AccessManagerProps> = ({ dbCompanies }) => {
  const [userAccessList, setUserAccessList] = useState<any[]>([]);
  const [isLoadingAccess, setIsLoadingAccess] = useState(false);
  const [accessForm, setAccessForm] = useState({ email: '', company_id: '' });
  const [isSavingAccess, setIsSavingAccess] = useState(false);
  const [isDeletingAccess, setIsDeletingAccess] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchUserAccess = async () => {
    setIsLoadingAccess(true);
    const { data, error } = await supabase.from('user_access').select('*').order('user_email');
    if (!error) setUserAccessList(data || []);
    setIsLoadingAccess(false);
  };

  useEffect(() => {
    fetchUserAccess();
  }, []);

  const handleAddAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessForm.email || !accessForm.company_id) return;
    setIsSavingAccess(true);
    try {
      const { error } = await supabase.from('user_access').insert({
        user_email: accessForm.email.toLowerCase().trim(),
        company_id: accessForm.company_id
      });
      if (error) throw error;
      showFeedback('success', `Acesso adicionado para ${accessForm.email}.`);
      setAccessForm({ email: '', company_id: '' });
      fetchUserAccess();
    } catch (err: any) {
      showFeedback('error', 'Erro ao adicionar acesso: ' + err.message);
    } finally {
      setIsSavingAccess(false);
    }
  };

  const deleteAccess = async (userEmail: string, companyId: string) => {
    const key = `${userEmail}::${companyId}`;
    setIsDeletingAccess(key);
    try {
      const { error } = await supabase.from('user_access').delete()
        .eq('user_email', userEmail)
        .eq('company_id', companyId);
      if (error) throw error;
      showFeedback('success', 'Acesso removido.');
      fetchUserAccess();
    } catch (err: any) {
      showFeedback('error', 'Erro ao remover: ' + err.message);
    } finally {
      setIsDeletingAccess(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Feedback */}
      {feedback && (
        <div className={`px-4 py-3 rounded-lg text-sm font-medium ${
          feedback.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {feedback.msg}
        </div>
      )}

      {/* Add access form */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-700 mb-4">Adicionar Acesso</h3>
        <form onSubmit={handleAddAccess} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">E-mail do usuário</label>
            <input
              type="email"
              required
              value={accessForm.email}
              onChange={e => setAccessForm({ ...accessForm, email: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              placeholder="usuario@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1">Empresa / Nível de acesso</label>
            <select
              required
              value={accessForm.company_id}
              onChange={e => setAccessForm({ ...accessForm, company_id: e.target.value })}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Selecione…</option>
              <option value="ALL">⭐ Acesso Total (Admin)</option>
              {dbCompanies.map((c: any) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isSavingAccess}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          >
            {isSavingAccess ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            Adicionar
          </button>
        </form>
      </div>

      {/* Access list */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700">Acessos Cadastrados</span>
          <button onClick={fetchUserAccess} className="text-neutral-400 hover:text-neutral-700 transition-colors" title="Atualizar lista">
            <RefreshCw className={`w-4 h-4 ${isLoadingAccess ? 'animate-spin' : ''}`} />
          </button>
        </div>
        {isLoadingAccess ? (
          <div className="px-6 py-10 text-center text-neutral-400 text-sm">Carregando acessos…</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-3 font-medium">Usuário</th>
                <th className="px-6 py-3 font-medium">Acesso</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {userAccessList.map((entry: any) => {
                const company = dbCompanies.find((c: any) => c.id === entry.company_id);
                const key = `${entry.user_email}::${entry.company_id}`;
                return (
                  <tr key={key} className="hover:bg-neutral-50">
                    <td className="px-6 py-3 font-mono text-xs text-neutral-700">{entry.user_email}</td>
                    <td className="px-6 py-3">
                      {entry.company_id === 'ALL'
                        ? <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">⭐ Admin (Acesso Total)</span>
                        : <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">{company?.name || entry.company_id}</span>
                      }
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => deleteAccess(entry.user_email, entry.company_id)}
                        disabled={isDeletingAccess === key}
                        className="text-red-500 hover:text-red-700 text-xs font-medium disabled:opacity-40"
                      >
                        {isDeletingAccess === key ? 'Removendo…' : 'Remover'}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {userAccessList.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-neutral-400 text-sm">Nenhum acesso cadastrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
