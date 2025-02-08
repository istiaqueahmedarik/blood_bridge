'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React, { useActionState } from 'react'
import { Login } from '../actions/action'
function LoginPage() {
  const [state, formAction, isPending] = useActionState(Login, null)

  return (
    <div className='grid grid-cols-2 place-content-center h-[90vh] w-full m-auto'>
      <div className='m-auto'>
        <Image src="/signup.svg" alt='' height={400} width={400} />
      </div>
      <div className='p-10'>
        <div>
          <h1 className='text-4xl font-bold'>Log in</h1>
          <h1>
            Your information is secured to us.
          </h1>
          <p>
            Need account?
            <Link href='/signup' className='underline-offset-2 underline decoration-primary'>
              Signup here
            </Link>
          </p>
        </div>
        <form action={formAction} className='flex flex-col gap-4 my-5'>
          <Input placeholder='Your Email' type='email' name='email' className='max-w-xl px-4 py-6' />
          <Input placeholder='Your Password' type='password' name='password' className='max-w-xl px-4 py-6' />
          <Button className='max-w-xl' variant={'default'} disabled={isPending}>
            {isPending ? 'Loading...' : 'Login'}
          </Button>
          {state?.error && <p className='text-red-500'>{state.error}</p>}
        </form>
      </div>

    </div>
  )
}

export default LoginPage