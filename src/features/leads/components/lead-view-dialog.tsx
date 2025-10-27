import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLeads } from '../context/leads-context'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconCurrencyReal,
  IconCalendar,
  IconNote,
  IconPhoneCall,
  IconUsers,
  IconEdit,
} from '@tabler/icons-react'
import { useState } from 'react'

export function LeadViewDialog() {
  const { open, setOpen, currentLead, addAtividade } = useLeads()
  const [novaAtividade, setNovaAtividade] = useState('')
  const [tipoAtividade, setTipoAtividade] = useState<'nota' | 'email' | 'ligacao' | 'reuniao'>('nota')

  if (!currentLead) return null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleAddAtividade = async () => {
    if (novaAtividade.trim()) {
      await addAtividade(currentLead.id, {
        tipo: tipoAtividade,
        descricao: novaAtividade,
      })
      setNovaAtividade('')
      setTipoAtividade('nota')
    }
  }

  const getAtividadeIcon = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return <IconMail className="h-4 w-4" />
      case 'ligacao':
        return <IconPhoneCall className="h-4 w-4" />
      case 'reuniao':
        return <IconUsers className="h-4 w-4" />
      case 'status_change':
        return <IconEdit className="h-4 w-4" />
      default:
        return <IconNote className="h-4 w-4" />
    }
  }

  const getAtividadeLabel = (tipo: string) => {
    switch (tipo) {
      case 'email':
        return 'Email'
      case 'ligacao':
        return 'Ligação'
      case 'reuniao':
        return 'Reunião'
      case 'status_change':
        return 'Mudança de Status'
      default:
        return 'Nota'
    }
  }

  return (
    <Dialog open={open === 'view'} onOpenChange={(isOpen) => !isOpen && setOpen(null)}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{currentLead.nome}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconMail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <p className="font-medium">{currentLead.email}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconPhone className="h-4 w-4" />
                    <span>Telefone</span>
                  </div>
                  <p className="font-medium">{currentLead.telefone}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconMapPin className="h-4 w-4" />
                    <span>Localização</span>
                  </div>
                  <p className="font-medium">{currentLead.localizacao}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <IconCurrencyReal className="h-4 w-4" />
                    <span>Valor Estimado</span>
                  </div>
                  <p className="font-medium text-lg">{formatCurrency(currentLead.valorEstimado)}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fonte</Label>
                <p className="font-medium capitalize">{currentLead.fonte}</p>
              </div>

              {currentLead.categoria && (
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <p className="font-medium capitalize">{currentLead.categoria.replace('_', ' ')}</p>
                </div>
              )}

              {currentLead.tags.length > 0 && (
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {currentLead.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <IconCalendar className="h-4 w-4" />
                  <span>Criado: {formatDate(currentLead.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <IconCalendar className="h-4 w-4" />
                  <span>Atualizado: {formatDate(currentLead.updatedAt)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Histórico de Atividades</h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-[1fr_auto] gap-2">
                    <Input
                      placeholder="Adicionar nova atividade..."
                      value={novaAtividade}
                      onChange={(e) => setNovaAtividade(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddAtividade()}
                    />
                    <Select value={tipoAtividade} onValueChange={(v: any) => setTipoAtividade(v)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nota">Nota</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="ligacao">Ligação</SelectItem>
                        <SelectItem value="reuniao">Reunião</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddAtividade} className="w-full" variant="outline">
                    Adicionar Atividade
                  </Button>
                </div>

                <div className="space-y-3">
                  {currentLead.atividades
                    .slice()
                    .reverse()
                    .map((atividade) => (
                      <div
                        key={atividade.id}
                        className="flex gap-3 p-3 rounded-lg border bg-muted/30"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getAtividadeIcon(atividade.tipo)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {getAtividadeLabel(atividade.tipo)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(atividade.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm">{atividade.descricao}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

