import { get_with_token } from '@/app/actions/req'
import AddRepHospital from '@/components/AddRepHospital';
import React from 'react'


async function page() {
    const res = await get_with_token('institute/auth/booked/needReport/hospital');
    console.log(res);
    return (
        <div>
            <AddRepHospital data={res?.data} />
        </div>
    )
}

export default page