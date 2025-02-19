import React from 'react'

export default async function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex-1 flex flex-col">

            {children}
        </div>
    )
}