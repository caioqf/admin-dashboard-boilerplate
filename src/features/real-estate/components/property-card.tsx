import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Square, 
  Calendar, 
  Eye, 
  MessageCircle, 
  Edit, 
  MoreHorizontal,
  Phone,
  Heart,
  User,
  Star
} from 'lucide-react'
import { useLocale } from '@/context/locale-context'
import { Property } from '../types'

interface PropertyCardProps {
  property: Property
  onSelect: (property: Property) => void
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const { t } = useLocale()

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'sold': return 'bg-blue-100 text-blue-800'
      case 'reserved': return 'bg-yellow-100 text-yellow-800'
      case 'under_construction': return 'bg-purple-100 text-purple-800'
      case 'pre_launch': return 'bg-orange-100 text-orange-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: Property['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `R$ ${(price / 1000000).toFixed(1)}M`
    }
    return `R$ ${(price / 1000).toFixed(0)}k`
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(property)}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={getStatusColor(property.status)}>
              {t(`real_estate.status.${property.status}`)}
            </Badge>
            <Badge variant="outline" className={`text-xs ${getPriorityColor(property.priority)}`}>
              {t(`real_estate.priority.${property.priority}`)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Reference */}
          <div>
            <h3 className="font-semibold text-lg line-clamp-2">{property.title}</h3>
            {property.reference && (
              <p className="text-sm text-muted-foreground">Ref: {property.reference}</p>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location.neighborhood}, {property.location.city}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.details.area}m²</span>
              </div>
              {property.details.bedrooms && property.details.bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.details.bedrooms}</span>
                </div>
              )}
              {property.details.bathrooms && property.details.bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{property.details.bathrooms}</span>
                </div>
              )}
              {property.details.parkingSpaces && property.details.parkingSpaces > 0 && (
                <div className="flex items-center">
                  <Car className="w-4 h-4 mr-1" />
                  <span>{property.details.parkingSpaces}</span>
                </div>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">{formatPrice(property.price)}</p>
              <p className="text-sm text-muted-foreground">
                R$ {property.pricePerSqm.toLocaleString('pt-BR')}/m²
              </p>
            </div>
            {property.originalPrice && property.originalPrice > property.price && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(property.originalPrice)}
                </p>
                <p className="text-xs text-green-600">
                  -{Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)}%
                </p>
              </div>
            )}
          </div>

          {/* Agent */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Avatar className="h-8 w-8">
              <AvatarImage src={property.agent.avatar} />
              <AvatarFallback>
                {property.agent.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">{property.agent.name}</p>
              <p className="text-xs text-muted-foreground">{t('real_estate.agent')}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{property.viewCount}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" />
                <span>{property.inquiries}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{new Date(property.listingDate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex w-full space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Edit className="w-4 h-4 mr-2" />
            {t('real_estate.edit')}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="w-4 h-4 mr-2" />
            {t('real_estate.contact')}
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 