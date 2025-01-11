import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import React from 'react'


function loading() {
    return (
        <div className='h-[90vh] w-full grid place-content-center'>
            <TextShimmerWave className='font-mono text-sm' duration={2}>
                Generating your personalized result...
            </TextShimmerWave>
        </div>
    )
}

export default loading