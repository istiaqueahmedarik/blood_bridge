'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Form from 'next/form'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function page() {
  const [nidCardImage, setNIdCardImage] = useState<File | null>(null); // Properly typed state
  const [preview, setPreview] = useState<string | null>(null); // Allow null for initial state

  const handleNIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Safely access the first file
    if (file) {
      setNIdCardImage(file); // Save the file for further processing
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  return (
    <div className='grid grid-cols-2 place-content-center h-[90vh] w-full m-auto'>
      <div className='p-10 m-auto'>
        <div>
          <h1 className='text-4xl font-bold'>Sign Up</h1>
          <h1>
            Your NID information is encrypted and secure and used only for verification
          </h1>
          <p>
            Already has account?
            <Link href='/login' className='underline-offset-2 underline decoration-primary'>
              Login here
            </Link>
          </p>
        </div>
        <Form action={'/login'} className='flex flex-col gap-4 my-5'>
          <Input placeholder='Full Name' type='text' name='name' className='max-w-xl px-4 py-6' />
          <Input placeholder='Email' type='email' name='email' className='max-w-xl px-4 py-6' />
          <Input placeholder='Phone Number' type='phone' name='phone' className='max-w-xl px-4 py-6' />
          <Input placeholder='Password' type='password' name='password' className='max-w-xl px-4 py-6' />
          <Input placeholder='Confirm Password' type='password' name='Confirm-password' className='max-w-xl px-4 py-6' />

          {/**Blood group of donor */}
          <select
          id="bloodType"
          name="bloodType"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          defaultValue=""
          >
          <option value="" disabled selected>
          -- Select Your Blood Group --
          </option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          </select>

          {/* NID Card Input */}
          <div>
            <label htmlFor='nidCard' className='text-gray-500 ml-3 text-sm font-medium '>Upload NID Card</label>
            <input
              type='file'
              id='nidCard'
              accept='image/*'
              onChange={handleNIdCardChange}
              className='block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark'
            />
          </div>

          <Button className='max-w-xl' variant={'default'}>Sign Up</Button>

        </Form>
      </div>
      <div className='m-auto'>
        <Image src="/signup.svg" alt='' height={400} width={400} />
      </div>
    </div>
  )
}

export default page