import React from 'react'
import { check_type } from '../actions/general';

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const type = await check_type();
  if (type !== 'hospital')
    return <div className='grid h-screen place-content-center w-full'>Not authorized</div>
  return (
    <div>
      {children}
    </div>
  )
}