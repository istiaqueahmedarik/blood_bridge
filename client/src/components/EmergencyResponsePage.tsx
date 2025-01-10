'use client'
import dynamic from 'next/dynamic'

const BloodDonationEmergency = dynamic(() => import('@/components/BloodDonationEmergency'), { ssr: false })

export default function EmergencyResponsePage() {
    return <BloodDonationEmergency />
}

