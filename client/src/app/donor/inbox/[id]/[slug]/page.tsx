import { get_with_token } from '@/app/actions/req';
import Inbox from '@/components/Inbox'
import { cookies } from 'next/headers';
import React from 'react'


async function page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const val = await params;
    const token = (await cookies()).get('token')?.value
    console.log(val)
    const res = await get_with_token(`inbox/api/auth/inbox/${val.slug}`);
    console.log(res)
    return (
        <div>
            <Inbox res={res} val={val} token={token} />
        </div>
    )
}

export default page