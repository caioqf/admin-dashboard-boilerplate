import { useState } from 'react'
import { Calendar, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRange {
  from: Date
  to: Date
}

interface DatePickerWithRangeProps {
  date?: DateRange
  onDateChange?: (date: DateRange | undefined) => void
  placeholder?: string
  className?: string
}

export function DatePickerWithRange({
  date,
  onDateChange,
  placeholder = "Selecione as datas",
  className
}: DatePickerWithRangeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleCheckInChange = (value: string) => {
    setCheckIn(value)
    if (value && checkOut) {
      const checkInDate = new Date(value)
      const checkOutDate = new Date(checkOut)
      if (checkInDate && checkOutDate) {
        onDateChange?.({ from: checkInDate, to: checkOutDate })
      }
    }
  }

  const handleCheckOutChange = (value: string) => {
    setCheckOut(value)
    if (checkIn && value) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(value)
      if (checkInDate && checkOutDate) {
        onDateChange?.({ from: checkInDate, to: checkOutDate })
      }
    }
  }

  const displayText = date 
    ? `${formatDate(date.from)} - ${formatDate(date.to)}`
    : placeholder

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {displayText}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-in</label>
            <Input
              type="date"
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-out</label>
            <Input
              type="date"
              value={checkOut}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              min={checkIn || undefined}
              className="w-full"
            />
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full"
            size="sm"
          >
            Confirmar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
} 