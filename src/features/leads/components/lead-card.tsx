import { Lead } from '../data/schema'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDots, IconEdit, IconEye, IconTrash, IconMail, IconPhone, IconMapPin, IconCurrencyReal, IconBrandWhatsapp, IconGripVertical } from '@tabler/icons-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useLeads } from '../context/leads-context'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface LeadCardProps {
  lead: Lead
}

export function LeadCard({ lead }: LeadCardProps) {
  const { setCurrentLead, setOpen, compactView } = useLeads()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: { lead },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const handleView = () => {
    setCurrentLead(lead)
    setOpen('view')
  }

  const handleEdit = () => {
    setCurrentLead(lead)
    setOpen('update')
  }

  const handleDelete = () => {
    setCurrentLead(lead)
    setOpen('delete')
  }

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation()
    const phone = lead.telefone.replace(/\D/g, '')
    window.open(`https://wa.me/55${phone}`, '_blank')
  }

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `tel:${lead.telefone}`
  }

  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `mailto:${lead.email}`
  }

  if (compactView) {
    return (
      <Card
        ref={setNodeRef}
        style={style}
        className="hover:shadow-md transition-shadow"
      >
        <CardContent className="p-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing hover:bg-muted/50 rounded p-1 -ml-1 transition-colors"
              >
                <IconGripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(lead.nome)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{lead.nome}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium">{formatCurrency(lead.valorEstimado)}</span>
                  {lead.tags.length > 0 && (
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {lead.tags[0]}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-1 pt-1 border-t" onPointerDown={(e) => e.stopPropagation()}>
              <TooltipProvider delayDuration={0}>
                {lead.telefone && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0"
                          onClick={handleWhatsApp}
                        >
                          <IconBrandWhatsapp className="h-3.5 w-3.5 text-green-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>WhatsApp</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 flex-shrink-0"
                          onClick={handleCall}
                        >
                          <IconPhone className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Ligar</TooltipContent>
                    </Tooltip>
                  </>
                )}
                {lead.email && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 flex-shrink-0"
                        onClick={handleEmail}
                      >
                        <IconMail className="h-3.5 w-3.5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Email</TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 flex-shrink-0"
                  >
                    <IconDots className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleView}>
                    <IconEye className="mr-2 h-4 w-4" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEdit}>
                    <IconEdit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <IconTrash className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="hover:shadow-md transition-shadow"
    >
      <CardHeader className="p-4 pb-3">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing hover:bg-muted/50 rounded p-1 -ml-1 transition-colors mt-0.5"
            >
              <IconGripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-start justify-between gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="text-sm font-medium">
                    {getInitials(lead.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{lead.nome}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <IconMail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-1 pt-1 border-t" onPointerDown={(e) => e.stopPropagation()}>
            <TooltipProvider delayDuration={0}>
              {lead.telefone && (
                <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={handleWhatsApp}
                        >
                          <IconBrandWhatsapp className="h-4 w-4 text-green-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>WhatsApp</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 flex-shrink-0"
                          onClick={handleCall}
                        >
                          <IconPhone className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Ligar</TooltipContent>
                    </Tooltip>
                </>
              )}
              {lead.email && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={handleEmail}
                    >
                      <IconMail className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Email</TooltipContent>
                </Tooltip>
              )}
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                >
                  <IconDots className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleView}>
                  <IconEye className="mr-2 h-4 w-4" />
                  Visualizar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEdit}>
                  <IconEdit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <IconTrash className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconPhone className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{lead.telefone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconMapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{lead.localizacao}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-sm">
            <IconCurrencyReal className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{formatCurrency(lead.valorEstimado)}</span>
          </div>
        </div>

        {lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {lead.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
            {lead.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0">
                +{lead.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
          <span className="capitalize">{lead.fonte}</span>
          <span>{new Date(lead.updatedAt).toLocaleDateString('pt-BR')}</span>
        </div>
      </CardContent>
    </Card>
  )
}

