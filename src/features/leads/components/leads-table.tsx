import { useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLeads } from '../context/leads-context'
import { IconDots, IconEdit, IconEye, IconTrash } from '@tabler/icons-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function LeadsTable() {
  const { filteredLeads, columns, setCurrentLead, setOpen } = useLeads()

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

  const getColumnTitle = (statusId: string) => {
    return columns.find((col) => col.id === statusId)?.title || statusId
  }

  const getColumnColor = (statusId: string) => {
    return columns.find((col) => col.id === statusId)?.color || '#94a3b8'
  }

  const handleView = (lead: any) => {
    setCurrentLead(lead)
    setOpen('view')
  }

  const handleEdit = (lead: any) => {
    setCurrentLead(lead)
    setOpen('update')
  }

  const handleDelete = (lead: any) => {
    setCurrentLead(lead)
    setOpen('delete')
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lead</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Fonte</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                Nenhum lead encontrado
              </TableCell>
            </TableRow>
          ) : (
            filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getInitials(lead.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{lead.nome}</div>
                      {lead.categoria && (
                        <div className="text-xs text-muted-foreground capitalize">
                          {lead.categoria.replace('_', ' ')}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{lead.email}</div>
                    <div className="text-xs text-muted-foreground">{lead.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{lead.localizacao}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{formatCurrency(lead.valorEstimado)}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    style={{
                      borderColor: getColumnColor(lead.status),
                      color: getColumnColor(lead.status),
                    }}
                  >
                    {getColumnTitle(lead.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">{lead.fonte}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {lead.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {lead.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{lead.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <IconDots className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleView(lead)}>
                        <IconEye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(lead)}>
                        <IconEdit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(lead)}
                        className="text-destructive"
                      >
                        <IconTrash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

