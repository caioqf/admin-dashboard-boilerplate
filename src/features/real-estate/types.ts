export interface Property {
  id: string
  title: string
  description: string
  type: 'apartment' | 'house' | 'commercial' | 'land' | 'penthouse' | 'office'
  status: 'available' | 'sold' | 'reserved' | 'under_construction' | 'pre_launch' | 'suspended'
  price: number
  currency: string
  images: string[]
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
    country: string
    zipCode: string
    latitude: number
    longitude: number
  }
  details: {
    bedrooms?: number
    bathrooms?: number
    area: number // in square meters
    floor?: number
    totalFloors?: number
    parkingSpaces?: number
    furnished?: boolean
    yearBuilt?: number
  }
  amenities: string[]
  features: string[]
  // Sales information
  salePrice?: number
  originalPrice: number
  pricePerSqm: number
  // Management info
  agent: {
    id: string
    name: string
    email: string
    phone: string
    avatar: string
  }
  developer?: {
    id: string
    name: string
    logo: string
  }
  // Dates
  listingDate: string
  saleDate?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
  // Additional fields
  reference: string
  commission: number
  notes?: string
  priority: 'low' | 'medium' | 'high'
  viewCount: number
  inquiries: number
}

export interface PropertyFilters {
  priceRange: [number, number]
  propertyTypes: Property['type'][]
  status: Property['status'][]
  bedrooms: number
  bathrooms: number
  minArea: number
  maxArea: number
  amenities: string[]
  agents: string[]
  priority: Property['priority'] | 'all'
  dateRange: {
    from?: Date
    to?: Date
  }
}

export interface PropertyStats {
  totalProperties: number
  availableProperties: number
  soldProperties: number
  reservedProperties: number
  totalValue: number
  averagePrice: number
  averageDaysOnMarket: number
  monthlyRevenue: number
}

export interface MapMarker {
  id: string
  position: [number, number] // [latitude, longitude]
  price: number
  currency: string
  status: Property['status']
  selected: boolean
}

export interface Launch {
  id: string
  name: string
  description: string
  developer: {
    id: string
    name: string
    logo: string
  }
  location: {
    address: string
    neighborhood: string
    city: string
    state: string
  }
  totalUnits: number
  availableUnits: number
  soldUnits: number
  priceRange: {
    min: number
    max: number
  }
  launchDate: string
  deliveryDate: string
  status: 'pre_launch' | 'launched' | 'selling' | 'sold_out' | 'delivered'
  images: string[]
  amenities: string[]
  progress: number // construction progress percentage
  createdAt: string
  updatedAt: string
} 