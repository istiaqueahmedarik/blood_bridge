import React from 'react'


function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className='h-20'></div>
            {children}
        </div>
    )
}

export default layout