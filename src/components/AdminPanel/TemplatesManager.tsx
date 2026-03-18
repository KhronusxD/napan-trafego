import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowRight, RefreshCw, Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { BUILT_IN_BASE_TEMPLATES, BUILT_IN_TEMPLATE_MAPPINGS, TEMPLATE_FIELD_LABELS } from '../../constants/templates';
import { Feedback } from '../../types';

export const TemplatesManager: React.FC = () => {
  const [templatesList, setTemplatesList] = useState<any[]>(BUILT_IN_BASE_TEMPLATES);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [templateForm, setTemplateForm] = useState<any>({ id: '', name: '', description: '' });
  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [newTemplateData, setNewTemplateData] = useState({ id: '', name: '', description: '', baseType: 'default' });
  const [mappingEditorTab, setMappingEditorTab] = useState<'revenue' | 'traffic' | 'googleAds'>('revenue');
  const [mappingFormValues, setMappingFormValues] = useState<any>({ revenue: {}, traffic: {}, googleAds: {} });
  const [isSavingTemplateMapping, setIsSavingTemplateMapping] = useState(false);

  const showFeedback = (type: 'success' | 'error', msg: string) => {
    setFeedback({ type, msg });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchTemplates = async () => {
    setIsLoadingTemplates(true);
    try {
      const { data } = await supabase.from('client_templates').select('*').order('created_at', { ascending: false });
      const dbTemplates = data || [];
      const dbIds = new Set(dbTemplates.map((t: any) => t.id));
      const merged = [
        ...BUILT_IN_BASE_TEMPLATES.filter(t => !dbIds.has(t.id)),
        ...dbTemplates
      ];
      setTemplatesList(merged);
    } catch (err: any) {
      showFeedback('error', 'Erro ao carregar templates: ' + err.message);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const initMappingValues = (columnMapping: any, baseType: string = 'default') => {
    const base = BUILT_IN_TEMPLATE_MAPPINGS[baseType] || BUILT_IN_TEMPLATE_MAPPINGS.default;
    if (!columnMapping) return JSON.parse(JSON.stringify(base));
    const convert = (section: any) =>
      Object.fromEntries(Object.entries(section || {}).map(([k, v]) => [k, Array.isArray(v) ? (v[0] || '') : (v || '')]));
    return {
      revenue: { ...base.revenue, ...convert(columnMapping.revenue) },
      traffic: { ...base.traffic, ...convert(columnMapping.traffic) },
      googleAds: { ...base.googleAds, ...convert(columnMapping.googleAds) },
    };
  };

  const openEditTemplateMapping = (template: any) => {
    setEditingTemplateId(template.id);
    setTemplateForm({ id: template.id, name: template.name, description: template.description || '' });
    const baseType = BUILT_IN_BASE_TEMPLATES.find(t => t.id === template.id)?.id || 'default';
    setMappingFormValues(initMappingValues(template.column_mapping, baseType));
    setMappingEditorTab('revenue');
    setIsEditingTemplate(true);
    setShowNewTemplateForm(false);
  };

  const handleCreateNewTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, name, description, baseType } = newTemplateData;
    if (!id || !name) return showFeedback('error', 'ID e Nome são obrigatórios.');
    if (!/^[a-z0-9-]+$/.test(id)) return showFeedback('error', 'ID deve conter apenas letras minúsculas, números e hifens.');
    if (templatesList.some((t: any) => t.id === id)) return showFeedback('error', `ID "${id}" já está em uso.`);
    setTemplateForm({ id, name, description });
    setMappingFormValues(initMappingValues(null, baseType));
    setMappingEditorTab('revenue');
    setEditingTemplateId(id);
    setIsEditingTemplate(true);
    setShowNewTemplateForm(false);
  };

  const buildColumnMapping = (formValues: any) => ({
    revenue: Object.fromEntries(Object.entries(formValues.revenue || {}).map(([k, v]) => [k, v ? [v as string] : []])),
    traffic: Object.fromEntries(Object.entries(formValues.traffic || {}).map(([k, v]) => [k, v ? [v as string] : []])),
    googleAds: Object.fromEntries(Object.entries(formValues.googleAds || {}).map(([k, v]) => [k, v ? [v as string] : []])),
  });

  const handleSaveTemplateMapping = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingTemplateMapping(true);
    try {
      const columnMapping = buildColumnMapping(mappingFormValues);
      const payload = {
        id: templateForm.id,
        name: templateForm.name,
        description: templateForm.description,
        is_active: true,
        column_mapping: columnMapping,
        updated_at: new Date().toISOString()
      };
      const { error } = await supabase.from('client_templates').upsert(payload, { onConflict: 'id' });
      if (error) throw error;
      showFeedback('success', `Template "${templateForm.name}" salvo com sucesso!`);
      setIsEditingTemplate(false);
      setEditingTemplateId(null);
      await fetchTemplates();
    } catch (err: any) {
      showFeedback('error', 'Erro ao salvar: ' + err.message);
    } finally {
      setIsSavingTemplateMapping(false);
    }
  };

  const deleteCustomTemplate = async (id: string, name: string) => {
    if (!window.confirm(`Tem certeza que deseja excluir o template "${name}"?`)) return;
    try {
      const { error } = await supabase.from('client_templates').delete().eq('id', id);
      if (error) throw error;
      showFeedback('success', `Template "${name}" excluído.`);
      await fetchTemplates();
    } catch (err: any) {
      showFeedback('error', 'Erro ao excluir: ' + err.message);
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

      {/* Templates List */}
      {!isEditingTemplate && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">
              {isLoadingTemplates ? 'Carregando…' : `${templatesList.length} padrão${templatesList.length !== 1 ? 's' : ''}`}
            </span>
            <button
              onClick={() => { setShowNewTemplateForm(true); setNewTemplateData({ id: '', name: '', description: '', baseType: 'default' }); }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" /> Criar Novo Padrão
            </button>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-500 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-3 font-medium">ID / Nome</th>
                <th className="px-6 py-3 font-medium">Descrição</th>
                <th className="px-6 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {templatesList.map((template: any) => {
                const isBuiltIn = BUILT_IN_BASE_TEMPLATES.some(t => t.id === template.id);
                return (
                  <tr key={template.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-neutral-900">{template.name}</div>
                        {isBuiltIn && <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-mono">built-in</span>}
                      </div>
                      <div className="font-mono text-xs text-neutral-400 mt-0.5">{template.id}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600 text-sm">{template.description}</td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button onClick={() => openEditTemplateMapping(template)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Editar
                      </button>
                      {!isBuiltIn && (
                        <button onClick={() => deleteCustomTemplate(template.id, template.name)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                          Excluir
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* New Template Form */}
      {showNewTemplateForm && !isEditingTemplate && (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">Criar Novo Padrão</h3>
            <button onClick={() => setShowNewTemplateForm(false)} className="text-neutral-400 hover:text-neutral-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleCreateNewTemplate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  ID <span className="text-neutral-400 font-normal text-xs">(único, só minúsculas e hifens)</span>
                </label>
                <input
                  required
                  value={newTemplateData.id}
                  onChange={e => setNewTemplateData({ ...newTemplateData, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm font-mono"
                  placeholder="ex: meu-template-custom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Nome de Exibição</label>
                <input
                  required
                  value={newTemplateData.name}
                  onChange={e => setNewTemplateData({ ...newTemplateData, name: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="ex: Meu Padrão Customizado"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Descrição</label>
                <input
                  value={newTemplateData.description}
                  onChange={e => setNewTemplateData({ ...newTemplateData, description: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                  placeholder="Descrição breve (opcional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Baseado em</label>
                <select
                  value={newTemplateData.baseType}
                  onChange={e => setNewTemplateData({ ...newTemplateData, baseType: e.target.value })}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="default">Padrão (E-commerce)</option>
                  <option value="whatsapp">WhatsApp / Leads</option>
                  <option value="servicos">Serviços</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2 border-t border-neutral-100">
              <button type="button" onClick={() => setShowNewTemplateForm(false)} className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                Cancelar
              </button>
              <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                <ArrowRight className="w-3.5 h-3.5" /> Continuar para Editor de Mapeamento
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mapping Editor */}
      {isEditingTemplate && (
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold">Editor de Mapeamento</h3>
              <p className="text-xs text-neutral-500 mt-0.5">Informe o nome exato da coluna na planilha para cada campo</p>
            </div>
            <button onClick={() => { setIsEditingTemplate(false); setEditingTemplateId(null); }} className="text-neutral-400 hover:text-neutral-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 pb-5 border-b border-neutral-100">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">ID do Template</label>
              <div className="px-3 py-2 bg-neutral-50 rounded-lg text-sm font-mono text-neutral-600">{templateForm.id}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1">Nome</label>
              <input
                value={templateForm.name}
                onChange={e => setTemplateForm({ ...templateForm, name: e.target.value })}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-neutral-500 mb-1">Descrição</label>
              <input
                value={templateForm.description}
                onChange={e => setTemplateForm({ ...templateForm, description: e.target.value })}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Section tabs */}
          <div className="flex gap-2 mb-5">
            {(['revenue', 'traffic', 'googleAds'] as const).map(section => (
              <button
                key={section}
                type="button"
                onClick={() => setMappingEditorTab(section)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mappingEditorTab === section ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}
              >
                {section === 'revenue' ? 'Faturamento' : section === 'traffic' ? 'Meta Ads' : 'Google Ads'}
              </button>
            ))}
          </div>

          {/* Fields for active section */}
          <form onSubmit={handleSaveTemplateMapping}>
            <div className="space-y-3 mb-5">
              {TEMPLATE_FIELD_LABELS[mappingEditorTab].map(field => (
                <div key={field.key} className="grid grid-cols-5 gap-3 items-center">
                  <label className="col-span-2 text-sm font-medium text-neutral-700">{field.label}</label>
                  <div className="col-span-3">
                    <input
                      value={mappingFormValues[mappingEditorTab]?.[field.key] || ''}
                      onChange={e => setMappingFormValues({
                        ...mappingFormValues,
                        [mappingEditorTab]: { ...mappingFormValues[mappingEditorTab], [field.key]: e.target.value }
                      })}
                      className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm font-mono"
                      placeholder="Nome exato da coluna na planilha"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end pt-4 border-t border-neutral-100">
              <button type="button" onClick={() => { setIsEditingTemplate(false); setEditingTemplateId(null); }} className="px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                Cancelar
              </button>
              <button type="submit" disabled={isSavingTemplateMapping} className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-60">
                {isSavingTemplateMapping ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Salvando…</> : <><Save className="w-3.5 h-3.5" /> Salvar Template</>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
