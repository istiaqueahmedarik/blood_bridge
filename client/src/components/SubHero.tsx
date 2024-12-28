import Image from 'next/image'
import React from 'react'


function SubHero() {
    return (
        <div className='flex flex-auto items-center w-full mt-8 bg-secondary py-4'>
            <div className='flex-shrink-0'>
                <Image src={'/running.svg'} alt='running for blood' width={500} height={600} />
            </div>
            <div className='flex-grow text-center text-md font-bold text-3xl'>
                <h3 className='mb-7'>Every 2 seconds, blood is needed</h3>
            </div>
            <div className='flex-shrink-0'>
                <Image src={'/two_hands.svg'} alt='two hands' width={500} height={600} />
            </div>
        </div>
    )
}

export default SubHero