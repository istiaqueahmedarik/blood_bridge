import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';
import React from 'react'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex-1 flex flex-col">
            <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>IA</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-sm font-medium">Istiaque Ahmed</h2>
                        <div className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <X className="w-4 h-4 text-red-500" />
                        </div>
                    </div>
                </div>
                <div className="text-sm text-muted-foreground">
                    35/e/1 north hatirpol, zarker han (3rd floor), 1214
                </div>
            </div>
            {children}
        </div>
    )
}