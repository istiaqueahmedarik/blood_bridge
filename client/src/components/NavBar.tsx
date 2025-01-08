'use client'

import dynamic from "next/dynamic"
import { Suspense } from "react";

export default function NavBar() {
    const NavTab = dynamic(() => import('./NavTab'), { ssr: false });
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <NavTab />
            </Suspense>
        </>
    )
}

