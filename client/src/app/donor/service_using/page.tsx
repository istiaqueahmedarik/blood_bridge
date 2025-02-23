import { get_with_token } from '@/app/actions/req'
import ServiceCardsList from '@/components/ServiceCardsList'
import React from 'react'


async function page() {
    const res = await get_with_token('donor/auth/service/using', false);
    console.log(res);
    return (
        <div>
            <ServiceCardsList data={res.services} />
        </div>
    )
}

export default page