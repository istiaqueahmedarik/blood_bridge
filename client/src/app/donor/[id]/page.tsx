import React from 'react'


async function page({ params }: Readonly<{ params: { id: string } }>) {
    const id = (await params).id;
    return (
        <div>{id}</div>
    )
}

export default page