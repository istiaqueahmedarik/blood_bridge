import Image from 'next/image'
import React from 'react'

function Impact() {
    return (
        <div>
            <div className='mt-20 bg-blue-100 p-2'>
                <div>
                    <h1 className='text-3xl font-bold flex items-center justify-center mt-11'>How BloodBridge Work?</h1>
                </div>
                <div className='flex'>
                    <div className='px-52'>
                        <Image src={'/map.svg'} alt='map' width={500} height={500} />
                    </div>
                    <div className='mt-40 mr-24'>
                        <h1 className='font-bold'>Step 1</h1>
                        <h1 className='text-2xl font-bold mr-20'>Requesting Blood: Simple and Direct</h1>
                        <p className='mr-24'>User or Hospital easialy submit thier urgent need through this app.</p>
                    </div>
                </div>
            </div>
            <div className='items-center justify-center'>
                <div>
                    <h1 className='font-medium text-3xl flex justify-center items-center mt-20'>Our Impact</h1>
                </div>
                <div className='grid grid-rows-2 place-content-center w-full mt-8 items-center justify-center'>
                    <div className='rounded-full px-36'>
                        <Image src={'/holding_arm.jpg'} alt='holding arm' width={700} height={500} className='rounded-2xl' />
                    </div>
                    <div className='flex flex-auto justify-center items-center gap-5 m-auto w-full'>
                        <div className=''>
                            <Image src={'/hands_ingect.jpg'} alt='hands ingecting man' width={250} height={300} className='rounded-2xl' />
                        </div>
                        <div className='bg-orange-200 rounded-xl  max-w-60 p-8'>
                            <Image src={'/ingecting.jpg'} alt='ingecting' width={300} height={800} className='felx justify-center rounded-2xl' />
                            <p className='text-sm mt-4 flex flex-auto justify-center text-neutral-400'>Effortless Way to Give back</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Impact