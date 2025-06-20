import { useState, useEffect } from 'react'
import { MapPin, Maximize2, Minimize2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { type Property, type MapMarker } from '../types'
import { cn } from '@/lib/utils'

interface PropertyMapProps {
  properties: Property[]
  selectedProperty?: Property
  onPropertySelect?: (property: Property) => void
  className?: string
}

export function PropertyMap({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  className 
}: PropertyMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [_mapCenter, setMapCenter] = useState<[number, number]>([-22.9068, -43.1729])
  const [_zoom, setZoom] = useState(12)

  // Convert properties to map markers
  const markers: MapMarker[] = properties.map(property => ({
    id: property.id,
    position: [property.location.latitude, property.location.longitude],
    price: property.price,
    currency: property.currency,
    status: property.status,
    selected: selectedProperty?.id === property.id,
  }))

  // Update map center when selected property changes
  useEffect(() => {
    if (selectedProperty) {
      setMapCenter([selectedProperty.location.latitude, selectedProperty.location.longitude])
    }
  }, [selectedProperty])

  const handleMarkerClick = (markerId: string) => {
    const property = properties.find(p => p.id === markerId)
    if (property && onPropertySelect) {
      onPropertySelect(property)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 18))
  }

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 1))
  }

  // Simple map visualization using CSS Grid and positioning
  // In a real implementation, you would use Google Maps, Mapbox, or similar
  const MapVisualization = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden rounded-lg">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>

      {/* Rio de Janeiro Landmarks Simulation */}
      <div className="absolute inset-0">
        {/* Copacabana Beach */}
        <div className="absolute bottom-[20%] left-[30%] w-32 h-2 bg-yellow-300 rounded-full opacity-60" />
        {/* Ipanema Beach */}
        <div className="absolute bottom-[25%] left-[45%] w-28 h-2 bg-yellow-300 rounded-full opacity-60" />
        {/* Christ the Redeemer */}
        <div className="absolute top-[40%] right-[35%] w-2 h-2 bg-gray-600 rounded-full" />
        {/* Sugarloaf Mountain */}
        <div className="absolute bottom-[30%] left-[25%] w-3 h-3 bg-gray-500 rounded-full" />
      </div>

      {/* Property Markers */}
      {markers.map((marker, index) => {
        // Simple positioning based on lat/lng relative to Rio de Janeiro
        const [lat, lng] = marker.position
        const x = ((lng + 43.3647) / 0.4) * 100 // Normalize longitude
        const y = ((lat + 23.0045) / 0.1) * 100 // Normalize latitude
        
        return (
          <div
            key={marker.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110",
              marker.selected && "scale-125 z-10"
            )}
            style={{
              left: `${Math.max(5, Math.min(95, x))}%`,
              top: `${Math.max(5, Math.min(95, 100 - y))}%`,
            }}
            onClick={() => handleMarkerClick(marker.id)}
          >
            {/* Marker Pin */}
            <div className={cn(
              "relative flex items-center justify-center",
              marker.selected ? "animate-bounce" : ""
            )}>
              <MapPin 
                className={cn(
                  "h-8 w-8 drop-shadow-lg",
                  marker.selected 
                    ? "text-primary fill-primary" 
                    : "text-red-500 fill-red-500"
                )} 
              />
              
              {/* Price Badge */}
              <Badge 
                className={cn(
                  "absolute -top-8 whitespace-nowrap text-xs font-semibold shadow-lg",
                  marker.selected 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-white text-gray-900 border"
                )}
              >
                {marker.currency} {(marker.price / 1000).toFixed(0)}k
              </Badge>
            </div>
          </div>
        )
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white shadow-lg"
          onClick={zoomIn}
        >
          <span className="text-lg font-bold">+</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white shadow-lg"
          onClick={zoomOut}
        >
          <span className="text-lg font-bold">−</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-white shadow-lg"
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Selected Property Info */}
      {selectedProperty && (
        <Card className="absolute bottom-4 left-4 max-w-sm shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-start space-x-3">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm line-clamp-1">
                  {selectedProperty.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {selectedProperty.location.neighborhood}, {selectedProperty.location.city}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-sm">
                    {selectedProperty.currency} {(selectedProperty.price / 1000).toFixed(0)}k
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {selectedProperty.details.area}m²
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
        Mapa Simulado - Rio de Janeiro
      </div>
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <MapVisualization />
      </div>
    )
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="p-0 h-full">
        <MapVisualization />
      </CardContent>
    </Card>
  )
} 