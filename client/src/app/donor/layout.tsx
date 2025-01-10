import { ActivityList } from '@/components/ActivityList';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Calendar } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
    const { date, month, year } = {
        date: new Date().getDate(),
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
    }
    return (
        <SidebarProvider defaultOpen={defaultOpen} className='font-[family-name:var(--font-poppins)]'>
            <AppSidebar title='Donor Dashboard' />
            <SidebarInset className='px-2'>
                <div className='flex flex-col lg:flex-row auto-cols-min flex-1 gap-4'>
                    <div className='w-full lg:max-w-[70vw] border-r-2 min-h-[calc(100svh-theme(spacing.4))]'>
                        <header className="flex flex-col sm:flex-row h-auto sm:h-22 shrink-0 items-center gap-2 border-b bg-background px-4 py-6">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="h-4 hidden sm:block" />
                            <div className="flex flex-col sm:flex-row w-full items-center justify-between">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <div className="text-center sm:text-left">
                                        <div className="text-xl sm:text-2xl font-extrabold">Hello Md. Sajedullah Aref</div>
                                        <div className="text-xs text-muted-foreground">
                                            Happy to see you again!
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div>

                                        <span className="text-xl font-extrabold">{date}{' '}</span>
                                        <span className="text-muted-foreground">{month} {year}</span>
                                    </div>
                                    <div className='rounded-full bg-muted p-2'>
                                        <Calendar size={24} />
                                    </div>
                                </div>
                            </div>
                        </header>



                        <div className='p-2'>
                            {children}
                        </div>
                    </div>

                    <div className='p-1 flex flex-col auto-cols-min gap-4 w-full lg:w-[30vw]'>
                        <div className='bg-muted aspect-video rounded-xl min-h-[calc(35svh-theme(spacing.4))] grid place-content-center'>
                            <div className='mx-auto '>
                                <Image
                                    src="/rf.jpeg"
                                    height={70}
                                    width={70}
                                    alt="ariful Image"
                                    className="rounded-full aspect-square object-cover"
                                />
                            </div>
                            <div className='text-center'>
                                <div className="text-lg">Md. Sajedullah Aref</div>
                                <div className="">
                                    <span className="text-muted-foreground">Blood Group: </span>
                                    <span className=" font-bold">O+ve</span>
                                </div>
                                <div className="">
                                    <Button className="hover:text-destructive" variant="ghost" asChild>
                                        <Link href="/edit_donor"><Pencil1Icon /></Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-input"></div>
                            <span className="flex-shrink mx-4">Activity</span>
                            <div className="flex-grow border-t border-input"></div>
                        </div>
                        <ActivityList />
                    </div>
                </div>
            </SidebarInset>
            <div className='h-20'></div>
        </SidebarProvider>
    )
}

export default layout

