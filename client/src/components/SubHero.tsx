import Image from 'next/image'
import React from 'react'


function SubHero() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center w-full mt-8 bg-secondary py-4'>
            <Image src={'/running.svg'} alt='running for blood' width={500} height={600} />
            <div className='w-full md:flex-grow text-center text-md font-bold text-3xl mb-4 md:mb-0'>
                <h3 className='mb-7'>Every 2 seconds, blood is needed</h3>
            </div>
            <Image src={'/two_hands.svg'} alt='two hands' width={500} height={600} />
        </div>
    )
}

export default SubHero