import { get, get_with_token } from '@/app/actions/req'
import EmergencyResponsePage from '@/components/EmergencyResponsePage'
import { cookies } from 'next/headers'
import React from 'react'


async function page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const data = await get(`emergency/em/${id}`);
    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.get('token')?.value !== undefined

    const data1 = isLoggedIn ? await get_with_token('auth/em') : null

    return (
        <div className=' bg-foreground'>
            <EmergencyResponsePage data={data[0]} id={id} data1={data1} />
        </div>
    )
}

export default page