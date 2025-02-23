import DashboardContent from '@/components/HospitalDashboard'
import React from 'react'
import { get_with_token } from '../actions/req'


async function page() {
  const res = await get_with_token('bloodbank/auth/test_count/hospital');
  return (
    <div>
      <DashboardContent data={res.data} bloodTestsByDay={res.bloodTestsByDay} />
    </div>
  )
}

export default page