import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



export default function page() {
  return (
    <div>
        <div className='grid grid-cols-2 place-content-center h-[90vh] w-full m-auto'>
      <div className='m-auto'>
        <Image src="/hand_holding_leaf.svg" alt='' height={400} width={400} />
      </div>
      <div className='p-10'>
        <div>
          <h1 className='text-4xl font-bold'>Log in</h1>
          <h1>
            Your information is secured to us.
          </h1>
          <p>
            Need account?
            <Link href='/hospital_reg' className='underline-offset-2 underline decoration-primary'>
              Signup here
            </Link>
          </p>
        </div>
        <Form action={'/donor'} className='flex flex-col gap-4 my-5'>
            <Input placeholder='Your Email' type='email' name='email' className='max-w-xl px-4 py-6' />
            <Input placeholder='Your Password' type='password' name='password' className='max-w-xl px-4 py-6' />
            <select
                id="instituteType"
                name="instituteType"
                className=" px-4 py-2 border border-gray-300 rounded-md mr-48"
            >
                <option value="Hospital">Hospital</option>
                <option value="Bloodbank">Bloodbank</option>
            </select>


          <Button className='max-w-xl' variant={'default'}>Log in</Button>

        </Form>
      </div>

    </div>
    </div>
  )
}