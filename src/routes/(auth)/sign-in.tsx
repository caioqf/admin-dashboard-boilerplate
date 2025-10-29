import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <SignIn
      fallback={<Skeleton className='h-[30rem] w-[25rem]' />}
      routing='path'
      path='/sign-in'
    />
  )
}

