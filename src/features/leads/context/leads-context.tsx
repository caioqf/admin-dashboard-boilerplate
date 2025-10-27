import React, { useState, useEffect, useCallback } from 'react'
import { Lead, LeadColumn } from '../data/schema'
import { leadsService } from '@/services/leads-service'
import { toast } from 'sonner'
import useDialogState from '@/hooks/use-dialog-state'

type LeadsDialogType = 'create' | 'update' | 'delete' | 'import' | 'view' | 'column-settings'

interface LeadsContextType {
  leads: Lead[]
  columns: LeadColumn[]
  isLoading: boolean
  open: LeadsDialogType | null
  setOpen: (str: LeadsDialogType | null) => void
  currentLead: Lead | null
  setCurrentLead: React.Dispatch<React.SetStateAction<Lead | null>>
  viewMode: 'kanban' | 'table'
  setViewMode: (mode: 'kanban' | 'table') => void
  compactView: boolean
  setCompactView: (compact: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  selectedFontes: string[]
  setSelectedFontes: (fontes: string[]) => void
  fetchLeads: () => Promise<void>
  fetchColumns: () => Promise<void>
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>) => Promise<void>
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>
  deleteLead: (id: string) => Promise<void>
  moveLeadToColumn: (leadId: string, newStatus: string) => Promise<void>
  addAtividade: (leadId: string, atividade: Omit<Lead['atividades'][0], 'id' | 'createdAt'>) => Promise<void>
  importLeads: (leads: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>[]) => Promise<void>
  updateColumns: (columns: LeadColumn[]) => Promise<void>
  createColumn: (column: Omit<LeadColumn, 'id'>) => Promise<void>
  updateColumn: (id: string, updates: Partial<LeadColumn>) => Promise<void>
  deleteColumn: (id: string) => Promise<void>
  filteredLeads: Lead[]
}

const LeadsContext = React.createContext<LeadsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function LeadsProvider({ children }: Props) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [columns, setColumns] = useState<LeadColumn[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [open, setOpen] = useDialogState<LeadsDialogType>(null)
  const [currentLead, setCurrentLead] = useState<Lead | null>(null)
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban')
  const [compactView, setCompactView] = useState(() => {
    const saved = localStorage.getItem('leads_compact_view')
    return saved ? JSON.parse(saved) : false
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedFontes, setSelectedFontes] = useState<string[]>([])

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await leadsService.fetchLeads()
      setLeads(data)
    } catch (error) {
      toast.error('Erro ao carregar leads')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchColumns = useCallback(async () => {
    try {
      const data = await leadsService.fetchColumns()
      setColumns(data.sort((a, b) => a.order - b.order))
    } catch (error) {
      toast.error('Erro ao carregar colunas')
      console.error(error)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
    fetchColumns()
  }, [fetchLeads, fetchColumns])

  const createLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>) => {
    try {
      const newLead = await leadsService.createLead(lead)
      setLeads((prev) => [...prev, newLead])
      toast.success('Lead criado com sucesso')
    } catch (error) {
      toast.error('Erro ao criar lead')
      throw error
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const updatedLead = await leadsService.updateLead(id, updates)
      setLeads((prev) => prev.map((lead) => (lead.id === id ? updatedLead : lead)))
      toast.success('Lead atualizado com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar lead')
      throw error
    }
  }

  const deleteLead = async (id: string) => {
    try {
      await leadsService.deleteLead(id)
      setLeads((prev) => prev.filter((lead) => lead.id !== id))
      toast.success('Lead excluído com sucesso')
    } catch (error) {
      toast.error('Erro ao excluir lead')
      throw error
    }
  }

  const moveLeadToColumn = async (leadId: string, newStatus: string) => {
    try {
      const updatedLead = await leadsService.updateLead(leadId, { status: newStatus })
      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? updatedLead : lead)))
    } catch (error) {
      toast.error('Erro ao mover lead')
      throw error
    }
  }

  const addAtividade = async (
    leadId: string,
    atividade: Omit<Lead['atividades'][0], 'id' | 'createdAt'>
  ) => {
    try {
      const updatedLead = await leadsService.addAtividade(leadId, atividade)
      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? updatedLead : lead)))
      toast.success('Atividade adicionada')
    } catch (error) {
      toast.error('Erro ao adicionar atividade')
      throw error
    }
  }

  const importLeads = async (
    leadsToImport: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>[]
  ) => {
    try {
      const newLeads = await leadsService.importLeads(leadsToImport)
      setLeads((prev) => [...prev, ...newLeads])
      toast.success(`${newLeads.length} leads importados com sucesso`)
    } catch (error) {
      toast.error('Erro ao importar leads')
      throw error
    }
  }

  const updateColumns = async (newColumns: LeadColumn[]) => {
    try {
      const updated = await leadsService.updateColumns(newColumns)
      setColumns(updated.sort((a, b) => a.order - b.order))
      toast.success('Colunas atualizadas')
    } catch (error) {
      toast.error('Erro ao atualizar colunas')
      throw error
    }
  }

  const createColumn = async (column: Omit<LeadColumn, 'id'>) => {
    try {
      const newColumn = await leadsService.createColumn(column)
      setColumns((prev) => [...prev, newColumn].sort((a, b) => a.order - b.order))
      toast.success('Coluna criada')
    } catch (error) {
      toast.error('Erro ao criar coluna')
      throw error
    }
  }

  const updateColumn = async (id: string, updates: Partial<LeadColumn>) => {
    try {
      const updated = await leadsService.updateColumn(id, updates)
      setColumns((prev) =>
        prev.map((col) => (col.id === id ? updated : col)).sort((a, b) => a.order - b.order)
      )
      toast.success('Coluna atualizada')
    } catch (error) {
      toast.error('Erro ao atualizar coluna')
      throw error
    }
  }

  const deleteColumn = async (id: string) => {
    try {
      await leadsService.deleteColumn(id)
      setColumns((prev) => prev.filter((col) => col.id !== id))
      await fetchLeads()
      toast.success('Coluna excluída')
    } catch (error) {
      toast.error('Erro ao excluir coluna')
      throw error
    }
  }

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === '' ||
        lead.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.telefone.includes(searchQuery) ||
        lead.localizacao.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => lead.tags.includes(tag))

      const matchesFontes = selectedFontes.length === 0 || selectedFontes.includes(lead.fonte)

      return matchesSearch && matchesTags && matchesFontes
    })
  }, [leads, searchQuery, selectedTags, selectedFontes])

  const handleSetCompactView = (compact: boolean) => {
    setCompactView(compact)
    localStorage.setItem('leads_compact_view', JSON.stringify(compact))
  }

  return (
    <LeadsContext
      value={{
        leads,
        columns,
        isLoading,
        open,
        setOpen,
        currentLead,
        setCurrentLead,
        viewMode,
        setViewMode,
        compactView,
        setCompactView: handleSetCompactView,
        searchQuery,
        setSearchQuery,
        selectedTags,
        setSelectedTags,
        selectedFontes,
        setSelectedFontes,
        fetchLeads,
        fetchColumns,
        createLead,
        updateLead,
        deleteLead,
        moveLeadToColumn,
        addAtividade,
        importLeads,
        updateColumns,
        createColumn,
        updateColumn,
        deleteColumn,
        filteredLeads,
      }}
    >
      {children}
    </LeadsContext>
  )
}

export const useLeads = () => {
  const leadsContext = React.useContext(LeadsContext)

  if (!leadsContext) {
    throw new Error('useLeads has to be used within <LeadsProvider>')
  }

  return leadsContext
}

