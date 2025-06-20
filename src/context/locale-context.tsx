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

    // Common
    'common.cancel': 'Cancelar',
    'common.continue': 'Continuar',
    'common.delete': 'Excluir',
    'common.save': 'Salvar',
    'common.edit': 'Editar',
    'common.add': 'Adicionar',
    'common.search': 'Buscar',
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
    'nav.sign_in_2_col': 'Sign In (2 Col)',
    'nav.forgot_password': 'Forgot Password',
    'nav.otp': 'OTP',
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