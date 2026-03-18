# Refatoração do App.tsx (4821 linhas → modular)

## Estrutura Atual
```
App.tsx (4821 linhas)
├── Imports
├── VariationBadge (componente)
├── AdminPanel (componente - 450+ linhas)
│   ├── ClientManager logic
│   ├── AccessManager logic
│   └── TemplateManager logic
├── App (componente principal)
└── export
```

## Estrutura Alvo
```
src/
├── components/
│   ├── AdminPanel/
│   │   ├── AdminPanel.tsx (novo - container)
│   │   ├── ClientManager.tsx (novo - refatorado de AdminPanel)
│   │   ├── AccessManager.tsx (novo - refatorado de AdminPanel)
│   │   ├── TemplateManager.tsx (novo - refatorado de AdminPanel)
│   │   └── index.ts (exports)
│   ├── Dashboard/
│   │   ├── Overview.tsx (novo - refatorado do App)
│   │   ├── VariationBadge.tsx (novo - componente pequeno)
│   │   └── index.ts
│   └── CompanySelector.tsx (novo - mover de App)
├── constants/
│   ├── templates.ts (novo - BUILT_IN_TEMPLATE_MAPPINGS, etc)
│   └── index.ts
├── types/
│   └── index.ts (novo - tipos compartilhados)
├── App.tsx (refatorado - ~150 linhas apenas)
└── ... resto igual
```

## Tamanho esperado após refatoração
- App.tsx: 150 linhas (era 4821)
- AdminPanel.tsx: 100 linhas (container)
- ClientManager.tsx: 400 linhas
- AccessManager.tsx: 250 linhas
- TemplateManager.tsx: 250 linhas
- Overview.tsx: 1500 linhas (charts e dashboard)
- templates.ts: 400 linhas (constantes)
- VariationBadge.tsx: 50 linhas

**Total: ~4000 linhas ainda, mas MODULARIZADO e fácil de manter**

## Ordem de Execução

1. ✅ Criar arquivos de constantes (templates.ts)
2. ✅ Criar arquivo de tipos (types/index.ts)
3. ✅ Extrair VariationBadge.tsx
4. ✅ Extrair AdminPanel/
5. ✅ Extrair Dashboard/Overview.tsx
6. ✅ Atualizar App.tsx
7. ✅ Testar e verificar funcionalidade

## Imports a Atualizar
- App.tsx vai importar de components/AdminPanel e components/Dashboard
- AdminPanel/ vai importar de constants/ e types/
- Dashboard/ vai importar de constants/

## Manter Intacto
- Toda lógica de negócio
- Todos os estados (useState, useEffect)
- Conexões Supabase
- Funcionalidades do Dashboard
- Funcionalidades do AdminPanel

## Git Commits Esperados
1. `refactor: extract template constants to separate file`
2. `refactor: extract types to shared file`
3. `refactor: extract VariationBadge component`
4. `refactor: extract AdminPanel components`
5. `refactor: extract Dashboard components`
6. `refactor: update App.tsx imports and structure`

---
**Status**: Pronto para começar! 🚀
