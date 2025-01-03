import Image from 'next/image';
import React from 'react'
import { Button } from './ui/Button';
import Link from 'next/link';
import { HandHeart, User, UserPen } from 'lucide-react';


function Donor() {
  return (
    <div>
        <div className='flex flex-col-2'>
            <div className='flex flex-col border rounded-sm h-80 w-52 px-2 mt-4 ml-10 gap-2'>
              {/**sidebar */}
              <div className='flex flex-col justify-center items-center mt-2'>
                  <Image src={'/ariful.jpg'} alt='Image of Donor' width={80} height={80} />
                  <div className='flex flex-col items- justify-center'>
                      <h1 className='font-bold font-serif tracking-wider'>Ariful Khan</h1>
                      <p className='text-black/75'>Blood type: O+ve</p>
                  </div>
              </div>
              <div className='flex gap-2  hover:bg-red-200 hover:text-red-500 rounded-sm h-8 items-center'>
                  <User className='size-5'/>
                  <Link href={'/donor-dashboard'}>Dashboard</Link>
              </div>
              <div className='flex gap-2 hover:bg-red-200 h-8 rounded-sm items-center'>
                    <UserPen className='size-5'/>
                    <Link href={'/editdonor'}>
                        <h1 className='hover:text-red-500'>Edit Dashboard</h1>
                    </Link>
              </div>
            </div>
            <div className='flex-row-2 px-6 mt-8'>
              {/** dashboard*/}
              <div className='gird grid-cols-4 flex gap-4'>
                {/**top part */}
                <div className='border flex h-16 w-60 justify-between px-2 rounded-sm'>
                  <div className=' items-center justify-center mt-2'>
                  <p>Total Donations</p>
                  <h1 className='font-bold'>12</h1>
                  </div>
                  <div className='items-center flex justify-center'> {/**For Logo */}
                      <HandHeart/>
                  </div>
                </div>
                <div className='border flex h-16 w-60 justify-between px-2 rounded-sm'>
                  <div className=' items-center justify-center mt-2'>
                  <p>Last Donations</p>
                  <h1 className='font-bold'>12</h1>
                  </div>
                  <div className='items-center flex justify-center'> {/**For Logo */}
                      <HandHeart />
                  </div>
                </div>
                <div>Lives Saved</div>
                <div>Next Eligible Date</div>
              </div>
              <div className='flex-col-2'>
                {/**lower part*/}
                <div>
                  Dashboard
                </div>
                <div>
                  Upcomming Appoinmnet
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Donor