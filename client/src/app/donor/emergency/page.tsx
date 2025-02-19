import { get } from '@/app/actions/req'
import EmergencyBloodDonationList from '@/components/EmergencyList'
import React from 'react'


async function page() {
    const res = await get('emergency/em');

    return (
        <div>
            <EmergencyBloodDonationList res={res} />
        </div>
    )
}

export default page