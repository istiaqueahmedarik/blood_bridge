'use client'
import Barchart from '@/components/ui/bar-card'
import { profile } from 'console';
import Image from 'next/image';
import React from 'react'

import Layout from "./layout";
import { Button } from '@/components/ui/button';

const myItems = [
  { id: 1, content: 'Item 1', title: 'Title 1', description: 'Description 1', icon: 'Icon1' },
  { id: 2, content: 'Item 2', title: 'Title 2', description: 'Description 2', icon: 'Icon2' },
];




function Page() {
  return (
    <div className='flex flex-row gap-4 justify-between px-4 m-6'>
    <div>
        {/* this is sidebar */}
        <div className='background-white shadow-md rounded-lg p-10'>
          <div className='p-4'>
            <h1 className='text-xl font-semibold'>BloodBridge Admin</h1>
          </div>
          <div>
            <ul className='flex flex-col gap-4 '>
              <li>
                <button className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/admin/addadmin'} className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Add Admin
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/admin/donorslist'} className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Donors
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/admin/bloodbanklist'} className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Blood Bank
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/admin/hospitallist'} className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Hospital
                </button>
              </li>
              <li>
                <button onClick={() => window.location.href = '/admin/pending_approval'} className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Pending Approval
                </button>
              </li>
              <li>
                <button className='text-muted-foreground font-semibold border rounded h-10 p-2 w-full text-left hover:bg-gray-100 cursor-pointer'>
                  Success
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <div className='flex flex-col justify-center items-center gap-4 m-4'>
      <div className='flex flex-row justify-center items-center gap-4'>
 
          <div className='background-white shadow-md rounded-lg p-6 h-36 w-44'>
              <div className='gap-6'>
                <h1 className='text-xl font-semibold'>Donors</h1>
                <p className='text-muted-foreground font-semibold text-2xl'>
                  15
                </p>
              </div>
          </div>
          <div className='background-white shadow-md rounded-lg p-6  h-36 w-44'>
              <div>
                <h1 className='text-xl font-semibold'>Blood Bank</h1>
                <p className='text-muted-foreground font-semibold text-2xl'>
                  36
                </p>
              </div>
          </div> 
          <div className='background-white shadow-md rounded-lg p-6  h-36 w-44'>
              <div>
                <h1 className='text-xl font-semibold'>Hospital</h1>
                <p className='text-muted-foreground font-semibold text-2xl'>
                  25
                </p>
              </div>
          </div> 
          <div className='background-white shadow-md rounded-lg p-6  h-36 '>
              <div>
                <h1 className='text-xl font-semibold'>Pending Approval</h1>
                <p className='text-muted-foreground font-semibold text-2xl'>
                  5
                </p>
              </div>
          </div> 
          <div className='background-white shadow-md rounded-lg p-6  h-36 w-44'>
              <div>
                <h1 className='text-xl font-semibold'>Success</h1>
                <p className='text-muted-foreground font-semibold text-2xl'>
                  60
                </p>
              </div>
          </div> 


        </div>
        <div>
          <Barchart />
        </div>
      </div>
      
      {/* this div is for profile */}
      <div className='w-56  items-center flex flex-col gap-4'> 
            <div className='background-white shadow-md rounded-lg p-6'>
                <div>
                <Image src = {'/rf.jpeg'} alt='profile' width={100} height={100} className='rounded' />
                </div>
                <div>
                  <h1>Sajedullah Aref</h1>
                </div>
                <div>
                  <Button>Edit</Button>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Page


