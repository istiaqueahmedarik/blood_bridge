import { get_with_token } from '@/app/actions/req'
import AddRep from '@/components/AddRep'
import React from 'react'


async function page() {
    const res = await get_with_token('institute/auth/booked/needReport');
    console.log(res);
    return (
        <div>
            <AddRep data={res?.data} />
        </div>
    )
}

export default page