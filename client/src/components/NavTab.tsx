/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { Button } from './ui/button'
import { Link } from 'next-view-transitions'
import { easeOut, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useWindowHeight } from '../hooks/useWindowHeight'
import Image from 'next/image'
import { Input } from './ui/input'
import { Flower } from 'coolshapes-react'
import Form from 'next/form'
import { LayoutDashboard, LogInIcon, LogOutIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SparklesIcon } from './ui/sparkles'

function NavTab({ token, type }: { token: any, type: any }) {
    const isLogged = token !== undefined
    const path = usePathname()
    const { scrollY } = useScroll()
    const [scroll, setScroll] = React.useState(0)
    useMotionValueEvent(scrollY, "change", (current) => {
        setScroll(current)
    })
    const offset = 70;
    const height = useWindowHeight();
    const y = useTransform(scrollY, [0, height], [0, (path === '/' ? -1 * (height - offset) : (0))], { ease: easeOut })
    return (
        <motion.div
            style={{ y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='flex justify-between p-2 max-w-fit gap-2 mx-auto border rounded-full bg-input sticky bottom-3 z-50'>
            <div>
                <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" alt="Blood donation" width={30} height={30} className="object-contain mx-5" />
                </Link>
            </div>
            <Button asChild className=' rounded-full  hover:text-background bg-destructive shadow-none text-background font-extrabold'>
                <Link href="/emergency" className="">Emergency</Link>

            </Button>

            <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none' asChild>
                <Link href={`/${type}`} className={`${!isLogged && 'hidden'}`}>
                    <LayoutDashboard size={22} />
                </Link>
            </Button>

            <motion.div
                initial={{ opacity: 0, display: 'none' }}
                animate={{ opacity: scroll > 0 ? 1 : 0, display: scroll > 0 ? 'block' : 'none' }}
                transition={{ duration: 0.5 }}
                className=''
            >
                <Form action={'/search'} className="relative rounded-full bg-background max-w-xs w-32 mx-auto outline-primary ">
                    <Input placeholder="Search ...." className='rounded-full px-4 py-3' />
                    <Button variant={'ghost'} type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border-2 border-primary p-2 w-8 h-8 flex items-center justify-center bg-foreground">
                        <Flower index={9} noise={true} size={24} />
                    </Button>
                </Form>
            </motion.div>
            <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none' asChild>
                <Link href={`${isLogged ? '/logout' : '/users'}`} className='hover:text-foreground/80 transition-all'>
                    {isLogged ? <LogOutIcon size={22} className='hover:text-foreground/80 transition-all' /> : <LogInIcon className='hover:text-foreground/80 transition-all' size={22} />}
                </Link>
            </Button>
            <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none' asChild>
                <Link href={'/ask'} className='hover:text-foreground/80 transition-all'>
                    <SparklesIcon className="hover:bg-transparent m-auto" />
                </Link>
            </Button>
        </motion.div >
    )
}

export default NavTab