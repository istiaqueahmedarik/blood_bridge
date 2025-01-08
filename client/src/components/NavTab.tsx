'use client'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { easeOut, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useWindowHeight } from '../hooks/useWindowHeight'
import Image from 'next/image'
import { Input } from './ui/input'
import { Flower } from 'coolshapes-react'
import Form from 'next/form'
import { BellIcon, ChevronDown, MessageCircleQuestion, HomeIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useMediaQuery } from 'react-responsive'

function NavTab() {
    const { scrollY } = useScroll()
    const [scroll, setScroll] = React.useState(0)
    useMotionValueEvent(scrollY, "change", (current) => {
        setScroll(current)
    })
    const offset = 70;
    const height = useWindowHeight();
    const y = useTransform(scrollY, [0, height], [0, -1 * (height - offset)], { ease: easeOut })
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' })
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
                <Link href="/login" className="">{isSmallScreen ? <HomeIcon size={22} /> : 'Emergency'}</Link>
            </Button>
            {isSmallScreen ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none'>
                            <ChevronDown size={22} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/donor" className="">Donor Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/bloodbank" className="">Blood Bank Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/hospital" className="">Hospital Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/ask" className=""><MessageCircleQuestion size={22} /></Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/login" className="">Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/notifications" className=""><BellIcon size={22} /></Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none'>
                                Services
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/donor" className="">Donor Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/bloodbank" className="">Blood Bank Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/hospital" className="">Hospital Dashboard</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button asChild className=' rounded-full bg-transparent text-foreground hover:text-background  shadow-none'>
                        <Link href="/ask" className=""><MessageCircleQuestion size={22} /></Link>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className=' rounded-full bg-transparent text-foreground hover:text-background shadow-none'>
                                Dashboard
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/login" className="">Login</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/notifications" className=""><BellIcon size={22} /></Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
        </motion.div>
    )
}

export default NavTab