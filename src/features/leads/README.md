# Sistema de Gerenciamento de Leads

Sistema completo de gerenciamento de leads com interface Kanban drag-and-drop e visualização em tabela.

## 🚀 Funcionalidades

### ✅ Gerenciamento de Leads
- **CRUD Completo**: Criar, visualizar, editar e excluir leads
- **Campos**: Nome, email, telefone, valor estimado, fonte, status, localização, tags, categoria
- **Histórico de Atividades**: Rastreamento completo de notas, emails, ligações, reuniões e mudanças de status

### 📊 Visualizações
- **Kanban Board**: Interface drag-and-drop para mover leads entre colunas
- **Tabela**: Visualização alternativa em formato de tabela (ideal para mobile)
- **Toggle entre views**: Alternar facilmente entre Kanban e Tabela

### 🎨 Colunas Personalizáveis
- Até 10 colunas customizáveis
- Reordenar colunas via drag-and-drop
- Personalizar nome e cor de cada coluna
- Colunas padrão: Novo, Contato Feito, Qualificado, Proposta Enviada, Negociação, Ganho, Perdido

### 🔍 Filtros e Busca
- Busca por nome, email, telefone ou localização
- Filtro por tags
- Filtro por fonte (LinkedIn, Website, Indicação, etc.)
- Badges de filtros ativos com remoção rápida

### 📥 Importação
- Importação via CSV
- Importação via JSON
- Templates disponíveis para download
- Validação automática de dados
- Mapeamento inteligente de campos

### 💾 Persistência
- Dados salvos em localStorage
- Service layer mockado pronto para integração com backend real
- Delays simulados para experiência realista

## 🏗️ Arquitetura

```
src/features/leads/
├── components/
│   ├── lead-card.tsx              # Card individual do lead (Kanban)
│   ├── lead-form.tsx              # Formulário de criação/edição
│   ├── lead-view-dialog.tsx       # Dialog de visualização detalhada
│   ├── leads-dialogs.tsx          # Gerenciador de dialogs
│   ├── leads-import-dialog.tsx    # Dialog de importação CSV/JSON
│   ├── leads-kanban.tsx           # Board Kanban com DnD
│   ├── leads-table.tsx            # Visualização em tabela
│   ├── leads-toolbar.tsx          # Barra de ferramentas e filtros
│   └── column-settings-dialog.tsx # Gerenciamento de colunas
├── context/
│   └── leads-context.tsx          # Context API com estado global
├── data/
│   ├── schema.ts                  # Tipos TypeScript e validação Zod
│   └── mock-leads.ts              # Dados mockados (10 leads)
└── index.tsx                      # Página principal

src/services/
└── leads-service.ts               # Service layer mockado

src/routes/_authenticated/leads/
└── index.tsx                      # Rota TanStack Router
```

## 🛠️ Tecnologias

- **React** + **TypeScript**
- **TanStack Router** (rotas)
- **@dnd-kit** (drag-and-drop)
- **React Hook Form** + **Zod** (formulários e validação)
- **shadcn/ui** (componentes)
- **Tabler Icons** (ícones)
- **PapaParse** (parsing CSV)
- **Sonner** (toasts)
- **localStorage** (persistência)

## 📝 Como Usar

### Criar Lead
1. Clique em "Novo Lead"
2. Preencha os campos obrigatórios (nome, email, telefone, valor, fonte, localização)
3. Adicione tags e categoria (opcional)
4. Clique em "Criar Lead"

### Mover Lead no Kanban
- Arraste e solte o card do lead em outra coluna
- O status será atualizado automaticamente
- Uma atividade de mudança de status será registrada

### Importar Leads
1. Clique em "Importar"
2. Baixe o template (CSV ou JSON)
3. Preencha com seus dados
4. Faça upload do arquivo
5. Leads válidos serão importados automaticamente

### Personalizar Colunas
1. Clique em "Gerenciar Colunas" no Kanban
2. Adicione, edite ou remova colunas
3. Arraste para reordenar
4. Personalize cores
5. Salve as alterações

### Adicionar Atividade
1. Clique em um lead para visualizar
2. Na seção "Histórico de Atividades"
3. Digite a descrição
4. Selecione o tipo (Nota, Email, Ligação, Reunião)
5. Clique em "Adicionar Atividade"

## 🔄 Integração com Backend

Para integrar com um backend real, basta modificar o arquivo `src/services/leads-service.ts`:

```typescript
export const leadsService = {
  async fetchLeads(): Promise<Lead[]> {
    const response = await fetch('/api/leads')
    return response.json()
  },
  
  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>): Promise<Lead> {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    return response.json()
  },
  
  // ... outros métodos
}
```

## 📊 Formato de Dados

### Lead
```typescript
{
  id: string
  nome: string
  email: string
  telefone: string
  valorEstimado: number
  fonte: string
  status: string
  localizacao: string
  tags: string[]
  categoria?: string
  createdAt: string
  updatedAt: string
  atividades: Atividade[]
}
```

### Coluna
```typescript
{
  id: string
  title: string
  order: number
  color?: string
}
```

### Atividade
```typescript
{
  id: string
  tipo: 'nota' | 'email' | 'ligacao' | 'reuniao' | 'status_change'
  descricao: string
  createdAt: string
}
```

## 🎯 Próximos Passos

- [ ] Integração com backend real
- [ ] Exportação de leads (CSV/Excel)
- [ ] Gráficos e analytics
- [ ] Notificações de follow-up
- [ ] Atribuição de leads para vendedores
- [ ] Funil de conversão
- [ ] Integração com CRM
- [ ] Automações de email
- [ ] Webhooks para eventos

## 📄 Licença

Este código faz parte do projeto admin-dashboard-boilerplate.

