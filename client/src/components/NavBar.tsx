import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/Button'
import { Bell } from 'lucide-react'
function NavBar() {
    return (
        <div className='flex justify-between items-center p-4'>
            <Link href={"/"}>
                <Image src={'/logo.svg'} alt="logo" width={50} height={50} quality={40} priority />
            </Link>
            <Link href={"/donor"}>
                <h1>Donor</h1>
            </Link>
            <Link href={"/blood_bank"}>
                <h1>Blood Bank</h1>
            </Link>
            <Link href={"/hospital"}>
                <h1>Hospital</h1>
            </Link>
            <Link href={"/ask"}>
                <h1>Ask</h1>
            </Link>
            <Button className='bg-foreground text-background'>
                Choose User
            </Button>

            <Button className='bg-destructive text-foreground'>
                Alert
            </Button>

            <Link href={"/notification"}>
                <Bell size={24} />
            </Link>
        </div>
    )
}

export default NavBar

