import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/clerk-react'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/(auth)/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <SignUp
      fallback={<Skeleton className='h-[30rem] w-[25rem]' />}
      routing='path'
      path='/sign-up'
    />
  )
}

