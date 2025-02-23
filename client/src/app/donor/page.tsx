import DonationChart from '@/components/DonationChart'
import BloodDonationTracker from '@/components/UpComingDonation'
import { HandHeart } from 'lucide-react'
import React from 'react'
import { get_with_token } from '../actions/req';

async function page() {

    // const getHistory = await get_with_token('donor/auth/donor_history');
    // const getPublicEvents = await get_with_token('events');
    // const getAppointments = await get_with_token('donor/auth/appointments');
    const [getHistory, getPublicEvents, getAppointments] = await Promise.all(
        [get_with_token('donor/auth/donor_history'),
        get_with_token('events'),
        get_with_token('donor/auth/appointments')]
    );
    console.log(getAppointments);
    const last = getHistory.data[0];
    let last_donation = 0;
    if (last) {
        last_donation = new Date().getMonth() - new Date(last.Date).getMonth();
    }
    const stats = [
        { label: "Total Donations", value: `${getHistory.count}`, unit: "times" },
        { label: "Last Donation", value: `${last_donation}`, unit: "months ago" },
        { label: "Lives Saved", value: `${getHistory.count * 3}`, unit: "" },
    ];
    return (
        <div className='flex flex-col gap-4'>
            <div className=" flex flex-col sm:flex-row h-auto shrink-0 items-center gap-2 border-b bg-background px-4 py-2 justify-center my-auto">
                <div className="flex flex-col sm:flex-row w-full items-center justify-around">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`flex flex-row gap-4 border-b sm:border-b-0 ${index !== 2 ? "sm:border-r-2" : ""
                                } px-4 py-4 w-full items-center mx-auto justify-center`}
                        >
                            <div className="rounded-full bg-muted p-2">
                                <HandHeart size={34} />
                            </div>
                            <div className="flex flex-col">
                                <div className="">{stat.label}</div>
                                <div className="text-xl font-extrabold">
                                    {stat.value}
                                    {stat.unit && <span className="text-xs font-extralight"> {stat.unit}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DonationChart data={getHistory.data} />
            <BloodDonationTracker data={getPublicEvents} appo={getAppointments.appointments} />
        </div>
    )
}

export default page