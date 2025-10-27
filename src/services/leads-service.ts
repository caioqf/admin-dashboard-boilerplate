import { Lead, LeadColumn, defaultColumns } from '@/features/leads/data/schema'
import { mockLeads } from '@/features/leads/data/mock-leads'

const STORAGE_KEYS = {
  LEADS: 'leads_data',
  COLUMNS: 'leads_columns',
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const getStoredLeads = (): Lead[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.LEADS)
  return stored ? JSON.parse(stored) : mockLeads
}

const getStoredColumns = (): LeadColumn[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.COLUMNS)
  return stored ? JSON.parse(stored) : defaultColumns
}

const saveLeads = (leads: Lead[]) => {
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads))
}

const saveColumns = (columns: LeadColumn[]) => {
  localStorage.setItem(STORAGE_KEYS.COLUMNS, JSON.stringify(columns))
}

export const leadsService = {
  async fetchLeads(): Promise<Lead[]> {
    await delay(300)
    return getStoredLeads()
  },

  async fetchLeadById(id: string): Promise<Lead | null> {
    await delay(200)
    const leads = getStoredLeads()
    return leads.find((lead) => lead.id === id) || null
  },

  async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>): Promise<Lead> {
    await delay(400)
    const leads = getStoredLeads()
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      atividades: [
        {
          id: crypto.randomUUID(),
          tipo: 'nota',
          descricao: 'Lead criado',
          createdAt: new Date().toISOString(),
        },
      ],
    }
    leads.push(newLead)
    saveLeads(leads)
    return newLead
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    await delay(400)
    const leads = getStoredLeads()
    const index = leads.findIndex((lead) => lead.id === id)
    
    if (index === -1) {
      throw new Error('Lead não encontrado')
    }

    const oldLead = leads[index]
    const updatedLead: Lead = {
      ...oldLead,
      ...updates,
      id: oldLead.id,
      createdAt: oldLead.createdAt,
      updatedAt: new Date().toISOString(),
    }

    if (oldLead.status !== updatedLead.status) {
      updatedLead.atividades = [
        ...updatedLead.atividades,
        {
          id: crypto.randomUUID(),
          tipo: 'status_change',
          descricao: `Status alterado de "${oldLead.status}" para "${updatedLead.status}"`,
          createdAt: new Date().toISOString(),
        },
      ]
    }

    leads[index] = updatedLead
    saveLeads(leads)
    return updatedLead
  },

  async deleteLead(id: string): Promise<void> {
    await delay(300)
    const leads = getStoredLeads()
    const filtered = leads.filter((lead) => lead.id !== id)
    saveLeads(filtered)
  },

  async addAtividade(leadId: string, atividade: Omit<Lead['atividades'][0], 'id' | 'createdAt'>): Promise<Lead> {
    await delay(300)
    const leads = getStoredLeads()
    const index = leads.findIndex((lead) => lead.id === leadId)
    
    if (index === -1) {
      throw new Error('Lead não encontrado')
    }

    const newAtividade = {
      ...atividade,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    leads[index].atividades.push(newAtividade)
    leads[index].updatedAt = new Date().toISOString()
    saveLeads(leads)
    return leads[index]
  },

  async importLeads(leads: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'atividades'>[]): Promise<Lead[]> {
    await delay(800)
    const existingLeads = getStoredLeads()
    const newLeads: Lead[] = leads.map((lead) => ({
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      atividades: [
        {
          id: crypto.randomUUID(),
          tipo: 'nota',
          descricao: 'Lead importado',
          createdAt: new Date().toISOString(),
        },
      ],
    }))
    
    const allLeads = [...existingLeads, ...newLeads]
    saveLeads(allLeads)
    return newLeads
  },

  async fetchColumns(): Promise<LeadColumn[]> {
    await delay(200)
    return getStoredColumns()
  },

  async updateColumns(columns: LeadColumn[]): Promise<LeadColumn[]> {
    await delay(300)
    if (columns.length > 10) {
      throw new Error('Máximo de 10 colunas permitidas')
    }
    saveColumns(columns)
    return columns
  },

  async createColumn(column: Omit<LeadColumn, 'id'>): Promise<LeadColumn> {
    await delay(300)
    const columns = getStoredColumns()
    
    if (columns.length >= 10) {
      throw new Error('Máximo de 10 colunas atingido')
    }

    const newColumn: LeadColumn = {
      ...column,
      id: crypto.randomUUID(),
    }
    
    columns.push(newColumn)
    saveColumns(columns)
    return newColumn
  },

  async updateColumn(id: string, updates: Partial<LeadColumn>): Promise<LeadColumn> {
    await delay(300)
    const columns = getStoredColumns()
    const index = columns.findIndex((col) => col.id === id)
    
    if (index === -1) {
      throw new Error('Coluna não encontrada')
    }

    columns[index] = { ...columns[index], ...updates }
    saveColumns(columns)
    return columns[index]
  },

  async deleteColumn(id: string): Promise<void> {
    await delay(300)
    const columns = getStoredColumns()
    const filtered = columns.filter((col) => col.id !== id)
    saveColumns(filtered)

    const leads = getStoredLeads()
    const updatedLeads = leads.map((lead) => {
      if (lead.status === id) {
        return { ...lead, status: filtered[0]?.id || 'novo' }
      }
      return lead
    })
    saveLeads(updatedLeads)
  },

  async resetData(): Promise<void> {
    await delay(200)
    localStorage.removeItem(STORAGE_KEYS.LEADS)
    localStorage.removeItem(STORAGE_KEYS.COLUMNS)
  },
}

