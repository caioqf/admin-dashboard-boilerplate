'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Search, Filter, Grid } from 'lucide-react'
import { useLocale } from '@/context/locale-context'

import { PropertyCard } from './components/property-card'
import { PropertyMap } from './components/property-map'
import { FilterPanel } from './components/filter-panel'
import { properties } from './data/properties'
import { Property, PropertyFilters } from './types'

export default function RealEstate() {
  const { t } = useLocale()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('date_desc')
  const [filters, setFilters] = useState<PropertyFilters>({
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

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter(property => {
      // Search filter
      if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !property.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !property.location.city.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Price range filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type)) {
        return false
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(property.status)) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms > 0 && (property.details.bedrooms || 0) < filters.bedrooms) {
        return false
      }

      // Bathrooms filter
      if (filters.bathrooms > 0 && (property.details.bathrooms || 0) < filters.bathrooms) {
        return false
      }

      // Area filter
      if (property.details.area < filters.minArea || property.details.area > filters.maxArea) {
        return false
      }

      // Priority filter
      if (filters.priority !== 'all' && property.priority !== filters.priority) {
        return false
      }

      return true
    })

    // Sort by priority and date
    return filtered.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const aPriority = priorityOrder[a.priority]
      const bPriority = priorityOrder[b.priority]
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority
      }
      
      return new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime()
    })
  }, [searchQuery, filters])

  // Statistics
  const stats = useMemo(() => {
    const available = properties.filter(p => p.status === 'available').length
    const sold = properties.filter(p => p.status === 'sold').length
    const reserved = properties.filter(p => p.status === 'reserved').length
    const totalValue = properties.reduce((sum, p) => sum + p.price, 0)

    return {
      total: properties.length,
      available,
      sold,
      reserved,
      totalValue,
      averagePrice: totalValue / properties.length
    }
  }, [])

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('real_estate.title')}</h2>
          <p className="text-muted-foreground">{t('real_estate.subtitle')}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t('real_estate.add_property')}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('real_estate.stats.total_properties')}
            </CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('real_estate.stats.available_properties')}
            </CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.available}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.available / stats.total) * 100).toFixed(1)}% do portfólio
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('real_estate.stats.sold_properties')}
            </CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sold}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.sold / stats.total) * 100).toFixed(1)}% vendidos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('real_estate.stats.total_value')}
            </CardTitle>
            <Grid className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(stats.totalValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Média: R$ {(stats.averagePrice / 1000).toFixed(0)}k
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('real_estate.search_properties')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {t('real_estate.filters')}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('real_estate.sort_by')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">{t('real_estate.sort_date_desc')}</SelectItem>
              <SelectItem value="date_asc">{t('real_estate.sort_date_asc')}</SelectItem>
              <SelectItem value="price_desc">{t('real_estate.sort_price_desc')}</SelectItem>
              <SelectItem value="price_asc">{t('real_estate.sort_price_asc')}</SelectItem>
              <SelectItem value="area_desc">{t('real_estate.sort_area_desc')}</SelectItem>
              <SelectItem value="area_asc">{t('real_estate.sort_area_asc')}</SelectItem>
              <SelectItem value="priority">{t('real_estate.sort_priority')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          propertiesCount={filteredProperties.length}
        />
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredProperties.length} {t('real_estate.properties_found')}
        </p>
      </div>

      {/* Two Column Layout: Properties List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
        {/* Left Column - Properties List */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Grid className="w-5 h-5 mr-2" />
                {t('real_estate.properties')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[700px] overflow-y-auto p-4 space-y-4">
                {filteredProperties.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <Grid className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t('real_estate.no_properties')}</h3>
                    <p className="text-muted-foreground text-center">
                      Tente ajustar os filtros ou adicionar uma nova propriedade.
                    </p>
                  </div>
                ) : (
                  filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSelect={handlePropertySelect}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Map */}
        <div className="space-y-4">
          <PropertyMap
            properties={filteredProperties}
            selectedProperty={selectedProperty || undefined}
            onPropertySelect={handlePropertySelect}
            className="h-full"
          />
        </div>
      </div>
    </div>
  )
} 