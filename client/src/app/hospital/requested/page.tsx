import { get_with_token } from '@/app/actions/req'
import BloodRequestsPage from '@/components/blood_requested_list'
import React from 'react'


async function page() {
    const res = await get_with_token('hospital/auth/req_blood', false);
    console.log(res);
    return (
        <div>
            <BloodRequestsPage res={res?.data || []} />
        </div>
    )
}

export default page