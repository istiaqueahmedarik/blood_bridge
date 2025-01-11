'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import FilterBar from '@/components/FilterBar'
import BloodRequestGrid from '@/components/BloodRequestGrid'
import Inbox from '@/components/InboxBloodBank'

export default function BloodBankPage() {
    const [activeTab, setActiveTab] = useState('requests')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const pathname = usePathname()
    const router = useRouter()

    const isConversationPage = pathname.startsWith('/blood-bank/inbox/')

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blood Bank Management</h1>
            {isConversationPage ? (
                <Button onClick={() => router.back()} className="mb-4">Back to Inbox</Button>
            ) : (
                <>
                    <FilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterType={filterType}
                        setFilterType={setFilterType}
                    />
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                        <TabsList>
                            <TabsTrigger value="requests">Blood Requests</TabsTrigger>
                            <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        </TabsList>
                        <TabsContent value="requests">
                            <BloodRequestGrid searchTerm={searchTerm} filterType={filterType} />
                        </TabsContent>
                        <TabsContent value="inbox">
                            <Inbox />
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}

