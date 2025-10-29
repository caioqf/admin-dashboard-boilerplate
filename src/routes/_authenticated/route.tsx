import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  component: ProtectedLayout,
})

function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth()
  const navigate = useNavigate()
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  useEffect(() => {
    if (!publishableKey) {
      return
    }

    if (isLoaded && !isSignedIn) {
      navigate({ to: '/sign-in' })
    }
  }, [isSignedIn, isLoaded, navigate, publishableKey])

  if (!publishableKey) {
    return <AuthenticatedLayout />
  }

  if (!isLoaded) {
    return (
      <div className='flex h-svh items-center justify-center'>
        <div className='size-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return <AuthenticatedLayout />
}
