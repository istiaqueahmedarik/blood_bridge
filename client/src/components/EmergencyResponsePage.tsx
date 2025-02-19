/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import dynamic from 'next/dynamic'

const BloodDonationEmergency = dynamic(() => import('@/components/BloodDonationEmergency'), { ssr: false })

export default function EmergencyResponsePage({ data, id, data1 }: { data: any, id: any, data1: any }) {
    return <BloodDonationEmergency data={data} id={id} data1={data1} />
}

