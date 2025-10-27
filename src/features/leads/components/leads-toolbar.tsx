import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLeads } from '../context/leads-context'
import { IconPlus, IconFileImport, IconSearch, IconFilter, IconLayoutKanban, IconTable } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { fontes } from '../data/schema'
import { useMemo } from 'react'

export function LeadsToolbar() {
  const {
    setOpen,
    searchQuery,
    setSearchQuery,
    selectedTags,
    setSelectedTags,
    selectedFontes,
    setSelectedFontes,
    leads,
    viewMode,
    setViewMode,
  } = useLeads()

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    leads.forEach((lead) => {
      lead.tags.forEach((tag) => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [leads])

  const handleToggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    )
  }

  const handleToggleFonte = (fonte: string) => {
    setSelectedFontes(
      selectedFontes.includes(fonte)
        ? selectedFontes.filter((f) => f !== fonte)
        : [...selectedFontes, fonte]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSelectedFontes([])
    setSearchQuery('')
  }

  const activeFiltersCount = selectedTags.length + selectedFontes.length + (searchQuery ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconFilter className="h-4 w-4 mr-2" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filtrar por Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allTags.length > 0 ? (
                allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => handleToggleTag(tag)}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))
              ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  Nenhuma tag disponível
                </div>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filtrar por Fonte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {fontes.map((fonte) => (
                <DropdownMenuCheckboxItem
                  key={fonte.value}
                  checked={selectedFontes.includes(fonte.value)}
                  onCheckedChange={() => handleToggleFonte(fonte.value)}
                >
                  {fonte.label}
                </DropdownMenuCheckboxItem>
              ))}

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Limpar Filtros
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="h-8"
            >
              <IconLayoutKanban className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8"
            >
              <IconTable className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={() => setOpen('import')}>
            <IconFileImport className="h-4 w-4 mr-2" />
            Importar
          </Button>

          <Button size="sm" onClick={() => setOpen('create')}>
            <IconPlus className="h-4 w-4 mr-2" />
            Novo Lead
          </Button>
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Busca: {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              Tag: {tag}
              <button
                onClick={() => handleToggleTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
          {selectedFontes.map((fonte) => (
            <Badge key={fonte} variant="secondary" className="gap-1">
              Fonte: {fontes.find((f) => f.value === fonte)?.label}
              <button
                onClick={() => handleToggleFonte(fonte)}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  )
}

