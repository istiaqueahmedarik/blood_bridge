
import { get_with_token } from '@/app/actions/req';
import Inbox from '@/components/Inbox'
import React from 'react'


async function page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const val = await params;
    const res = await get_with_token(`inbox/api/auth/inbox/${val.slug}`, false);
    return (
        <div>
            <Inbox res={res} val={val} />
        </div>
    )
}

export default page