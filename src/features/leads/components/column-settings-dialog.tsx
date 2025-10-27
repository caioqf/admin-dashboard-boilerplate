import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useLeads } from '../context/leads-context'
import { LeadColumn } from '../data/schema'
import { IconGripVertical, IconTrash, IconPlus, IconX } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableColumnItemProps {
  column: LeadColumn
  onUpdate: (id: string, updates: Partial<LeadColumn>) => void
  onDelete: (id: string) => void
  canDelete: boolean
}

function SortableColumnItem({ column, onUpdate, onDelete, canDelete }: SortableColumnItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 border rounded-lg bg-background"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <IconGripVertical className="h-5 w-5" />
      </div>

      <div className="flex-1 grid grid-cols-[1fr_100px] gap-3">
        <div>
          <Input
            value={column.title}
            onChange={(e) => onUpdate(column.id, { title: e.target.value })}
            placeholder="Nome da coluna"
          />
        </div>
        <div>
          <Input
            type="color"
            value={column.color || '#94a3b8'}
            onChange={(e) => onUpdate(column.id, { color: e.target.value })}
            className="h-10 cursor-pointer"
          />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(column.id)}
        disabled={!canDelete}
        className="text-destructive hover:text-destructive disabled:opacity-50"
      >
        <IconTrash className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function ColumnSettingsDialog() {
  const { open, setOpen, columns, updateColumns, deleteColumn, compactView, setCompactView } = useLeads()
  const [localColumns, setLocalColumns] = useState<LeadColumn[]>(columns)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setLocalColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const reordered = arrayMove(items, oldIndex, newIndex)
        return reordered.map((col, index) => ({ ...col, order: index }))
      })
    }
  }

  const handleUpdateColumn = (id: string, updates: Partial<LeadColumn>) => {
    setLocalColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, ...updates } : col))
    )
  }

  const handleDeleteColumn = async (id: string) => {
    if (localColumns.length <= 1) {
      return
    }
    await deleteColumn(id)
    setLocalColumns((prev) => prev.filter((col) => col.id !== id))
  }

  const handleAddColumn = () => {
    if (localColumns.length >= 10) {
      return
    }

    const newColumn: LeadColumn = {
      id: `col_${Date.now()}`,
      title: 'Nova Coluna',
      order: localColumns.length,
      color: '#94a3b8',
    }

    setLocalColumns((prev) => [...prev, newColumn])
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      await updateColumns(localColumns)
      setOpen(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    setLocalColumns(columns)
    setOpen(null)
  }

  return (
    <Dialog
      open={open === 'column-settings'}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Gerenciar Colunas</DialogTitle>
          <DialogDescription>
            Personalize as colunas do seu pipeline. Arraste para reordenar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
              <div className="space-y-0.5">
                <Label htmlFor="compact-view" className="text-base font-medium">
                  Visualização Compacta
                </Label>
                <p className="text-sm text-muted-foreground">
                  Exibir cards de leads mais finos e resumidos
                </p>
              </div>
              <Switch
                id="compact-view"
                checked={compactView}
                onCheckedChange={setCompactView}
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{localColumns.length} / 10 colunas</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddColumn}
              disabled={localColumns.length >= 10}
            >
              <IconPlus className="h-4 w-4 mr-2" />
              Adicionar Coluna
            </Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[40px_1fr_100px_40px] gap-3 px-3 text-xs font-medium text-muted-foreground">
              <div></div>
              <div>Nome</div>
              <div>Cor</div>
              <div></div>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={localColumns.map((col) => col.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {localColumns.map((column) => (
                    <SortableColumnItem
                      key={column.id}
                      column={column}
                      onUpdate={handleUpdateColumn}
                      onDelete={handleDeleteColumn}
                      canDelete={localColumns.length > 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

