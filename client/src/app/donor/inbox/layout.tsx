/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { get_with_token } from '@/app/actions/req'
import React from 'react'
import Link from 'next/link';


export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const allUser = await get_with_token('inbox/api/auth/inbox')
    console.log("allUser", allUser)

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-80 flex flex-col border-r">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-semibold">Inbox</h1>

                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search..." className="pl-8" />
                        </div>

                    </div>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-2">
                        {allUser?.map((contact: any) => (
                            <Link href={`/donor/inbox/me/${contact.url}`} key={contact.ID}
                                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-muted`}
                            >
                                <Avatar>
                                    <AvatarImage src={contact.avatar} />
                                    <AvatarFallback>{contact.Full_name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{contact.Full_name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}