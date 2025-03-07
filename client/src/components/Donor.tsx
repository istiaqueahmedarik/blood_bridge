import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'next-view-transitions';
import { CalendarDaysIcon, DropletIcon, HandHeart, HeartPulseIcon, NotebookPen, TrophyIcon, User, UserPen } from 'lucide-react';


function Donor() {
  return (
    <div>
      <div className='flex flex-col-2'>
        <div className='flex flex-col border rounded-sm h-80 w-52 px-2 mt-4 ml-10 gap-2'>
          {/**sidebar */}
          <div className='flex flex-col justify-center items-center mt-2'>
            <Image src={'/ariful.jpg'} alt='Image of Donor' width={80} height={80} />
            <div className='flex flex-col items- justify-center'>
              <h1 className='font-bold font-serif tracking-wider text-sm'>Ariful Khan</h1>
              <p className='text-black/75 text-sm'>Blood type: O+ve</p>
            </div>
          </div>
          <div className='flex gap-2  hover:bg-red-200 hover:text-red-500 rounded-sm h-8 items-center'>
            <User className='size-5' />
            <Link href={'/donor-dashboard'}>Dashboard</Link>
          </div>
          <div className='flex gap-2 hover:bg-red-200 h-8 rounded-sm items-center'>
            <UserPen className='size-5' />
            <Link href={'/editdonor'}>
              <h1 className='hover:text-red-500'>Edit Profile</h1>
            </Link>
          </div>
        </div>
        <div className='flex-row-2 px-6 mt-8 ml-16'>
          {/** dashboard*/}
          <div className='gird grid-cols-4 flex gap-4'>
            {/**top part */}
            <div className='border flex h-20 w-60 justify-between px-2 rounded-sm'>
              <div className=' items-center justify-center mt-2'>
                <p>Total Donations</p>
                <h1 className='font-bold text-2xl'>12</h1>
              </div>
              <div className='items-center flex justify-center'> {/**For Logo */}
                <HandHeart />
              </div>
            </div>
            <div className='border flex h-20 w-60 justify-between px-2 rounded-sm'>
              <div className=' items-center justify-center mt-2'>
                <p>Last Donations</p>
                <h1 className='font-bold text-2xl'>2 month ago</h1>
              </div>
              <div className='items-center flex justify-center'> {/**For Logo */}
                <NotebookPen />
              </div>
            </div>
            <div className='border flex h-20 w-60 justify-between px-2 rounded-sm'>
              <div className=' items-center justify-center mt-2'>
                <p>Lives Saved</p>
                <h1 className='font-bold text-2xl'>36</h1>
              </div>
              <div className='items-center flex justify-center'> {/**For Logo */}
                <HeartPulseIcon />
              </div>
            </div>
            <div className='border flex h-20 w-60 justify-between px-2 rounded-sm'>
              <div className=' items-center justify-center mt-2'>
                <p>Next Eligible Date</p>
                <h1 className='font-bold text-2xl'>March 15,2025</h1>
              </div>
              <div className='items-center flex justify-center'> {/**For Logo */}
                <CalendarDaysIcon />
              </div>
            </div>

          </div>
          <div className='flex-col-2 mt-4'>
            {/**lower part*/}
            <div className='flex gap-2 border h-16 items-center px-4 rounded-sm'>
              <div className='hover:text-red-600 text-red-600 '>
                <Link href={'/dashboard'}>Dashboard</Link>
              </div>
              <div className='hover:text-red-600'>
                <Link href={'/appointments'}> Appoinments </Link>
              </div>
              <div className='hover:text-red-600'>
                <Link href={'/donation-history'}> Donations History </Link>
              </div>
            </div>
            <div className='px-3 border rounded-sm'>
              <div>
                <h1 className='font-bold text-xl mt-2'>Upcomming Appointment</h1>
                <div className='m-2 h-28 border bg-indigo-300/10 rounded-sm flex justify-between items-center px-2'>
                  <div className='flex items-center gap-2'>
                    <CalendarDaysIcon />
                    <div className='flex flex-col'>
                      <h1 className='text-xl'>Blood Donation Appointment</h1>
                      <p className='text-sm text-gray-600'>March 15,2025 - 10.30 AM </p>
                      <p className='text-sm text-gray-600'>City Blood Bank, Downtown Center</p>
                    </div>
                  </div>
                  <div className=''>
                    <Button className='bg-blue-600 m-2'>
                      Confirm
                    </Button>
                    <Button className='bg-white text-gray-700'>
                      Reshcedule
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <h1 className='font-bold text-xl mt-2'>Recent Activity</h1>
                <div className='flex justify-between items-center gap-2 border rounded-sm h-20 m-2 bg-gray-500/5'>
                  <div className='flex items-center'>
                    <TrophyIcon className='m-2' />
                    <div className='flex flex-col'>
                      <h1 className='text-xl'>Achivement Unlocked: Silver Donor</h1>
                      <p className='text-sm text-gray-600'>5 Successful donations completed</p>
                    </div>
                  </div>
                  <p className='m-4'>2 days ago</p>
                </div>
                <div className='flex justify-between items-center gap-2 border rounded-sm h-20 m-2 bg-gray-500/5'>
                  <div className='flex items-center'>
                    <DropletIcon className='m-2' />
                    <div className='flex flex-col'>
                      <h1 className='text-xl'>Donation Completed</h1>
                      <p className='text-sm text-gray-600'>Thank you for donating at City Blood Bank</p>
                    </div>
                  </div>
                  <p className='m-4'>4 months ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donor