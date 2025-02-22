import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react'

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ScrollArea className="flex-1 flex flex-col h-[50vh]">

            {children}
        </ScrollArea>
    )
}