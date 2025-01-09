
import DonationChart from '@/components/DonationChart'
import BloodDonationTracker from '@/components/UpComingDonation'
import { HandHeart } from 'lucide-react'
import React from 'react'

function page() {
    return (
        <div className='flex flex-col gap-4'>
            <div className=" flex flex-col sm:flex-row h-auto shrink-0 items-center gap-2 border-b bg-background px-4 py-2 justify-center my-auto">
                <div className="flex flex-col sm:flex-row w-full items-center justify-around">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex flex-row gap-4 border-b sm:border-b-0 sm:border-r-2 px-4 py-4 w-full items-center mx-auto justify-center">
                            <div className='rounded-full bg-muted p-2'>
                                <HandHeart size={34} />
                            </div>
                            <div className='flex flex-col'>
                                <div className="">Donated</div>
                                <div className="text-xl font-extrabold">0
                                    <span className="text-xs font-extralight"> times</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DonationChart />
            <BloodDonationTracker />
        </div>
    )
}

export default page