import { get_with_token } from '@/app/actions/req'
import BloodBankPage from '@/components/BloodBankPage'
import React from 'react'


async function page() {
    const res = await get_with_token('bloodbank/auth/hospital_req')
    console.log("res", res)
    return (
        <div>
            <BloodBankPage res={res?.data || []} />
        </div>
    )
}

export default page