/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function page() {
  const [LcImage, setLcImage] = useState<File | null>(null);
  console.log(LcImage);
  const handleLcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLcImage(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center shadow-none border rounded-sm">
      <div className="w-full max-w-4xl overflow-hidden shadow-none">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary flex items-center justify-center space-x-2">
            <Image src="/pharmacy.png" alt="Hospital Icon" width={40} height={40} />
            <span>Institute Registration</span>
          </h1>
          <p className="text-gray-600">We will manually review your information!</p>
          <div className="flex flex-row items-center justify-center">
            <p>Already has account?</p>
            <Link href={'/institute_login'} className="underline">
              Login Here
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form className="space-y-6 ml-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h1>Institute Name</h1>
                <Input type="text" placeholder="Enter Institute Name" name="Institute_name" />
              </div>
              <div className="space-y-2">
                <h1>License no</h1>
                <Input type="text" placeholder="License no" name="license_no" />
              </div>
              <div className="space-y-2">
                <h1>Email</h1>
                <Input type="text" placeholder="Email Address" name="Email_Address" />
              </div>
              <div className="space-y-2">
                <h1>Phone Number</h1>
                <Input type="text" placeholder="Phone Number" name="Phone_Number" />
              </div>
              <div className="col-span-2 space-y-2">
                <h1>Address</h1>
                <Input type="text" placeholder="Enter Complete Address" name="address" />
              </div>
              <div className="space-y-2">
                <h1>City</h1>
                <Input type="text" placeholder="Enter City" name="city" />
              </div>
              <div className="space-y-2">
                <h1>State</h1>
                <Input type="text" placeholder="State/Province" name="state_province" />
              </div>
              <div className="space-y-2">
                <h1>Password</h1>
                <Input type="password" placeholder="Password" name="password" />
              </div>
              <div className="space-y-2">
                <h1>Confirm Password</h1>
                <Input type="password" placeholder="Confirm password" name="confirm_password" />
              </div>
            </div>

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
              {/* Blood Group Checkboxes */}
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">A+ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">A-ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">B+ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">B-ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">AB+ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">AB-ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">O+ve</label>
              </div>
              <div>
                <Checkbox className="m-2" />
                <label className="text-sm font-medium">O-ve</label>
              </div>
            </div>

            <div className="flex flex-col mb-8 justify-end col-span-2 gap-2">
              <label htmlFor="LcCard" className="text-sm font-medium">
                Upload License
              </label>
              <input
                type="file"
                id="LcCard"
                accept="image/*"
                onChange={handleLcChange}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button className="bg-slate-700">
                <X /> Cancel
              </Button>
              <Button>Register Hospital</Button>
            </div>
          </form>

          <div className="hidden md:flex items-center justify-center">
            <Image alt="" src="/doctor_standing.svg" height={900} width={700} className="mb-44" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
