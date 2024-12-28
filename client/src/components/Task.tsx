import Image from 'next/image'
import React from 'react'


function Task() {
    return (
        <div className='mt-8'>
            <div>
                {/**Header Text */}
                <h1 className='flex items-center justify-center font-bold text-3xl'>What We Do?</h1>
            </div>
            <div className='px-10 flex items-center justify-center grid-cols-3 gap-12 ml-8'>
                {/**3 images set to be here*/}
                <div className='ml-4'>
                    {/**left img */}
                    <Image src={'/handshake.svg'} alt='Handshake' width={300} height={300} />
                    <h1 className='mx-6 font-bold'>Instant Blood Connnection</h1>
                    <p className='mx-6 mt-4'>Quickly connect those in need with donors in real-time</p>
                </div>
                <div className='ml-8'>
                    {/***mid img */}
                    <Image src={'/phone.svg'} alt='phone' width={300} height={300} />
                    <h1 className='mx-6 font-bold'>Stay Instantly Informed</h1>
                    <p className='mx-6 mt-4'>Receive real-time updates on blood avilability and urgent requests</p>
                </div>
                <div className='ml-5'>
                    {/**right img */}
                    <Image src={'/siren.svg'} alt='siren' width={300} height={300} />
                    <h1 className='mx-6 font-bold'>Cirtical Alert System</h1>
                    <p className='mx-6 mt-4'>Get immediate notifications for urgent blood needs in your area</p>
                </div>
            </div>
        </div>
    )
}

export default Task