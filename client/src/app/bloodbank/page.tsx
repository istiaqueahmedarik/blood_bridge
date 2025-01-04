import { Calendar1, Contact, HandCoinsIcon, Plus, ShieldCheckIcon, TriangleAlertIcon, User } from 'lucide-react'
import React from 'react'



export default function page() {
  return (
    <div>
        <div className='felx flex-row-3 p-16'> {/**Main Dashboard */}
              <div className='grid grid-cols-4 px-20 gap-4'> {/**Top layer */}
                  <div className='flex border justify-between rounded-sm h-28'>
                    <div className='m-2 flex flex-col gap-2'>
                        <h1>Total Donations</h1>
                        <h1 className='text-xl font-semibold'>1,234</h1>
                        <p className='text-sm text-gray-600'>+12% from last month</p>
                    </div>
                    <div className='m-2'>
                      {/**Icon */}
                      <HandCoinsIcon className='size-10'/>
                    </div>
                  </div>
                  <div className='flex border justify-between rounded-sm h-28'>
                    <div className='m-2 flex flex-col gap-2'>
                        <h1>Pending Appoinments</h1>
                        <h1 className='text-xl font-semibold'>28</h1>
                        <p className='text-sm text-gray-600'>Next: Today 2:30 PM</p>
                    </div>
                    <div className='m-2'>
                      {/**Icon */}
                      <Calendar1 className='size-10'/>
                    </div>
                  </div>
                  <div className='flex border justify-between rounded-sm h-28'>
                    <div className='m-2 flex flex-col gap-2'>
                        <h1>Active Donors</h1>
                        <h1 className='text-xl font-semibold'>889</h1>
                        <p className='text-sm text-gray-600'>Last Donation: 2 hours ago</p>
                    </div>
                    <div className='m-2'>
                      {/**Icon */}
                      <Contact className='size-10'/>
                    </div>
                  </div>
                  <div className='flex border justify-between rounded-sm h-28'>
                    <div className='m-2 flex flex-col gap-2'>
                        <h1>Critical Stock</h1>
                        <h1 className='text-xl font-semibold'>2</h1>
                        <p className='text-sm text-gray-600'>A- and B- needed</p>
                    </div>
                    <div className='m-2'>
                      {/**Icon */}
                      <TriangleAlertIcon className='size-10'/>
                    </div>
                  </div>
              </div>
              
              <div className='flex flex-col px-20'> {/**2nd Layer */}
                  <div className='border mt-6 h-16 items-center flex rounded-sm'>
                    <h1 className='text-xl font-bold ml-2'>Blood Inventory Status</h1>
                  </div>
                  <div className='border grid grid-cols-8 rounded-sm'>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>A+</h1>
                      <p className='text-sm text-gray-600'>125 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>A-</h1>
                      <p className='text-sm text-gray-600'>15 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>B+</h1>
                      <p className='text-sm text-gray-600'>25 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>B-</h1>
                      <p className='text-sm text-gray-600'>12 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>O+</h1>
                      <p className='text-sm text-gray-600'>105 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>O-</h1>
                      <p className='text-sm text-gray-600'>50 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>AB+</h1>
                      <p className='text-sm text-gray-600'>95 units</p>
                    </div>
                    <div className=' border mx-4 my-4 p-2 items-center justify-center flex flex-col'>
                      <h1 className='text-xl font-bold'>AB-</h1>
                      <p className='text-sm text-gray-600'>15 units</p>
                    </div>
                  </div>
              </div>
              <div className='grid grid-cols-2 mt-6 px-20 gap-4'>
                    <div className='flex flex-col'> {/**1st Column */}
                          <div className='border rounded-sm'> {/**title here */}
                                <div className='flex justify-between m-3'>
                                    <h1 className='text-xl font-bold'>Upcoming Appointments </h1>
                                    <Plus/>
                                </div>
                          </div>
                          <div className='border'>
                                <div className='flex items-center border justify-between m-6 rounded-sm bg-gray-500/5'>{/**1 pepl */}
                                    <div className='flex items-center gap-2 m-2'>
                                        <User/>
                                        <div className='flex flex-col'>
                                            <h1 className='font-bold'>Aref</h1>
                                            <p className='text-sm text-gray-600'>O+ Blood type</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col m-2'>
                                          <h1 className='font-bold'>Today, 2:30 PM</h1>
                                          <p className='text-sm text-gray-600'>First Time Donor</p>
                                    </div>
                                </div>
                                <div className='flex items-center border justify-between m-6 rounded-sm bg-gray-500/5'>{/**2 pepl */}
                                    <div className='flex items-center gap-2 m-2'>
                                        <User/>
                                        <div className='flex flex-col'>
                                            <h1 className=' font-bold'>Tawsif</h1>
                                            <p className='text-sm text-gray-600'>A+ Blood type</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col m-2 justify-end items-end'>
                                          <h1 className='font-bold'>Tomorrow, 10:00 AM</h1>
                                          <p className='text-sm text-gray-600'>Regular Donor</p>
                                    </div>
                                </div>
                          </div>
                    </div>
                    <div className='flex flex-col'> {/**2nd Column */}
                          <div className='border rounded-sm'> {/**title here */}
                                <div className='flex justify-between m-3'>
                                    <h1 className='text-xl font-bold'>Recent Donations</h1>
                                    <ShieldCheckIcon/>
                                </div>
                          </div>
                          <div className='border'>
                                <div className='flex items-center border justify-between m-6 rounded-sm bg-gray-500/5'>{/**1 pepl */}
                                    <div className='flex items-center gap-2 m-2'>
                                        <User/>
                                        <div className='flex flex-col'>
                                            <h1 className=' font-bold'>Sajedullah</h1>
                                            <p className='text-sm text-gray-600'>O+ Blood type</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col m-2'>
                                          <h1 className='font-bold'>450 ml</h1>
                                          <p className='text-sm text-gray-600'>2 hours ago</p>
                                    </div>
                                </div>
                                <div className='flex items-center border justify-between m-6 rounded-sm  bg-gray-500/5'>{/**2 pepl */}
                                    <div className='flex items-center gap-2 m-2'>
                                        <User/>
                                        <div className='flex flex-col'>
                                            <h1 className='font-bold'>Ariful</h1>
                                            <p className='text-sm text-gray-600'>A+ Blood type</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col m-2'>
                                          <h1 className='font-bold'>350 ml</h1>
                                          <p className='text-sm text-gray-600'>5 hours ago</p>
                                    </div>
                                </div>
                          </div>
                    </div>

              </div>
        </div>
        
    </div>
  )
}