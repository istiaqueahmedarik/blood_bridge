"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Hospital, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function page() {
  const [LcImage, setLcImage] = useState<File | null>(null); 
  const handleLcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Safely access the first file
      if (file) {
        setLcImage(file); // Save the file for further processing
        
      }
    };
  return (
    <div className="grid grid-cols-2 my-4">
      <div className="gap-2 ml-10 grid grid-cols-2 grid-rows-10">
        <div className="col-span-2 m-auto text-center">
          {/**<Hospital className="w-10 h-10 m-auto text-red-500" />**/}
          <Image src={'/pharmacy.png'} alt="hospital_img" height={50} width={50} className="ml-24"/>
          <h1 className="text-xl font-bold">Institute Registration</h1>
          <h1 className="text-sm text-gray-600">We will manually review your information!</h1>
          <div className="flex flex-row ml-4">
            <p>Already has account?</p>
            <Link href={'/login'} className="underline">
              Login Here
            </Link>
          </div>
        </div>
        <div>
          <h1>Institute Name</h1>
          <Input type="text" placeholder="Enter Institute Name" name="Institute_name" />
        </div>
        <div>
          <h1>License no</h1>
          <Input type="text" placeholder="License no" name="license_no" />
        </div>

        <div>
          <h1>Email</h1>
          <Input type="text" placeholder="Email Address" name="Email_Address" />
        </div>
        <div>
          <h1>Phone Number</h1>
          <Input type="text" placeholder="Phone Number" name="Phone_Number" />
        </div>

        <div className="col-span-2">
          <h1>Address</h1>
          <Input type="text" placeholder="Enter Complete Address" name="address" />
        </div>
        <div>
          <h1>City</h1>
          <Input type="text" placeholder="Enter City" name="city" />
        </div>
        <div>
          <h1>State</h1>
          <Input type="text" placeholder="State/Province" name="state_province" />
        </div>
        <div>
          <h1>Password</h1>
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <div>
          <h1>Comfirm Password</h1>
          <Input type="password" placeholder="Confirm password" name="confirm_password" />
        </div>
        
        {/**Institute Type */}
        <div className="flex flex-row py-8 justify-end col-span-2 gap-2">
        <select
          id="instituteType"
          name="instituteType"
          className="px-4 py-2 border border-gray-300 rounded-md w-full"
          defaultValue=""
        >
          <option value="" disabled>
          Select Type of Institute
          </option>
          <option value="Hospital">Hospital</option>
          <option value="Blood Bank">Blood Bank</option>
        </select>
        </div>



        <div className="grid grid-cols-4">
          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              A+ve
            </label>
          </div>
          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              A-ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              B+ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              B-ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              AB+ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              AB-ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              O+ve
            </label>
          </div>

          <div>
            <Checkbox className="m-2" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              O-ve
            </label>
          </div>
        </div>

        {/**Licence Pic */}
        <div className="flex flex-col mb-8 justify-end col-span-2 gap-2">
            <label htmlFor='nidCard' className='text-black-500 ml-3 text-sm font-medium '>Upload Licence</label>
            <input
              type='file'
              id='LcCard'
              accept='image/*'
              onChange={handleLcChange}
              className='block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark'
            />
          </div>

        

        <div className="flex flex-row mr-0 justify-end col-span-2 gap-2">
          <Button className="max-w-5xl min-w-4xl bg-slate-700"> <X/> Cancel</Button>
          <Button>Register Hospital</Button>
        </div>
      </div>
      <div className="m-auto">
        <Image alt="" src={"/doctor_standing.svg"} height={800} width={500} className="mb-44" />
      </div>

    </div>
  );
}

export default page;
