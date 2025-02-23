import { get_with_token } from '@/app/actions/req';
import FutureAppHospital from '@/components/FutureAppHospital';
import React from 'react'



async function page() {
    const res = await get_with_token('institute/auth/booked/futureReport/hospital');
    console.log(res);
    return (
        <div>
            <FutureAppHospital appointments={res?.data} />
        </div>
    )
}

export default page