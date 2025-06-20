import { createContext, useContext, useEffect, useState } from 'react'

type Locale = 'pt_br' | 'en'

type LocaleProviderProps = {
  children: React.ReactNode
  defaultLocale?: Locale
  storageKey?: string
}

type LocaleProviderState = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const initialState: LocaleProviderState = {
  locale: 'pt_br',
  setLocale: () => null,
  t: () => '',
}

const LocaleProviderContext = createContext<LocaleProviderState>(initialState)

// Translation keys and values
const translations = {
  pt_br: {
    // Navigation
    'nav.general': 'Geral',
    'nav.dashboard': 'Dashboard',
    'nav.tasks': 'Tarefas',
    'nav.apps': 'Aplicativos',
    'nav.chats': 'Conversas',
    'nav.users': 'Usuários',
    'nav.secured_by_clerk': 'Protegido pelo Clerk',
    'nav.sign_in': 'Entrar',
    'nav.sign_up': 'Cadastrar',
    'nav.user_management': 'Gerenciamento de Usuários',
    'nav.pages': 'Páginas',
    'nav.auth': 'Autenticação',
    'nav.sign_in_2_col': 'Entrar (2 Colunas)',
    'nav.forgot_password': 'Esqueci a Senha',
    'nav.otp': 'OTP',
    'nav.errors': 'Erros',
    'nav.unauthorized': 'Não Autorizado',
    'nav.forbidden': 'Proibido',
    'nav.not_found': 'Não Encontrado',
    'nav.internal_server_error': 'Erro Interno do Servidor',
    'nav.maintenance_error': 'Erro de Manutenção',
    'nav.other': 'Outros',
    'nav.settings': 'Configurações',
    'nav.profile': 'Perfil',
    'nav.account': 'Conta',
    'nav.appearance': 'Aparência',
    'nav.notifications': 'Notificações',
    'nav.display': 'Exibição',
    'nav.help_center': 'Central de Ajuda',
    'nav.real_estate': 'Imóveis',

    // Common
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.delete': 'Excluir',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.add': 'Adicionar',
    'common.search': 'Pesquisar',
    'common.search_placeholder': 'Digite um comando ou pesquise...',
    'common.no_results': 'Nenhum resultado encontrado.',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
    'common.close': 'Fechar',
    'common.open': 'Abrir',
    'common.yes': 'Sim',
    'common.no': 'Não',
    'common.ok': 'OK',
    'common.submit': 'Enviar',
    'common.reset': 'Redefinir',
    'common.clear': 'Limpar',
    'common.all': 'Todos',
    'common.none': 'Nenhum',
    'common.select': 'Selecionar',
    'common.selected': 'Selecionado',
    'common.actions': 'Ações',
    'common.options': 'Opções',
    'common.settings': 'Configurações',
    'common.preferences': 'Preferências',
    'common.language': 'Idioma',
    'common.timezone': 'Fuso Horário',
    'common.date': 'Data',
    'common.time': 'Hora',
    'common.name': 'Nome',
    'common.email': 'E-mail',
    'common.password': 'Senha',
    'common.username': 'Nome de usuário',
    'common.title': 'Título',
    'common.description': 'Descrição',
    'common.status': 'Status',
    'common.priority': 'Prioridade',
    'common.label': 'Rótulo',
    'common.category': 'Categoria',
    'common.type': 'Tipo',
    'common.role': 'Função',
    'common.permissions': 'Permissões',
    'common.created_at': 'Criado em',
    'common.updated_at': 'Atualizado em',
    'common.last_login': 'Último login',
    'common.active': 'Ativo',
    'common.inactive': 'Inativo',
    'common.enabled': 'Habilitado',
    'common.disabled': 'Desabilitado',
    'common.connected': 'Conectado',
    'common.disconnected': 'Desconectado',
    'common.online': 'Online',
    'common.offline': 'Offline',
    'common.theme': 'Tema',
    'common.light': 'Claro',
    'common.dark': 'Escuro',
    'common.system': 'Sistema',
    'common.filter': 'Filtrar',
    'common.sort': 'Classificar',
    'common.view': 'Visualizar',
    'common.download': 'Baixar',
    'common.upload': 'Enviar',
    'common.export': 'Exportar',
    'common.import': 'Importar',

    // Dashboard
    'dashboard.download': 'Baixar',
    'dashboard.overview': 'Visão Geral',
    'dashboard.analytics': 'Análises',
    'dashboard.reports': 'Relatórios',
    'dashboard.notifications': 'Notificações',
    'dashboard.total_revenue': 'Receita Total',
    'dashboard.revenue_change': '+20,1% em relação ao mês passado',
    'dashboard.subscriptions': 'Assinaturas',
    'dashboard.subscriptions_change': '+180,1% em relação ao mês passado',
    'dashboard.sales': 'Vendas',
    'dashboard.sales_change': '+19% em relação ao mês passado',
    'dashboard.active_now': 'Ativo Agora',
    'dashboard.active_change': '+201 desde a última hora',
    'dashboard.recent_sales': 'Vendas Recentes',
    'dashboard.recent_sales_description': 'Você fez 265 vendas este mês.',

    // Tasks
    'tasks.title': 'Tarefas',
    'tasks.subtitle': 'Aqui está uma lista das suas tarefas para este mês!',
    'tasks.add_task': 'Adicionar Tarefa',
    'tasks.import_tasks': 'Importar Tarefas',
    'tasks.export_tasks': 'Exportar Tarefas',
    'tasks.delete_task': 'Excluir Tarefa',
    'tasks.edit_task': 'Editar Tarefa',
    'tasks.task_details': 'Detalhes da Tarefa',
    'tasks.task_title': 'Título da Tarefa',
    'tasks.task_description': 'Descrição da Tarefa',
    'tasks.task_status': 'Status da Tarefa',
    'tasks.task_priority': 'Prioridade da Tarefa',
    'tasks.task_label': 'Rótulo da Tarefa',
    'tasks.task_assignee': 'Responsável',
    'tasks.task_due_date': 'Data de Vencimento',
    'tasks.no_tasks': 'Nenhuma tarefa encontrada',
    'tasks.create_task': 'Criar Tarefa',
    'tasks.update_task': 'Atualizar Tarefa',
    'tasks.confirm_delete': 'Tem certeza que deseja excluir esta tarefa?',
    'tasks.delete_confirmation': 'Você está prestes a excluir uma tarefa com o ID {id}. Esta ação não pode ser desfeita.',
    'tasks.task_deleted': 'A seguinte tarefa foi excluída:',

    // Task Status
    'task_status.backlog': 'Backlog',
    'task_status.todo': 'A Fazer',
    'task_status.in_progress': 'Em Progresso',
    'task_status.done': 'Concluído',
    'task_status.canceled': 'Cancelado',

    // Task Priority
    'task_priority.low': 'Baixa',
    'task_priority.medium': 'Média',
    'task_priority.high': 'Alta',

    // Task Labels
    'task_label.bug': 'Bug',
    'task_label.feature': 'Funcionalidade',
    'task_label.documentation': 'Documentação',

    // Apps
    'apps.title': 'Aplicativos',
    'apps.subtitle': 'Aqui está uma lista dos seus aplicativos para integração!',
    'apps.all_apps': 'Todos os Aplicativos',
    'apps.connected': 'Conectado',
    'apps.not_connected': 'Não Conectado',
    'apps.connect': 'Conectar',
    'apps.disconnect': 'Desconectar',
    'apps.configure': 'Configurar',
    'apps.learn_more': 'Saiba Mais',
    'apps.search_apps': 'Buscar aplicativos...',
    'apps.filter_by': 'Filtrar por',
    'apps.sort_by': 'Ordenar por',
    'apps.sort_asc': 'A-Z',
    'apps.sort_desc': 'Z-A',
    'apps.actions.view': 'Visualizar',
    'apps.actions.install': 'Instalar',
    'apps.actions.open': 'Abrir',

    // Chats
    'chats.title': 'Conversas',
    'chats.inbox': 'Caixa de Entrada',
    'chats.search_chat': 'Buscar conversa...',
    'chats.your_messages': 'Suas mensagens',
    'chats.send_message_to_start': 'Envie uma mensagem para iniciar uma conversa.',
    'chats.send_message': 'Enviar mensagem',
    'chats.new_chat': 'Nova Conversa',
    'chats.start_conversation': 'Iniciar Conversa',
    'chats.search_people': 'Buscar pessoas...',
    'chats.no_people_found': 'Nenhuma pessoa encontrada.',
    'chats.chat': 'Conversar',
    'chats.type_message': 'Digite sua mensagem...',
    'chats.send': 'Enviar',
    'chats.you': 'Você',

    // Users
    'users.title': 'Usuários',
    'users.phone_number': 'Número de Telefone',
    'users.add_user': 'Adicionar Usuário',
    'users.invite_user': 'Convidar Usuário',
    'users.edit_user': 'Editar Usuário',
    'users.delete_user': 'Excluir Usuário',
    'users.user_details': 'Detalhes do Usuário',
    'users.user_management': 'Gerenciamento de Usuários',
    'users.confirm_delete': 'Tem certeza que deseja excluir {username}?',
    'users.delete_confirmation': 'Esta ação removerá permanentemente o usuário com a função de {role} do sistema. Isso não pode ser desfeito.',
    'users.enter_username_confirm': 'Digite o nome de usuário para confirmar a exclusão.',
    'users.user_deleted': 'O seguinte usuário foi excluído:',

    // Settings
    'settings.title': 'Configurações',
    'settings.profile.title': 'Perfil',
    'settings.profile.description': 'Gerencie as configurações do seu perfil.',
    'settings.account.title': 'Conta',
    'settings.account.description': 'Atualize as configurações da sua conta. Defina seu idioma e fuso horário preferidos.',
    'settings.appearance.title': 'Aparência',
    'settings.appearance.description': 'Personalize a aparência da aplicação.',
    'settings.notifications.title': 'Notificações',
    'settings.notifications.description': 'Configure suas preferências de notificação.',
    'settings.display.title': 'Exibição',
    'settings.display.description': 'Configure as opções de exibição.',

    // Account Form
    'account.name': 'Nome',
    'account.name_placeholder': 'Seu nome',
    'account.name_description': 'Este é o nome que será exibido no seu perfil e nos e-mails.',
    'account.name_min_error': 'O nome deve ter pelo menos 2 caracteres.',
    'account.name_max_error': 'O nome não deve ter mais de 30 caracteres.',
    'account.dob': 'Data de Nascimento',
    'account.dob_placeholder': 'Selecione uma data',
    'account.dob_description': 'Sua data de nascimento é usada para calcular sua idade.',
    'account.dob_required_error': 'A data de nascimento é obrigatória.',
    'account.language': 'Idioma',
    'account.language_placeholder': 'Selecione um idioma',
    'account.language_description': 'Este é o idioma que será usado na interface.',
    'account.language_required_error': 'Por favor, selecione um idioma.',
    'account.update_account': 'Atualizar conta',

    // Languages
    'language.english': 'Inglês',
    'language.portuguese': 'Português (Brasil)',
    'language.french': 'Francês',
    'language.german': 'Alemão',
    'language.spanish': 'Espanhol',
    'language.russian': 'Russo',
    'language.japanese': 'Japonês',
    'language.korean': 'Coreano',
    'language.chinese': 'Chinês',

    // Profile Dropdown
    'profile.profile': 'Perfil',
    'profile.billing': 'Cobrança',
    'profile.settings': 'Configurações',
    'profile.new_team': 'Nova Equipe',
    'profile.log_out': 'Sair',

    // Error Pages
    'error.503.title': 'Website em manutenção!',
    'error.503.description': 'O site não está disponível no momento. Voltaremos em breve.',
    'error.learn_more': 'Saiba mais',

    // Form Validation
    'validation.title_required': 'Título é obrigatório.',
    'validation.status_required': 'Por favor, selecione um status.',
    'validation.label_required': 'Por favor, selecione um rótulo.',
    'validation.priority_required': 'Por favor, escolha uma prioridade.',

    // Confirm Dialog
    'dialog.warning': 'Aviso!',
    'dialog.careful_operation': 'Por favor, tenha cuidado, esta operação não pode ser revertida.',

    // Alerts
    'alert.warning': 'Aviso!',
    'alert.please_be_careful': 'Por favor, tenha cuidado, esta operação não pode ser revertida.',

    // Dashboard Teams
    'teams.shadcn_admin': 'Shadcn Admin',
    'teams.vite_shadcnui': 'Vite + ShadcnUI',
    'teams.acme_inc': 'Acme Inc',
    'teams.enterprise': 'Empresarial',
    'teams.acme_corp': 'Acme Corp.',
    'teams.startup': 'Startup',

    // Real Estate Management
    'real_estate.title': 'Gestão de Imóveis',
    'real_estate.subtitle': 'Gerencie seu portfólio de propriedades e lançamentos',
    'real_estate.dashboard': 'Dashboard',
    'real_estate.properties': 'Propriedades',
    'real_estate.launches': 'Lançamentos',
    'real_estate.agents': 'Corretores',
    'real_estate.reports': 'Relatórios',
    
    // Property Management
    'real_estate.add_property': 'Adicionar Propriedade',
    'real_estate.edit_property': 'Editar Propriedade',
    'real_estate.delete_property': 'Excluir Propriedade',
    'real_estate.property_details': 'Detalhes da Propriedade',
    'real_estate.search_properties': 'Buscar propriedades...',
    'real_estate.filter_properties': 'Filtrar Propriedades',
    'real_estate.sort_properties': 'Ordenar Propriedades',
    'real_estate.properties_found': 'propriedades encontradas',
    'real_estate.no_properties': 'Nenhuma propriedade encontrada',
    
    // Property Status
    'real_estate.status.available': 'Disponível',
    'real_estate.status.sold': 'Vendido',
    'real_estate.status.reserved': 'Reservado',
    'real_estate.status.under_construction': 'Em Construção',
    'real_estate.status.pre_launch': 'Pré-Lançamento',
    'real_estate.status.suspended': 'Suspenso',
    
    // Property Types
    'real_estate.type.apartment': 'Apartamento',
    'real_estate.type.house': 'Casa',
    'real_estate.type.commercial': 'Comercial',
    'real_estate.type.land': 'Terreno',
    'real_estate.type.penthouse': 'Cobertura',
    'real_estate.type.office': 'Escritório',
    
    // Property Priority
    'real_estate.priority.low': 'Baixa',
    'real_estate.priority.medium': 'Média',
    'real_estate.priority.high': 'Alta',
    'real_estate.priority.all': 'Todas',
    
    // Property Details
    'real_estate.reference': 'Referência',
    'real_estate.price': 'Preço',
    'real_estate.original_price': 'Preço Original',
    'real_estate.sale_price': 'Preço de Venda',
    'real_estate.price_per_sqm': 'Preço por m²',
    'real_estate.area': 'Área',
    'real_estate.bedrooms': 'Quartos',
    'real_estate.bathrooms': 'Banheiros',
    'real_estate.parking_spaces': 'Vagas',
    'real_estate.floor': 'Andar',
    'real_estate.total_floors': 'Total de Andares',
    'real_estate.year_built': 'Ano de Construção',
    'real_estate.furnished': 'Mobiliado',
    'real_estate.commission': 'Comissão',
    'real_estate.view_count': 'Visualizações',
    'real_estate.inquiries': 'Consultas',
    
    // Dates
    'real_estate.listing_date': 'Data de Anúncio',
    'real_estate.sale_date': 'Data de Venda',
    'real_estate.estimated_delivery': 'Previsão de Entrega',
    
    // Agent Information
    'real_estate.agent': 'Corretor',
    'real_estate.agent_name': 'Nome do Corretor',
    'real_estate.agent_email': 'E-mail do Corretor',
    'real_estate.agent_phone': 'Telefone do Corretor',
    'real_estate.contact_agent': 'Contatar Corretor',
    
    // Developer Information
    'real_estate.developer': 'Incorporadora',
    'real_estate.developer_name': 'Nome da Incorporadora',
    
    // Location
    'real_estate.location': 'Localização',
    'real_estate.address': 'Endereço',
    'real_estate.neighborhood': 'Bairro',
    'real_estate.city': 'Cidade',
    'real_estate.state': 'Estado',
    'real_estate.zip_code': 'CEP',
    
    // Features and Amenities
    'real_estate.amenities': 'Comodidades',
    'real_estate.features': 'Características',
    'real_estate.description': 'Descrição',
    
    // Actions
    'real_estate.view_details': 'Ver Detalhes',
    'real_estate.schedule_visit': 'Agendar Visita',
    'real_estate.contact': 'Contato',
    'real_estate.share': 'Compartilhar',
    'real_estate.favorite': 'Favoritar',
    'real_estate.edit': 'Editar',
    'real_estate.delete': 'Excluir',
    
    // Filters
    'real_estate.filters': 'Filtros',
    'real_estate.clear_filters': 'Limpar Filtros',
    'real_estate.price_range': 'Faixa de Preço',
    'real_estate.property_type': 'Tipo de Propriedade',
    'real_estate.property_status': 'Status da Propriedade',
    'real_estate.min_area': 'Área Mínima',
    'real_estate.max_area': 'Área Máxima',
    'real_estate.min_bedrooms': 'Quartos Mínimos',
    'real_estate.min_bathrooms': 'Banheiros Mínimos',
    
    // Sorting
    'real_estate.sort_by': 'Ordenar por',
    'real_estate.sort_price_asc': 'Menor Preço',
    'real_estate.sort_price_desc': 'Maior Preço',
    'real_estate.sort_area_asc': 'Menor Área',
    'real_estate.sort_area_desc': 'Maior Área',
    'real_estate.sort_date_asc': 'Mais Antigo',
    'real_estate.sort_date_desc': 'Mais Recente',
    'real_estate.sort_priority': 'Prioridade',
    
    // Statistics
    'real_estate.stats.total_properties': 'Total de Propriedades',
    'real_estate.stats.available_properties': 'Propriedades Disponíveis',
    'real_estate.stats.sold_properties': 'Propriedades Vendidas',
    'real_estate.stats.reserved_properties': 'Propriedades Reservadas',
    'real_estate.stats.total_value': 'Valor Total do Portfólio',
    'real_estate.stats.average_price': 'Preço Médio',
    'real_estate.stats.monthly_revenue': 'Receita Mensal',
    
    // Map
    'real_estate.map': 'Mapa',
    'real_estate.list_view': 'Visualização em Lista',
    'real_estate.map_view': 'Visualização no Mapa',
    'real_estate.fullscreen': 'Tela Cheia',
    'real_estate.zoom_in': 'Aumentar Zoom',
    'real_estate.zoom_out': 'Diminuir Zoom',
  },
  en: {
    // Navigation
    'nav.general': 'General',
    'nav.dashboard': 'Dashboard',
    'nav.tasks': 'Tasks',
    'nav.apps': 'Apps',
    'nav.chats': 'Chats',
    'nav.users': 'Users',
    'nav.secured_by_clerk': 'Secured by Clerk',
    'nav.sign_in': 'Sign In',
    'nav.sign_up': 'Sign Up',
    'nav.user_management': 'User Management',
    'nav.pages': 'Pages',
    'nav.auth': 'Auth',
    'nav.sign_in_2_col': 'Sign In (2 Columns)',
    'nav.forgot_password': 'Forgot Password',
    'nav.otp': 'OTP Code',
    'nav.errors': 'Errors',
    'nav.unauthorized': 'Unauthorized',
    'nav.forbidden': 'Forbidden',
    'nav.not_found': 'Not Found',
    'nav.internal_server_error': 'Internal Server Error',
    'nav.maintenance_error': 'Maintenance Error',
    'nav.other': 'Other',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'nav.account': 'Account',
    'nav.appearance': 'Appearance',
    'nav.notifications': 'Notifications',
    'nav.display': 'Display',
    'nav.help_center': 'Help Center',
    'nav.real_estate': 'Real Estate',

    // Common
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.search_placeholder': 'Type a command or search...',
    'common.no_results': 'No results found.',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Info',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.submit': 'Submit',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.all': 'All',
    'common.none': 'None',
    'common.select': 'Select',
    'common.selected': 'Selected',
    'common.actions': 'Actions',
    'common.options': 'Options',
    'common.settings': 'Settings',
    'common.preferences': 'Preferences',
    'common.language': 'Language',
    'common.timezone': 'Timezone',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.password': 'Password',
    'common.username': 'Username',
    'common.title': 'Title',
    'common.description': 'Description',
    'common.status': 'Status',
    'common.priority': 'Priority',
    'common.label': 'Label',
    'common.category': 'Category',
    'common.type': 'Type',
    'common.role': 'Role',
    'common.permissions': 'Permissions',
    'common.created_at': 'Created at',
    'common.updated_at': 'Updated at',
    'common.last_login': 'Last login',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
    'common.enabled': 'Enabled',
    'common.disabled': 'Disabled',
    'common.connected': 'Connected',
    'common.disconnected': 'Disconnected',
    'common.online': 'Online',
    'common.offline': 'Offline',
    'common.theme': 'Theme',
    'common.light': 'Light',
    'common.dark': 'Dark',
    'common.system': 'System',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view': 'View',
    'common.download': 'Download',
    'common.upload': 'Upload',
    'common.export': 'Export',
    'common.import': 'Import',

    // Dashboard
    'dashboard.download': 'Download',
    'dashboard.overview': 'Overview',
    'dashboard.analytics': 'Analytics',
    'dashboard.reports': 'Reports',
    'dashboard.notifications': 'Notifications',
    'dashboard.total_revenue': 'Total Revenue',
    'dashboard.revenue_change': '+20.1% from last month',
    'dashboard.subscriptions': 'Subscriptions',
    'dashboard.subscriptions_change': '+180.1% from last month',
    'dashboard.sales': 'Sales',
    'dashboard.sales_change': '+19% from last month',
    'dashboard.active_now': 'Active Now',
    'dashboard.active_change': '+201 since last hour',
    'dashboard.recent_sales': 'Recent Sales',
    'dashboard.recent_sales_description': 'You made 265 sales this month.',

    // Tasks
    'tasks.title': 'Tasks',
    'tasks.subtitle': "Here's a list of your tasks for this month!",
    'tasks.add_task': 'Add Task',
    'tasks.import_tasks': 'Import Tasks',
    'tasks.export_tasks': 'Export Tasks',
    'tasks.delete_task': 'Delete Task',
    'tasks.edit_task': 'Edit Task',
    'tasks.task_details': 'Task Details',
    'tasks.task_title': 'Task Title',
    'tasks.task_description': 'Task Description',
    'tasks.task_status': 'Task Status',
    'tasks.task_priority': 'Task Priority',
    'tasks.task_label': 'Task Label',
    'tasks.task_assignee': 'Assignee',
    'tasks.task_due_date': 'Due Date',
    'tasks.no_tasks': 'No tasks found',
    'tasks.create_task': 'Create Task',
    'tasks.update_task': 'Update Task',
    'tasks.confirm_delete': 'Are you sure you want to delete this task?',
    'tasks.delete_confirmation': 'You are about to delete a task with the ID {id}. This action cannot be undone.',
    'tasks.task_deleted': 'The following task has been deleted:',

    // Task Status
    'task_status.backlog': 'Backlog',
    'task_status.todo': 'Todo',
    'task_status.in_progress': 'In Progress',
    'task_status.done': 'Done',
    'task_status.canceled': 'Canceled',

    // Task Priority
    'task_priority.low': 'Low',
    'task_priority.medium': 'Medium',
    'task_priority.high': 'High',

    // Task Labels
    'task_label.bug': 'Bug',
    'task_label.feature': 'Feature',
    'task_label.documentation': 'Documentation',

    // Apps
    'apps.title': 'Apps',
    'apps.subtitle': 'Here\'s a list of your apps for integration!',
    'apps.all_apps': 'All Apps',
    'apps.connected': 'Connected',
    'apps.not_connected': 'Not Connected',
    'apps.connect': 'Connect',
    'apps.disconnect': 'Disconnect',
    'apps.configure': 'Configure',
    'apps.learn_more': 'Learn more',
    'apps.search_apps': 'Search apps...',
    'apps.filter_by': 'Filter by',
    'apps.sort_by': 'Sort by',
    'apps.sort_asc': 'A-Z',
    'apps.sort_desc': 'Z-A',
    'apps.actions.view': 'View',
    'apps.actions.install': 'Install',
    'apps.actions.open': 'Open',

    // Chats
    'chats.title': 'Chats',
    'chats.inbox': 'Inbox',
    'chats.search_chat': 'Search chat...',
    'chats.your_messages': 'Your messages',
    'chats.send_message_to_start': 'Send a message to start a chat.',
    'chats.send_message': 'Send message',
    'chats.new_chat': 'New Chat',
    'chats.start_conversation': 'Start Conversation',
    'chats.search_people': 'Search people...',
    'chats.no_people_found': 'No people found.',
    'chats.chat': 'Chat',
    'chats.type_message': 'Type your message...',
    'chats.send': 'Send',
    'chats.you': 'You',

    // Users
    'users.title': 'Users',
    'users.phone_number': 'Phone Number',
    'users.add_user': 'Add User',
    'users.invite_user': 'Invite User',
    'users.edit_user': 'Edit User',
    'users.delete_user': 'Delete User',
    'users.user_details': 'User Details',
    'users.user_management': 'User Management',
    'users.confirm_delete': 'Are you sure you want to delete {username}?',
    'users.delete_confirmation': 'This action will permanently remove the user with the role of {role} from the system. This cannot be undone.',
    'users.enter_username_confirm': 'Enter username to confirm deletion.',
    'users.user_deleted': 'The following user has been deleted:',

    // Settings
    'settings.title': 'Settings',
    'settings.profile.title': 'Profile',
    'settings.profile.description': 'Manage your profile settings.',
    'settings.account.title': 'Account',
    'settings.account.description': 'Update your account settings. Set your preferred language and timezone.',
    'settings.appearance.title': 'Appearance',
    'settings.appearance.description': 'Customize the appearance of the app.',
    'settings.notifications.title': 'Notifications',
    'settings.notifications.description': 'Configure your notification preferences.',
    'settings.display.title': 'Display',
    'settings.display.description': 'Configure your display options.',

    // Account Form
    'account.name': 'Name',
    'account.name_placeholder': 'Your name',
    'account.name_description': 'This is the name that will be displayed on your profile and in emails.',
    'account.name_min_error': 'Name must be at least 2 characters.',
    'account.name_max_error': 'Name must not be longer than 30 characters.',
    'account.dob': 'Date of birth',
    'account.dob_placeholder': 'Pick a date',
    'account.dob_description': 'Your date of birth is used to calculate your age.',
    'account.dob_required_error': 'A date of birth is required.',
    'account.language': 'Language',
    'account.language_placeholder': 'Select a language',
    'account.language_description': 'This is the language that will be used in the interface.',
    'account.language_required_error': 'Please select a language.',
    'account.update_account': 'Update account',

    // Languages
    'language.english': 'English',
    'language.portuguese': 'Portuguese (Brazil)',
    'language.french': 'French',
    'language.german': 'German',
    'language.spanish': 'Spanish',
    'language.russian': 'Russian',
    'language.japanese': 'Japanese',
    'language.korean': 'Korean',
    'language.chinese': 'Chinese',

    // Profile Dropdown
    'profile.profile': 'Profile',
    'profile.billing': 'Billing',
    'profile.settings': 'Settings',
    'profile.new_team': 'New Team',
    'profile.log_out': 'Log out',

    // Error Pages
    'error.503.title': 'Website is under maintenance!',
    'error.503.description': "The site is not available at the moment. We'll be back online shortly.",
    'error.learn_more': 'Learn more',

    // Form Validation
    'validation.title_required': 'Title is required.',
    'validation.status_required': 'Please select a status.',
    'validation.label_required': 'Please select a label.',
    'validation.priority_required': 'Please choose a priority.',

    // Confirm Dialog
    'dialog.warning': 'Warning!',
    'dialog.careful_operation': 'Please be careful, this operation cannot be rolled back.',

    // Alerts
    'alert.warning': 'Warning!',
    'alert.please_be_careful': 'Please be careful, this operation cannot be rolled back.',

    // Dashboard Teams
    'teams.shadcn_admin': 'Shadcn Admin',
    'teams.vite_shadcnui': 'Vite + ShadcnUI',
    'teams.acme_inc': 'Acme Inc',
    'teams.enterprise': 'Enterprise',
    'teams.acme_corp': 'Acme Corp.',
    'teams.startup': 'Startup',

    // Real Estate Management
    'real_estate.title': 'Real Estate Management',
    'real_estate.subtitle': 'Manage your property portfolio and launches',
    'real_estate.dashboard': 'Dashboard',
    'real_estate.properties': 'Properties',
    'real_estate.launches': 'Launches',
    'real_estate.agents': 'Agents',
    'real_estate.reports': 'Reports',
    
    // Property Management
    'real_estate.add_property': 'Add Property',
    'real_estate.edit_property': 'Edit Property',
    'real_estate.delete_property': 'Delete Property',
    'real_estate.property_details': 'Property Details',
    'real_estate.search_properties': 'Search properties...',
    'real_estate.filter_properties': 'Filter Properties',
    'real_estate.sort_properties': 'Sort Properties',
    'real_estate.properties_found': 'properties found',
    'real_estate.no_properties': 'No properties found',
    
    // Property Status
    'real_estate.status.available': 'Available',
    'real_estate.status.sold': 'Sold',
    'real_estate.status.reserved': 'Reserved',
    'real_estate.status.under_construction': 'Under Construction',
    'real_estate.status.pre_launch': 'Pre-Launch',
    'real_estate.status.suspended': 'Suspended',
    
    // Property Types
    'real_estate.type.apartment': 'Apartment',
    'real_estate.type.house': 'House',
    'real_estate.type.commercial': 'Commercial',
    'real_estate.type.land': 'Land',
    'real_estate.type.penthouse': 'Penthouse',
    'real_estate.type.office': 'Office',
    
    // Property Priority
    'real_estate.priority.low': 'Low',
    'real_estate.priority.medium': 'Medium',
    'real_estate.priority.high': 'High',
    'real_estate.priority.all': 'All',
    
    // Property Details
    'real_estate.reference': 'Reference',
    'real_estate.price': 'Price',
    'real_estate.original_price': 'Original Price',
    'real_estate.sale_price': 'Sale Price',
    'real_estate.price_per_sqm': 'Price per m²',
    'real_estate.area': 'Area',
    'real_estate.bedrooms': 'Bedrooms',
    'real_estate.bathrooms': 'Bathrooms',
    'real_estate.parking_spaces': 'Parking Spaces',
    'real_estate.floor': 'Floor',
    'real_estate.total_floors': 'Total Floors',
    'real_estate.year_built': 'Year Built',
    'real_estate.furnished': 'Furnished',
    'real_estate.commission': 'Commission',
    'real_estate.view_count': 'Views',
    'real_estate.inquiries': 'Inquiries',
    
    // Dates
    'real_estate.listing_date': 'Listing Date',
    'real_estate.sale_date': 'Sale Date',
    'real_estate.estimated_delivery': 'Estimated Delivery',
    
    // Agent Information
    'real_estate.agent': 'Agent',
    'real_estate.agent_name': 'Agent Name',
    'real_estate.agent_email': 'Agent Email',
    'real_estate.agent_phone': 'Agent Phone',
    'real_estate.contact_agent': 'Contact Agent',
    
    // Developer Information
    'real_estate.developer': 'Developer',
    'real_estate.developer_name': 'Developer Name',
    
    // Location
    'real_estate.location': 'Location',
    'real_estate.address': 'Address',
    'real_estate.neighborhood': 'Neighborhood',
    'real_estate.city': 'City',
    'real_estate.state': 'State',
    'real_estate.zip_code': 'ZIP Code',
    
    // Features and Amenities
    'real_estate.amenities': 'Amenities',
    'real_estate.features': 'Features',
    'real_estate.description': 'Description',
    
    // Actions
    'real_estate.view_details': 'View Details',
    'real_estate.schedule_visit': 'Schedule Visit',
    'real_estate.contact': 'Contact',
    'real_estate.share': 'Share',
    'real_estate.favorite': 'Favorite',
    'real_estate.edit': 'Edit',
    'real_estate.delete': 'Delete',
    
    // Filters
    'real_estate.filters': 'Filters',
    'real_estate.clear_filters': 'Clear Filters',
    'real_estate.price_range': 'Price Range',
    'real_estate.property_type': 'Property Type',
    'real_estate.property_status': 'Property Status',
    'real_estate.min_area': 'Min Area',
    'real_estate.max_area': 'Max Area',
    'real_estate.min_bedrooms': 'Min Bedrooms',
    'real_estate.min_bathrooms': 'Min Bathrooms',
    
    // Sorting
    'real_estate.sort_by': 'Sort by',
    'real_estate.sort_price_asc': 'Lowest Price',
    'real_estate.sort_price_desc': 'Highest Price',
    'real_estate.sort_area_asc': 'Smallest Area',
    'real_estate.sort_area_desc': 'Largest Area',
    'real_estate.sort_date_asc': 'Oldest',
    'real_estate.sort_date_desc': 'Newest',
    'real_estate.sort_priority': 'Priority',
    
    // Statistics
    'real_estate.stats.total_properties': 'Total Properties',
    'real_estate.stats.available_properties': 'Available Properties',
    'real_estate.stats.sold_properties': 'Sold Properties',
    'real_estate.stats.reserved_properties': 'Reserved Properties',
    'real_estate.stats.total_value': 'Total Portfolio Value',
    'real_estate.stats.average_price': 'Average Price',
    'real_estate.stats.monthly_revenue': 'Monthly Revenue',
    
    // Map
    'real_estate.map': 'Map',
    'real_estate.list_view': 'List View',
    'real_estate.map_view': 'Map View',
    'real_estate.fullscreen': 'Fullscreen',
    'real_estate.zoom_in': 'Zoom In',
    'real_estate.zoom_out': 'Zoom Out',
  },
} as const

export function LocaleProvider({
  children,
  defaultLocale = 'pt_br',
  storageKey = 'shadcn-admin-locale',
  ...props
}: LocaleProviderProps) {
  const [locale, _setLocale] = useState<Locale>(
    () => (localStorage.getItem(storageKey) as Locale) || defaultLocale
  )

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute('lang', locale === 'pt_br' ? 'pt-BR' : locale)
  }, [locale])

  const setLocale = (locale: Locale) => {
    localStorage.setItem(storageKey, locale)
    _setLocale(locale)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[locale][key as keyof typeof translations[typeof locale]] as string
    
    if (!translation) {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`)
      return key
    }

    if (params) {
      let result = translation
      Object.entries(params).forEach(([param, value]) => {
        result = result.replace(`{${param}}`, String(value))
      })
      return result
    }

    return translation
  }

  const value = {
    locale,
    setLocale,
    t,
  }

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLocale = () => {
  const context = useContext(LocaleProviderContext)

  if (context === undefined)
    throw new Error('useLocale must be used within a LocaleProvider')

  return context
} 