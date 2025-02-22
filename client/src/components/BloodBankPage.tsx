/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import FilterBar from '@/components/FilterBar'
import BloodRequestGrid from '@/components/BloodRequestGrid'
import Inbox from '@/components/InboxBloodBank'

export default function BloodBankPage({ res }: any) {
    const [activeTab, setActiveTab] = useState('requests')
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')
    const pathname = usePathname()
    const router = useRouter()


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blood Bank Management</h1>
            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
            />
            <BloodRequestGrid searchTerm={searchTerm} filterType={filterType} res={res} />
        </div>
    )
}

