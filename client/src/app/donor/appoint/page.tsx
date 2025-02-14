import { get } from '@/app/actions/req';
import { BloodDonationForm } from '@/components/blood-donation-form'
import React from 'react'


export const dynamic = 'force-dynamic'

async function page() {
    const getBloodBanks = await get('bloodbank/bloodbanks');
    return (
        <div className=''>
            <BloodDonationForm list={getBloodBanks} />
        </div>
    )
}

export default page