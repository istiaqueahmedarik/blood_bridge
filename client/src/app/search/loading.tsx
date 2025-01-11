import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import React from 'react'


function loading() {
    return (
        <div>
            <TextShimmerWave className='font-mono text-sm' duration={1}>
                Generating your search result...
            </TextShimmerWave>
        </div>
    )
}

export default loading