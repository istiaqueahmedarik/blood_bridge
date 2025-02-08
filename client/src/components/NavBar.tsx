'use client'

import dynamic from "next/dynamic"
import { Suspense } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NavBar({ token }: { token: any }) {
    const NavTab = dynamic(() => import('./NavTab'), { ssr: false });
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NavTab token={token} />
            </Suspense>
        </>
    )
}

