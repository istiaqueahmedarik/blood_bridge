import Image from 'next/image'
import React from 'react'


function Footer() {
    return (
        <div className='bg-input/20 mt-20'>
            <div className='grid place-content-center'>
                <Image src={'/last_landing_pic.svg'} alt='last artistic pic' width={2000} height={900} />
            </div>
        </div>
    )
}

export default Footer