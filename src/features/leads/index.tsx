import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { LocaleSwitch } from '@/components/locale-switch'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useLocale } from '@/context/locale-context'
import LeadsProvider, { useLeads } from './context/leads-context'
import { LeadsKanban } from './components/leads-kanban'
import { LeadsTable } from './components/leads-table'
import { LeadsToolbar } from './components/leads-toolbar'
import { LeadsDialogs } from './components/leads-dialogs'
import { LeadsImportDialog } from './components/leads-import-dialog'
import { ColumnSettingsDialog } from './components/column-settings-dialog'
import { Skeleton } from '@/components/ui/skeleton'

function LeadsContent() {
  const { viewMode, isLoading } = useLeads()
  const { t } = useLocale()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (viewMode === 'kanban') {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 mb-4 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t('nav.leads')}</h2>
            <p className="text-muted-foreground">
              Gerencie e acompanhe seus leads através do pipeline de vendas
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 mb-4">
          <LeadsToolbar />
        </div>

        <div className="flex-1 overflow-hidden">
          <LeadsKanban />
        </div>

        <LeadsDialogs />
        <LeadsImportDialog />
        <ColumnSettingsDialog />
      </div>
    )
  }

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('nav.leads')}</h2>
          <p className="text-muted-foreground">
            Gerencie e acompanhe seus leads através do pipeline de vendas
          </p>
        </div>
      </div>

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1">
        <div className="space-y-4">
          <LeadsToolbar />
          <LeadsTable />
        </div>
      </div>

      <LeadsDialogs />
      <LeadsImportDialog />
      <ColumnSettingsDialog />
    </>
  )
}

export default function LeadsPage() {
  return (
    <LeadsProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <LocaleSwitch />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <LeadsContent />
      </Main>
    </LeadsProvider>
  )
}

