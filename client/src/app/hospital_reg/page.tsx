import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Hospital } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="grid grid-cols-2 my-4">
      <div className="m-auto grid grid-cols-2 grid-rows-8">
        <div className="col-span-2 m-auto text-center">
          <Hospital className="w-10 h-10 m-auto"/>
          <h1>Hospital Registration</h1>
          <h1>We will manually review your information!</h1>
          <div className="flex flex-row m-auto">
            <p>Already has account?</p>
            <Link href={'/login'}>
                Login Here
            </Link>
          </div>
        </div>
        <div>
          <Input type="text" placeholder="Hospital name" name="hospital_name" />
        </div>
        <div>
          <Input type="text" placeholder="License no" name="license_no" />
        </div>

        <div>
          <Input type="text" placeholder="Email Address" name="Email_Address" />
        </div>
        <div>
          <Input type="text" placeholder="Phone Number" name="Phone_Number" />
        </div>

        <div className="col-span-2">
          <Input type="text" placeholder="Enter Complete Address" name="address" />
        </div>
        <div>
          <Input type="text" placeholder="Enter City" name="city" />
        </div>
        <div>
          <Input type="text" placeholder="state_province" name="state_province" />
        </div>
        <div>
          <Input type="password" placeholder="password" name="password" />
        </div>
        <div>
          <Input type="password" placeholder="confirm_password" name="confirm_password" />
        </div>

        <div className="col-span-2 flex flex-row gap-4">
          <div>
            <Checkbox />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            A+ve
            </label>
        </div>

        <div>
            <Checkbox />
            <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            A-ve
            </label>
        </div>

        <div>
            <Checkbox />
            <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            B+ve
            </label>
        </div>

        <div>
            <Checkbox />
            <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            B-ve
            </label>
        </div>

        <div>
            <Checkbox />
            <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            AB+ve
            </label>
        </div>

          <div>
            <Checkbox />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              AB-ve
            </label>
          </div>

          <div>
            <Checkbox />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              O+ve
            </label>
          </div>
        </div>
        <div>
            <Checkbox />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              O-ve
            </label>
          </div>
        <div className="flex flex-row mr-0 justify-end col-span-2 gap-2">
            <Button className="max-w-5xl min-w-4xl bg-slate-700">Cancel</Button>
            <Button>Register Hospital</Button>


      </div>
      </div>
      <div className="m-auto">
        <Image alt="" src={"/logo.svg"} height={400} width={400} />
      </div>
      
    </div>
  );
}

export default page;
