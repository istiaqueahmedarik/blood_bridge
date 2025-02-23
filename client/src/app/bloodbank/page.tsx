import DashboardContent from '@/components/BloodBankDash'
import React from 'react'
import { get_with_token } from '../actions/req'


async function page() {
  const res = await get_with_token('bloodbank/auth/test_count');
  console.log(res);
  return (
    <div>
      <DashboardContent data={res.data} data1={res.data1} data2={res.data2} bloodTestsByDay={res.bloodTestsByDay} />
    </div>
  )
}

export default page