import { get_with_token } from '@/app/actions/req';
import FutureApp from '@/components/FutureApp'
import React from 'react'



async function page() {
    const res = await get_with_token('institute/auth/booked/futureReport');
    console.log(res);
    return (
        <div>
            <FutureApp appointments={res?.data} />
        </div>
    )
}

export default page