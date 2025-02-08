/* eslint-disable react-hooks/rules-of-hooks */

"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useState } from "react";
import { InstituteSignUp } from "../actions/institute";

function page() {
  const MapModal = dynamic(() => import('@/components/map-modal'), { ssr: false })
  const [location, setLocation] = useState('')
  const [isMapboxModalOpen, setIsMapboxModalOpen] = useState(false)

  const [state, formAction, isLoading] = useActionState(InstituteSignUp, null);


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
            <Link href={'/login'} className="underline">
              Login Here
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form action={formAction} className="space-y-6 ml-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h1>Institute Name</h1>
                <Input type="text" placeholder="Enter Institute Name" name="Institute_name" />
              </div>
              <div className="space-y-2">
                <h1>License no</h1>
                <Input type="text" placeholder="License no" name="license_no" required />
              </div>
              <div className="space-y-2">
                <h1>Email</h1>
                <Input type="text" placeholder="Email Address" name="Email_Address" required />
              </div>
              <div className="space-y-2">
                <h1>Phone Number</h1>
                <Input type="text" placeholder="Phone Number" name="Phone_Number" required />
              </div>

              <div className="space-y-2 col-span-2">
                <h1>Full Address</h1>
                <div className="flex flex-row gap-4">
                  <Input type="text" placeholder="Enter Complete Address" name="permanentAddress" required />

                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <h1>Address</h1>
                <div className="flex flex-row gap-4">
                  <Input type="text" placeholder="Enter Complete Address" name="address" value={location} readOnly required />
                  <Button className="w-full" type="button" onClick={() => setIsMapboxModalOpen(true)}>
                    Select on Map
                  </Button>
                </div>
              </div>


              <MapModal
                open={isMapboxModalOpen}
                onOpenChange={setIsMapboxModalOpen} onLocationSelect={(loc) => setLocation(loc)}
              />

              <div className="space-y-2">
                <h1>City</h1>
                <Input type="text" placeholder="Enter City" name="city" required />
              </div>
              <div className="space-y-2">
                <h1>Upazilla</h1>
                <Input type="text" placeholder="Upazilla" name="upazilla" required />
              </div>
              <div className="space-y-2">
                <h1>Password</h1>
                <Input type="password" placeholder="Password" name="password" required />
              </div>
              <div className="space-y-2">
                <h1>Confirm Password</h1>
                <Input type="password" placeholder="Confirm password" name="confirm_password" required />
              </div>
            </div>

            <div className="flex flex-row py-8 justify-end col-span-2 gap-2">
              <select
                id="instituteType"
                name="instituteType"
                className="px-4 py-2 border border-gray-300 rounded-md w-full"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select Type of Institute
                </option>
                <option value="Hospital">Hospital</option>
                <option value="Blood Bank">Blood Bank</option>
              </select>
            </div>


            <div className="flex flex-col mb-8 justify-end col-span-2 gap-2">
              <label htmlFor="LcCard" className="text-sm font-medium">
                Upload License
              </label>
              <input
                type="file"
                id="LcCard"
                accept="image/*"
                name="LcCard"
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                required
              />
            </div>

            <div className="flex justify-center space-x-4">
              <Button className="bg-slate-700">
                <X /> Cancel
              </Button>
              <Button disabled={isLoading}>
                {isLoading ? "Loading..." : "Register"}
              </Button>
            </div>
            {state?.error && <p className="text-red-500">{state.error}</p>}
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
