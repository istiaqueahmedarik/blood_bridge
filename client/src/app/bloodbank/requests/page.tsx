import { get_with_token } from '@/app/actions/req'
import RequestsPage from '@/components/RequestPage'
import React from 'react'



async function page() {
    const res = await get_with_token('institute/auth/booked');
    const res1 = await get_with_token('institute/auth/booked/accepted');
    return (

        <main className="container mx-auto p-4">
            <RequestsPage data={res} data1={res1} />

        </main>


    )
}

export default page