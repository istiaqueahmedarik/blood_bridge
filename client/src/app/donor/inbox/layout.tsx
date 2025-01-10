import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import React from 'react'
interface Contact {
    id: number
    name: string
    status: "Available" | "Not Available"
    avatar: string
}

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const contacts: Contact[] = [
        { id: 1, name: "Rasiul Hasan", status: "Available", avatar: "/placeholder.svg" },
        { id: 2, name: "Istiaque Ahmed", status: "Not Available", avatar: "/placeholder.svg" },
        { id: 3, name: "Aref", status: "Not Available", avatar: "/placeholder.svg" },
        { id: 4, name: "Ariful Khan", status: "Available", avatar: "/placeholder.svg" },
        { id: 5, name: "Reza", status: "Available", avatar: "/placeholder.svg" },
        { id: 6, name: "Oriental Blood bank", status: "Available", avatar: "/placeholder.svg" },
        { id: 7, name: "Badhan Blood Bank", status: "Available", avatar: "/placeholder.svg" },
    ]
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
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-muted ${contact.id === 2 ? "bg-muted" : ""
                                    }`}
                            >
                                <Avatar>
                                    <AvatarImage src={contact.avatar} />
                                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">{contact.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>
            <div className="flex-1">{children}</div>
        </div>
    )
}