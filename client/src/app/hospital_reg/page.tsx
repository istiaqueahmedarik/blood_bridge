import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Hospital } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-2 my-4">
      <div className="gap-2 ml-10 grid grid-cols-2 grid-rows-8">
        <div className="col-span-2 m-auto text-center">
          <Hospital className="w-10 h-10 m-auto text-red-500" />
          <h1 className="text-xl font-bold">Hospital Registration</h1>
          <h1 className="text-sm text-gray-600">We will manually review your information!</h1>
          <div className="flex flex-row ml-4">
            <p>Already has account?</p>
            <Link href={'/login'} className="underline">
              Login Here
            </Link>
          </div>
        </div>
        <div>
          <h1>Hospital Name</h1>
          <Input type="text" placeholder="Hospital name" name="hospital_name" />
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
          <Input type="text" placeholder="state_province" name="state_province" />
        </div>
        <div>
          <h1>Password</h1>
          <Input type="password" placeholder="password" name="password" />
        </div>
        <div>
          <h1>Comfirm Password</h1>
          <Input type="password" placeholder="confirm_password" name="confirm_password" />
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
        <div className="flex flex-row mr-0 justify-end col-span-2 gap-2">
          <Button className="max-w-5xl min-w-4xl bg-slate-700">Cancel</Button>
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
