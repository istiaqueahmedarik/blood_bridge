import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/Button'


function Hero() {
    return (
        <div className='grid grid-rows-2 lg:grid-cols-2 gap-4 mx-4'>
            <div className='grid place-content-center gap-4'>
                {/*  others*/}
                <h1 className='text-4xl font-extrabold'>Unite Live Share Blood</h1>
                <p className='text-lg font-light'>
                    Bridging donors and those in need, making blood donation simple and impactful.
                </p>
                <form className='flex flex-row gap-4'>
                    <Input placeholder="Ask Anything" className='max-w-lg outline-none focus:outline-none border-transparent border-0' />
                    <Button className='bg-foreground text-background outline-none focus:outline-none'>
                        Search
                    </Button>
                </form>
            </div>
            <div className='grid place-content-center'>
                {/*  image*/}
                <Image src={'/hero_image.svg'} alt="hero" width={500} height={500} />
            </div>
        </div>
    )
}

export default Hero