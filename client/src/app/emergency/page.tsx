import { DropletIcon, Send } from 'lucide-react'
import { Input } from "@/components/ui/input";
import React from 'react'
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/Button';


const page = () => {
  return (
    <div>
        <div className='grid grid-cols-2 my-2 px-8'>
            <div className='grid grid-cols-2 grid-rows-8 gap-4'>
                <div className='col-span-2 items-center justify-center flex flex-col'>
                    <DropletIcon/>
                    <h1 className='text-xl font-semibold'>Emergency Blood Request</h1>
                    <p className='text-sm text-gray-600'>Turn on your location for real-time access your location</p>
                </div>
                <div>
                    <h1>Patient Name*</h1>
                    <Input type="text" placeholder="Enter Patient Name" name="Name"/>
                </div>
                <div>
                    <h1>Age*</h1>
                    <Input type="text" placeholder='Enter Patient Age' name = "patient_age"/>
                </div>
                <div>
                    <h1>Blood Group Required*</h1>
                    <Input type="text" placeholder='Enter Required Blood Group' name = "blood_grp_req"/>
                </div>
                <div>
                    <h1>Units Required*</h1>
                    <Input type="text" placeholder='Enter Required Blood Unit' name = "bloodUnit"/>
                </div>
                <div>
                    <h1>Hospital Name*</h1>
                    <Input type="text" placeholder='Enter Hospital Name' name = "hospital_name"/>
                </div>
                <div>
                    <h1>Hospital Location*</h1>
                    <Input type="text" placeholder='Enter Hospital Locataion' name = "hospital_location"/>
                </div>
                <div className='col-span-2'>
                    <h1>Purpose/Reason*</h1>
                    <Input type="text" placeholder='Enter the purpose' name = "purpose" className='h-16'/>
                </div>
                <div className='mt-2'>
                    <h1>Contact Person Name*</h1>
                    <Input type="text" placeholder='Enter Contact Person Name' name = "contact_person_name"/>
                </div>
                <div className='mt-2'>
                    <h1>Contact Number*</h1>
                    <Input type="text" placeholder='Enter contact number' name = "contact_number"/>
                </div>
                <div className='col-span-2'>
                <Checkbox className="mx-2" />
                    <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                    I do confirm this is an emergency requirment
                    </label>
                </div>
                <div className='col-span-2 flex gap-4 flex-row items-center justify-center mb-4'>
                    <Button>
                        <Send/>
                        <h1>Submit Emergency Request</h1>
                    </Button>
                    <Button className='bg-white/20 text-black font-semibold'>
                        Cancel
                    </Button>
                </div>
            </div>
            <div className='px-16'>
                    <Image src="/droplet.svg" alt="droplet" width={600} height={900}/>
            </div>

        </div>
    </div>
  )
}

export default page