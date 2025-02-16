import { get } from '@/app/actions/req'
import { DonorRequestForm } from '@/components/DonorRequestForm'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function page() {
  const getHospitals = await get('hospital/hospitals')
  return (
    <div>
      <DonorRequestForm data={getHospitals.data} />
    </div>
  )
}