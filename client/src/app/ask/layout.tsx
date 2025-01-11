import React from 'react'
import { AI } from '../ai';


function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='h-20'></div>
            <AI>
                {children}
            </AI>
        </div>
    )
}

export default layout