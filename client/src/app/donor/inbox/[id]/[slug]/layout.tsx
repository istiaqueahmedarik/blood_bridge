import { get_with_token } from '@/app/actions/req';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';
import React from 'react'

export default async function layout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ slug: string }>
}>) {
    const val = await params;
    const res = await get_with_token(`inbox/api/auth/inbox/${val.slug}`);
    const data = res.res1[0];
    return (
        <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{data.Full_name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-medium">{data.Full_name}</h2>

                    </div>
                </div>
                <div className="text-sm text-muted-foreground">
                    {data.Address}
                </div>
            </div>
            {children}
        </div>
    )
}