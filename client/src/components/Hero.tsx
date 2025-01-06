import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import Form from 'next/form'



export default function Hero() {
    return (
        <div>
            <div className=' grid grid-rows-1 lg:grid-cols-2 gap-4 mx-6'>
                <div className='grid place-content-center gap-4'>
                    <h1 className='text-4xl font-extrabold'>Unite Live Share Blood</h1>
                    <p className='text-lg font-light'>
                        Bridinging donors and those in need, making blood donation simple and impactful
                    </p>

                    <Form action={'/search'} className='flex flex-row gap-4'>
                        <Input name='query' placeholder='Ask Anything' className='max-w-xl  outline-none px-4 py-6  border-2 border-input rounded-xl' />
                    </Form>
                </div>
                <div className='grid place-content-center'>
                    <Image src={'./hero1.svg'} alt='hero' width={500} height={500} />
                </div>
            </div>


        </div>
    )
}