import Image from 'next/image'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Flower } from 'coolshapes-react'
import Form from 'next/form'


const images = [
    '/donor.svg',
    '/hero_image.svg',
    '/handshake2.svg',
    '/happy.svg',
    '/happy3.svg',
    '/handshake3.svg',
]

export default function Hero() {
    return (
        <div className='font-[family-name:var(--font-poppins)]'>
            <div className='grid place-content-center'>
                <Image src={"/logo.svg"} alt="Blood donation" width={60} height={60} />
            </div>
            <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background font-poppins">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="scrolling-images-container">
                            {images.concat(images).map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt="Blood donation"
                                    width={300}
                                    height={300}
                                    className="scrolling-image"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative z-20 text-center px-4 max-w-5xl">
                    <h1 className="text-6xl md:text-8xl font-bold text-card-foreground mb-6 leading-tight">
                        Unite{' '}<span className="text-destructive">Live</span>
                        {' '}Share{' '}<span className="text-destructive">Blood</span>
                        <br />
                    </h1>
                    <Form action={'/search'} className="relative rounded-full bg-background max-w-sm mx-auto outline-primary outline-4 border-[3px] border-foreground">
                        <Input name='query' placeholder="Search ...." className='rounded-full px-4 py-5' />
                        <Button variant={'ghost'} type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-primary p-2 w-10 h-10 flex items-center justify-center bg-foreground">
                            <Flower
                                index={9}
                                noise={true}
                                size={24}
                            />
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )


}