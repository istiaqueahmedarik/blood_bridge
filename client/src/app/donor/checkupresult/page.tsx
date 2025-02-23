import { get_with_token } from '@/app/actions/req'
import CheckUpList from '@/components/CheckUpResults'
import React from 'react'



export default async function page() {
  const data = await get_with_token('donor/auth/test_results', false);
  console.log(data);
  return (
    <div>
      <CheckUpList data={data?.tests || []} />
    </div>
  )
}