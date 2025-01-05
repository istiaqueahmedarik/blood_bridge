'use client'
import { Bell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center px-4 border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='flex justify-between items-center w-full md:hidden'>
                <Link href='/' className='m-auto'>
                    <Image src={'/icon.svg'} alt='logo' width={50} height={50} quality={30} priority />
                </Link>
                <button onClick={() => setMenuOpen(!menuOpen)} className='focus:outline-none'>
                    <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                        <span className='block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out'></span>
                        <span className='block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out mt-1.5'></span>
                        <span className='block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out mt-1.5'></span>
                    </div>
                </button>
            </div>

            <div className={`flex-col md:flex-row justify-between gap-4 md:gap-8 items-center m-auto ${menuOpen ? 'flex' : 'hidden'} md:flex border-r-2 px-2`}>
                <Link href="/donor">
                    <h1>Donor</h1>
                </Link>
                <Link href="/bloodbank">
                    <h1>Blood Bank</h1>
                </Link>
                <Link href="/hospital">
                    <h1>Hospital</h1>
                </Link>
                <Link href="/ask">
                    <h1>Ask</h1>
                </Link>
            </div>
            <Link href='/' className='hidden md:block m-auto'>
                <Image src={'/icon.svg'} alt='logo' width={50} height={50} quality={30} priority />
            </Link>
            <div className={`flex-col md:flex-row justify-between items-center gap-4 border-l-2 px-2 ${menuOpen ? 'flex' : 'hidden'} md:flex`}>
                <Button className='bg-foreground text-background ' asChild>
                    <Link href="/users">
                        Choose User
                    </Link>
                </Button>
                <Button className='bg-destructive' asChild>
                    <Link href={'/emergency'}>
                        Emergency
                    </Link>
                </Button>
                <Link href="/notification">
                    <Bell />
                </Link>
            </div>
        </div>
    )
}

