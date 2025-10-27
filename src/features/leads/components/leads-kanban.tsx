import { useLeads } from '../context/leads-context'
import { LeadCard } from './lead-card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IconPlus, IconSettings } from '@tabler/icons-react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
  DragOverEvent,
} from '@dnd-kit/core'
import { 
  SortableContext, 
  verticalListSortingStrategy, 
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useState, useMemo } from 'react'
import { Lead, LeadColumn } from '../data/schema'

interface SortableColumnProps {
  column: LeadColumn
  columnLeads: Lead[]
  total: number
  formatCurrency: (value: number) => string
  isOverColumn: boolean
  activeLead: Lead | null
}

function SortableColumn({ column, columnLeads, total, formatCurrency, isOverColumn, activeLead }: SortableColumnProps) {
  const { setOpen, compactView } = useLeads()
  
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.id}`,
    data: { type: 'column', column },
  })

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
    data: { type: 'column-drop', column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setSortableRef}
      style={style}
      className="flex-shrink-0 w-80 flex flex-col"
    >
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color || '#94a3b8' }}
            />
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {columnLeads.length}
            </Badge>
          </div>
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          Total: {formatCurrency(total)}
        </div>
      </div>

      <ScrollArea
        className="flex-1 rounded-lg border bg-muted/30"
        style={{ height: 'calc(100vh - 300px)' }}
      >
        <SortableContext
          items={columnLeads.map((lead) => lead.id)}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setDroppableRef}
            data-column-id={column.id}
            className={`flex-1 space-y-3 transition-colors p-2 rounded-lg ${
              isOver ? 'bg-primary/5' : ''
            }`}
          >
            {columnLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
            {isOverColumn && activeLead && (
              <div className={`border-2 border-dashed border-primary rounded-lg ${
                compactView ? 'h-16' : 'h-32'
              } flex items-center justify-center bg-primary/5`}>
                <p className="text-sm text-muted-foreground">Solte aqui</p>
              </div>
            )}
            {columnLeads.length === 0 && !isOverColumn && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <IconPlus className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">Nenhum lead</p>
              </div>
            )}
          </div>
        </SortableContext>
      </ScrollArea>
    </div>
  )
}

export function LeadsKanban() {
  const { columns, filteredLeads, moveLeadToColumn, setOpen, compactView, updateColumns } = useLeads()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<'lead' | 'column' | null>(null)
  const [localColumns, setLocalColumns] = useState(columns)
  const [overId, setOverId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  React.useEffect(() => {
    setLocalColumns(columns)
  }, [columns])

  const leadsByColumn = useMemo(() => {
    const grouped: Record<string, Lead[]> = {}
    localColumns.forEach((col) => {
      grouped[col.id] = filteredLeads.filter((lead) => lead.status === col.id)
    })
    return grouped
  }, [localColumns, filteredLeads])

  const activeLead = useMemo(() => {
    if (!activeId) return null
    return filteredLeads.find((lead) => lead.id === activeId)
  }, [activeId, filteredLeads])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeData = active.data.current
    
    if (activeData?.type === 'column') {
      setActiveType('column')
      setActiveId(active.id as string)
    } else {
      setActiveType('lead')
      setActiveId(active.id as string)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    
    if (!over) {
      setOverId(null)
      return
    }

    setOverId(over.id as string)

    const activeData = active.data.current
    const overData = over.data.current

    if (activeData?.type === 'column' && overData?.type === 'column') {
      const activeIndex = localColumns.findIndex((col) => `column-${col.id}` === active.id)
      const overIndex = localColumns.findIndex((col) => `column-${col.id}` === over.id)

      if (activeIndex !== overIndex) {
        setLocalColumns((cols) => arrayMove(cols, activeIndex, overIndex))
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveType(null)
    setOverId(null)

    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (activeData?.type === 'column') {
      const activeIndex = localColumns.findIndex((col) => `column-${col.id}` === active.id)
      const overIndex = localColumns.findIndex((col) => `column-${col.id}` === over.id)

      if (activeIndex !== overIndex) {
        const reordered = arrayMove(localColumns, activeIndex, overIndex)
        const withUpdatedOrder = reordered.map((col, index) => ({ ...col, order: index }))
        updateColumns(withUpdatedOrder)
      }
      return
    }

    const leadId = active.id as string
    const overId = over.id as string

    const overColumn = localColumns.find((col) => col.id === overId)
    if (overColumn) {
      moveLeadToColumn(leadId, overColumn.id)
      return
    }

    const overLead = filteredLeads.find((lead) => lead.id === overId)
    if (overLead) {
      moveLeadToColumn(leadId, overLead.status)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getColumnTotal = (columnId: string) => {
    return leadsByColumn[columnId]?.reduce((sum, lead) => sum + lead.valorEstimado, 0) || 0
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Pipeline de Vendas</h2>
          <Badge variant="outline">{filteredLeads.length} leads</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen('column-settings')}
        >
          <IconSettings className="h-4 w-4 mr-2" />
          Gerenciar Colunas
        </Button>
      </div>

      <ScrollArea className="w-full">
        <SortableContext
          items={localColumns.map((col) => `column-${col.id}`)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 pb-4">
            {localColumns.map((column) => {
              const columnLeads = leadsByColumn[column.id] || []
              const total = getColumnTotal(column.id)
              const isOverThisColumn = activeType === 'lead' && (
                overId === column.id || 
                columnLeads.some(lead => lead.id === overId)
              )

              return (
                <SortableColumn
                  key={column.id}
                  column={column}
                  columnLeads={columnLeads}
                  total={total}
                  formatCurrency={formatCurrency}
                  isOverColumn={isOverThisColumn}
                  activeLead={activeLead}
                />
              )
            })}
          </div>
        </SortableContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DragOverlay>
        {activeType === 'lead' && activeLead ? (
          <div className={`rotate-3 opacity-90 ${compactView ? 'scale-95' : ''}`}>
            <LeadCard lead={activeLead} />
          </div>
        ) : activeType === 'column' && activeId ? (
          <div className="rotate-2 opacity-80 w-80">
            {(() => {
              const column = localColumns.find((col) => `column-${col.id}` === activeId)
              if (!column) return null
              const columnLeads = leadsByColumn[column.id] || []
              const total = getColumnTotal(column.id)
              
              return (
                <div className="bg-background border-2 border-primary rounded-lg p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: column.color || '#94a3b8' }}
                    />
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {columnLeads.length}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total: {formatCurrency(total)}
                  </div>
                </div>
              )
            })()}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

