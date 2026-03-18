# Fase 3: Templates Customizáveis via UI

## Status Atual
✅ **Fase 1**: AdminPanel completo (Clientes, Acessos)
✅ **Fase 2**: Sistema de templates + Aba "Padrões de Visualização"
⏳ **Fase 3**: Templates customizáveis (em andamento)

---

## Objetivo
Permitir criar **novos padrões de visualização** (templates) completamente via UI, sem precisar de código ou SQL.

---

## Escopo

### O que tem agora:
- 3 templates built-in (default, whatsapp, servicos)
- Aba "Padrões de Visualização" no AdminPanel
- Edição de nome/descrição
- Instrução para editar `column_mapping` via SQL (não ideal)

### O que precisa:
- **UI Editor visual** para editar mapeamento de colunas
- **Criar novo template** via form
- **Validação** de templates
- **Teste de compatibilidade** (preview)

---

## Arquitetura

### 1. Expandir a aba "Padrões de Visualização"

**Seção "Novo Template":**
```
Form com:
- ID (slugified)
- Nome
- Descrição
- Tipo padrão (default / whatsapp / servicos) — pré-preenchida
- Botão "Criar baseado em [tipo]"
```

**Seção "Editar Template":**
- Lista de templates (já existe)
- Quando clica em editar, abre um **editor visual de mapeamento**

### 2. Editor Visual de Mapeamento

**UI Structure:**
```
Abas internas (dentro de um template):
- Faturamento (Revenue)
- Meta Ads (Traffic)
- Google Ads (Google Ads)

Por aba, um formulário com:
- Data Column: [campo de texto]
- [Field1] Column: [campo de texto]
- [Field2] Column: [campo de texto]
...
- Checkbox: "Usar múltiplas alternativas?" (ex: "Faturamento" OR "$ Total")
```

**Exemplo (Revenue - Faturamento):**
```
Data Column:           [Data     ]
Payment/Faturamento:   [Pedidos Pagos]
Quantity/Pedidos:      [Quantidade Pedidos]
```

### 3. Salvar Template

Quando salva, fazer upsert em `client_templates`:
```typescript
{
  id: "custom-1",
  name: "Meu Padrão",
  description: "Descrição",
  is_active: true,
  column_mapping: {
    revenue: { date: ["Data"], payment: ["Pedidos Pagos"], ... },
    traffic: { ... },
    googleAds: { ... }
  },
  created_by?: "email@user.com",
  updated_at: new Date()
}
```

### 4. Validação

Antes de salvar, validar:
- ✓ ID é único
- ✓ Nome não vazio
- ✓ Pelo menos um campo mapeado por seção
- ✓ Sem caracteres inválidos em ID

### 5. Preview/Teste (Opcional)

Botão "Testar Template" que:
- Seleciona uma empresa que use esse template
- Carrega os dados dela
- Mostra se o mapeamento funciona

---

## Implementação

### Passo 1: Expandir states em AdminPanel

```typescript
const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
const [newTemplateBaseType, setNewTemplateBaseType] = useState('default');
const [templateEditor, setTemplateEditor] = useState<any>({
  // editor aberto / fechado / dados
});
```

### Passo 2: UI - Botão "Novo Padrão"

Na aba Templates, adicione botão:
```
[+ Criar Novo Padrão]
```

Quando clicado, mostra form:
```
ID: [my-custom-template    ]
Nome: [Meu Template        ]
Descrição: [              ]
Baseado em: [default ▼]
[Criar] [Cancelar]
```

### Passo 3: Editor Visual

Quando edita template ou cria novo, abre editor com abas:
- Revenue
- Traffic
- Google Ads

Cada aba tem form com fields dinâmicos baseado em `builtInTemplates[templateId]`

### Passo 4: Salvar

```typescript
const handleSaveCustomTemplate = async (templateData) => {
  const { error } = await supabase
    .from('client_templates')
    .upsert({
      id: templateData.id,
      name: templateData.name,
      description: templateData.description,
      column_mapping: buildColumnMapping(formValues),
      is_active: true,
      updated_at: new Date()
    });
}
```

### Passo 5: Recarregar templates

Após salvar, fetch templates do Supabase:
```typescript
const fetchTemplates = async () => {
  const { data } = await supabase
    .from('client_templates')
    .select('*')
    .order('created_at', { ascending: false });

  const customTemplates = data || [];
  const allTemplates = [...builtInTemplates, ...customTemplates];
  setTemplatesList(allTemplates);
};
```

---

## Requisitos Técnicos

**Arquivos a modificar:**
- `src/App.tsx` — AdminPanel (adicionar editor visual)

**Tabela Supabase:**
- `client_templates` — já existe, usar `column_mapping` JSONB

**Dependências:**
- Nenhuma nova (use componentes existentes)

---

## Fluxo do Usuário (Final)

1. Admin entra em **Administração → Padrões de Visualização**
2. Clica em **+ Criar Novo Padrão**
3. Preenche ID, Nome, Descrição
4. Escolhe template base (default/whatsapp/servicos)
5. Clica **Criar**
6. Abre editor visual
7. Para cada aba (Revenue/Traffic/GoogleAds):
   - Mapeia quais colunas da planilha correspondem a quais campos internos
8. Salva
9. Novo template fica disponível ao criar/editar cliente

---

## Nice-to-Have (Fase 3.5)

- 🎯 Teste de template (carregar dados de uma empresa e validar)
- 🎯 Duplicar template existente
- 🎯 Desativar template (sem deletar)
- 🎯 Histórico de versões do template
- 🎯 Importar/Exportar template JSON

---

## Checklist de Implementação

- [ ] Adicionar states para novo template form
- [ ] Botão "Criar Novo Padrão" (UI)
- [ ] Form de criação com ID/Nome/Descrição/BaseType
- [ ] Editor visual de mapeamento (abas)
- [ ] Validação de dados
- [ ] Salvar no Supabase
- [ ] Recarregar lista após salvar
- [ ] Editar templates existentes
- [ ] Feedback (sucesso/erro)
- [ ] Testes manuais (criar template, usar em empresa, testar dashboard)

---

## Commits Esperados

1. `feat: add custom template creation form`
2. `feat: add visual column mapping editor`
3. `feat: implement template validation and save`
4. `feat: fetch and manage custom templates from supabase`

---

## Links Úteis

- **Código atual**: `src/App.tsx` (AdminPanel, linhas 104+)
- **Tabela**: `client_templates` (Supabase)
- **Templates Built-in**: `builtInTemplates` object em App.tsx (linhas ~655)
- **Últimos commits**:
  - `4a0695d` — Templates tab
  - `3a04334` — Template system refactor

---

**Status**: Pronto para iniciar na sessão do Antigravity! 🚀
