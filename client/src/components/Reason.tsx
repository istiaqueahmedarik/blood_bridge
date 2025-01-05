import Image from 'next/image'
import React from 'react'


function Reason() {
    return (
        <div className='mt-8'>
            <div>
                <h1 className='flex items-center justify-center text-3xl font-bold'>Why Blood Bridge?</h1>
                <p className='flex items-center justify-center'>A formalaized and Technological Approach to Optimiza Blood Donation and Distribution logistics.</p>
            </div>
            <div className='flex items-center justify-center'>
                <Image src={'/bridge.svg'} alt='bridge' width={1000} height={900} />
            </div>
        </div>
    )
}

export default Reason