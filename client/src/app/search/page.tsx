/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import SearchPageWrapper from '@/components/Search'
import { SearchAction } from '../actions/action'
export const experimental_ppr = true
const page = async ({ searchParams }: any) => {
    const q = await searchParams
    console.log(q)
    const res = await SearchAction(q.query);
    // console.log(res);
    // const res = {
    //     id: [{ type: 'donor', id: 'a2e01acf-0d38-4210-8a7f-e66a17248205' }],
    // }
    console.log(res);
    const str = JSON.stringify(res)
    const donor = res.id.filter((id: any) => id.type === 'donor')
    const institute = res.id.filter((id: any) => id.type === 'institute')
    return (
        <div>
            <SearchPageWrapper data={str} donor={donor} institute={institute} />

        </div>
    )
}

export default page