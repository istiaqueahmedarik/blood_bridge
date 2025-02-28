'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

function Userlist({ allUser, type = "donor" }: any) {
    const [query, setQuery] = useState('')

    const filteredUsers = allUser?.filter((contact: any) =>
        contact.Full_name.toLowerCase().includes(query.toLowerCase())
    )


    return (
        <div className="w-80 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Messages
                    </h1>

                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search"
                        className="pl-10 bg-gray-100 dark:bg-gray-700 border-none rounded-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
                <div className="p-2">
                    {filteredUsers?.map((contact: any) => (
                        <Link
                            href={`/${type}/inbox/me/${contact.url}`}
                            key={contact.ID}
                            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={contact.avatar} />
                                <AvatarFallback className="bg-blue-500 text-white">
                                    {contact.Full_name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {contact.Full_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {contact.lastMessage || 'No messages yet'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}

export default Userlist