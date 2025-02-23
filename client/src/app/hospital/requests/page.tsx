import { get_with_token } from '@/app/actions/req'
import HospitalRequestsPage from '@/components/HospitalRequestPage';
import React from 'react'



async function page() {
    const res = await get_with_token('institute/auth/booked/hospital');
    const res1 = await get_with_token('institute/auth/booked/accepted/hospital');
    return (

        <main className="container mx-auto p-4">
            <HospitalRequestsPage data={res} data1={res1} />

        </main>


    )
}

export default page