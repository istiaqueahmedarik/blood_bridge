import { Camera } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='grid grid-cols-2 h-[90vh] m-auto place-content-center'>
      <div className='grid place-content-center'>
      <Image src="/nid.svg" alt='' width={400} height={400}/>
      </div>
      <div className='border-2 rounded-xl max-w-md p-4 shadow-sm grid place-content-center'>
        <h1>
          NID Verification
        </h1>
        <div className='border-2 rounded-md'>
        <div className='m-auto grid place-content-center'>
          {/* <Image src="/logo.svg" alt='' width={200} height={200}/>   */}
          <Camera className='w-96 h-96 font-light'/>
        </div>
        <Link href={'/signup'} className='text-center'>
            <h1 className='text-sm'>
            Click to upload or drag and drop
            </h1>
            <h1 className='text-md'>
            PDF, JPG, JPEG, PNG less than 10MB. Ensure your document are in good condition and readable
            </h1>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default page