import SearchPageWrapper from '@/components/Search'
import React, { Suspense } from 'react'

export const experimental_ppr = true
const page = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchPageWrapper />
            </Suspense>
        </div>
    )
}

export default page