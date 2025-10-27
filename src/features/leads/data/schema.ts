import { z } from 'zod'

export const leadSchema = z.object({
  id: z.string(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
  valorEstimado: z.number().min(0, 'Valor deve ser positivo'),
  fonte: z.string().min(1, 'Fonte é obrigatória'),
  status: z.string(),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
  tags: z.array(z.string()).default([]),
  categoria: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  atividades: z.array(z.object({
    id: z.string(),
    tipo: z.enum(['nota', 'email', 'ligacao', 'reuniao', 'status_change']),
    descricao: z.string(),
    createdAt: z.string(),
  })).default([]),
})

export const columnSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Título é obrigatório'),
  order: z.number(),
  color: z.string().optional(),
})

export const leadsSettingsSchema = z.object({
  compactView: z.boolean().default(false),
})

export type Lead = z.infer<typeof leadSchema>
export type LeadColumn = z.infer<typeof columnSchema>
export type LeadsSettings = z.infer<typeof leadsSettingsSchema>
export type Atividade = Lead['atividades'][0]

export const fontes = [
  { value: 'website', label: 'Website' },
  { value: 'indicacao', label: 'Indicação' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google Ads' },
  { value: 'evento', label: 'Evento' },
  { value: 'outro', label: 'Outro' },
] as const

export const categorias = [
  { value: 'pequena_empresa', label: 'Pequena Empresa' },
  { value: 'media_empresa', label: 'Média Empresa' },
  { value: 'grande_empresa', label: 'Grande Empresa' },
  { value: 'pessoa_fisica', label: 'Pessoa Física' },
] as const

export const defaultColumns: LeadColumn[] = [
  { id: 'novo', title: 'Novo', order: 0, color: '#3b82f6' },
  { id: 'contato_feito', title: 'Contato Feito', order: 1, color: '#8b5cf6' },
  { id: 'qualificado', title: 'Qualificado', order: 2, color: '#06b6d4' },
  { id: 'proposta_enviada', title: 'Proposta Enviada', order: 3, color: '#f59e0b' },
  { id: 'negociacao', title: 'Negociação', order: 4, color: '#f97316' },
  { id: 'ganho', title: 'Ganho', order: 5, color: '#10b981' },
  { id: 'perdido', title: 'Perdido', order: 6, color: '#ef4444' },
]

