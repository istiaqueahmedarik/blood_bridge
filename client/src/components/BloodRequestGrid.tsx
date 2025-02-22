/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import BloodRequestCard from './BloodRequestCard'



export default function BloodRequestGrid({ searchTerm, filterType, res }: any) {

    console.log(res)

    const filteredRequests = res.filter((request: any) =>
        request.Full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === 'all' || request.Blood_type_req === filterType)
    )



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRequests.map((request: any, id: any) => (
                <BloodRequestCard
                    key={id}
                    request={request}
                />
            ))}
        </div>
    )
}

