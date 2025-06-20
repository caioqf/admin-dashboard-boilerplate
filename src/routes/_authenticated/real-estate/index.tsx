import { createFileRoute } from '@tanstack/react-router'
import RealEstate from '@/features/real-estate'

export const Route = createFileRoute('/_authenticated/real-estate/')({
  component: RealEstate,
}) 