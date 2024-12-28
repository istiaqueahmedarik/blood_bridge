import Image from 'next/image'
import React from 'react'


function Footer() {
    return (
        <div className='bg-background mt-20'>
            <div className='grid place-content-center'>
                <Image src={'/last_landing_pic.svg'} alt='last artistic pic' width={500} height={500} />
            </div>
        </div>
    )
}

export default Footer