import { InstituteTable } from '@/components/ui/table-hero-ui'
import { Table } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col justify-center items-center gap-4 m-4'>
            <div>
                <h1 className='text-xl font-semibold'>Pending Approval</h1>
            </div>
            <div className='border border-gray-300 rounded-sm'>
                <InstituteTable/>
            </div>
        </div>
    )
}

export default page