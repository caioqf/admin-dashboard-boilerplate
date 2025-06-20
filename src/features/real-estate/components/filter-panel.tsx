import React from 'react'
import { Building2, Home, MapPin, X, Wifi, Waves, Car, Dumbbell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLocale } from '@/context/locale-context'
import { PropertyFilters } from '../types'

interface FilterPanelProps {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
  className?: string
  propertiesCount?: number
}

export function FilterPanel({ filters, onFiltersChange, className }: FilterPanelProps) {
  const { t } = useLocale()

  const propertyTypes = [
    { value: 'apartment', label: t('real_estate.type.apartment'), icon: Building2 },
    { value: 'house', label: t('real_estate.type.house'), icon: Home },
    { value: 'penthouse', label: t('real_estate.type.penthouse'), icon: Building2 },
    { value: 'commercial', label: t('real_estate.type.commercial'), icon: Building2 },
    { value: 'land', label: t('real_estate.type.land'), icon: MapPin },
    { value: 'office', label: t('real_estate.type.office'), icon: Building2 },
  ] as const

  const propertyStatuses = [
    { value: 'available', label: t('real_estate.status.available') },
    { value: 'sold', label: t('real_estate.status.sold') },
    { value: 'reserved', label: t('real_estate.status.reserved') },
    { value: 'under_construction', label: t('real_estate.status.under_construction') },
    { value: 'pre_launch', label: t('real_estate.status.pre_launch') },
    { value: 'suspended', label: t('real_estate.status.suspended') },
  ] as const

  const priorityLevels = [
    { value: 'high', label: t('real_estate.priority.high') },
    { value: 'medium', label: t('real_estate.priority.medium') },
    { value: 'low', label: t('real_estate.priority.low') },
  ] as const

  const commonAmenities = [
    { value: 'WiFi', label: 'WiFi', icon: Wifi },
    { value: 'Ar Condicionado', label: 'Ar Condicionado', icon: Waves },
    { value: 'Estacionamento', label: 'Estacionamento', icon: Car },
    { value: 'Academia', label: 'Academia', icon: Dumbbell },
    { value: 'Piscina', label: 'Piscina', icon: Waves },
    { value: 'Vista para o Mar', label: 'Vista para o Mar', icon: Waves },
  ]

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    onFiltersChange({ ...filters, ...newFilters })
  }

  const handleReset = () => {
    onFiltersChange({
      priceRange: [0, 10000000],
      propertyTypes: [],
      status: [],
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
      minArea: 0,
      maxArea: 1000,
      agents: [],
      priority: 'all',
      dateRange: {}
    })
  }

  const hasActiveFilters = 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 10000000 ||
    filters.propertyTypes.length > 0 ||
    filters.status.length > 0 ||
    filters.bedrooms > 0 ||
    filters.bathrooms > 0 ||
    filters.amenities.length > 0 ||
    filters.minArea > 0 ||
    filters.maxArea < 1000 ||
    filters.priority !== 'all'

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.price_range')}</Label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={10000000}
            min={0}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>R$ {(filters.priceRange[0] / 1000).toLocaleString('pt-BR')}k</span>
            <span>R$ {(filters.priceRange[1] / 1000).toLocaleString('pt-BR')}k</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Property Types */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.property_type')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => {
            const Icon = type.icon
            const isSelected = filters.propertyTypes.includes(type.value)
            
            return (
              <Button
                key={type.value}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="justify-start h-auto p-3"
                onClick={() => {
                  const newTypes = isSelected
                    ? filters.propertyTypes.filter(t => t !== type.value)
                    : [...filters.propertyTypes, type.value]
                  updateFilters({ propertyTypes: newTypes })
                }}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-xs">{type.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Property Status */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.property_status')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {propertyStatuses.map((status) => {
            const isSelected = filters.status.includes(status.value)
            
            return (
              <Button
                key={status.value}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className="justify-start h-auto p-2"
                onClick={() => {
                  const newStatuses = isSelected
                    ? filters.status.filter(s => s !== status.value)
                    : [...filters.status, status.value]
                  updateFilters({ status: newStatuses })
                }}
              >
                <span className="text-xs">{status.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      <Separator />

      {/* Priority */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Prioridade</Label>
        <Select 
          value={filters.priority} 
          onValueChange={(value) => updateFilters({ priority: value as PropertyFilters['priority'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecionar prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('real_estate.priority.all')}</SelectItem>
            {priorityLevels.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Area Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Área (m²)</Label>
        <div className="px-2">
          <Slider
            value={[filters.minArea, filters.maxArea]}
            onValueChange={(value) => updateFilters({ minArea: value[0], maxArea: value[1] })}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{filters.minArea}m²</span>
            <span>{filters.maxArea}m²</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.bedrooms')}</Label>
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.bedrooms === num ? "default" : "outline"}
              size="sm"
              className="w-12 h-10"
              onClick={() => updateFilters({ bedrooms: num })}
            >
              {num === 0 ? 'Todos' : num}
            </Button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.bathrooms')}</Label>
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map((num) => (
            <Button
              key={num}
              variant={filters.bathrooms === num ? "default" : "outline"}
              size="sm"
              className="w-12 h-10"
              onClick={() => updateFilters({ bathrooms: num })}
            >
              {num === 0 ? 'Todos' : num}
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">{t('real_estate.amenities')}</Label>
        <div className="grid grid-cols-1 gap-2">
          {commonAmenities.map((amenity) => {
            const Icon = amenity.icon
            const isSelected = filters.amenities.includes(amenity.value)
            
            return (
              <div key={amenity.value} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity.value}
                  checked={isSelected}
                  onCheckedChange={(checked) => {
                    const newAmenities = checked
                      ? [...filters.amenities, amenity.value]
                      : filters.amenities.filter(a => a !== amenity.value)
                    updateFilters({ amenities: newAmenities })
                  }}
                />
                <Label
                  htmlFor={amenity.value}
                  className="flex items-center space-x-2 text-sm font-normal cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  <span>{amenity.label}</span>
                </Label>
              </div>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          {t('real_estate.clear_filters')}
        </Button>
      )}
    </div>
  )

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{t('real_estate.filters')}</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="text-xs">
              Filtros ativos
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  )
} 