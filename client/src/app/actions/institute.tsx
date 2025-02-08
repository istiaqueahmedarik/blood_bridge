'use server';
import { z } from "zod";
import { post } from "./req";
import { redirect } from "next/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */

const RegistrationSchema = z
    .object({
        Institute_name: z.string().min(1, "Institute name is required"),
        license_no: z.string().min(1, "License number is required"),
        Email_Address: z.string().email("Invalid email address"),
        Phone_Number: z.string().min(1, "Phone number is required"),
        permanentAddress: z.string().min(1, "Permanent address is required"),
        address: z.string().min(1, "Address is required"),
        city: z.string().min(1, "City is required"),
        upazilla: z.string().min(1, "Upazilla is required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirm_password: z.string().min(6, "Confirm your password"),
        instituteType: z.enum(["Hospital", "Blood Bank"], {
            errorMap: () => ({ message: "Institute type is required" }),
        }),
        LcCard: z.instanceof(File, { message: "License file is required" }),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });





export async function InstituteSignUp(prevState: any, formData: FormData) {
    const lcCardValue = formData.get("LcCard");
    if (!(lcCardValue instanceof File)) {
        return { error: "License file is required" };
    }
    const validatedFields = RegistrationSchema.safeParse({
        Institute_name: formData.get("Institute_name"),
        license_no: formData.get("license_no"),
        Email_Address: formData.get("Email_Address"),
        Phone_Number: formData.get("Phone_Number"),
        permanentAddress: formData.get("permanentAddress"),
        address: formData.get("address"),
        city: formData.get("city"),
        upazilla: formData.get("upazilla"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
        instituteType: formData.get("instituteType"),
        LcCard: lcCardValue,
    })
    console.log(validatedFields);
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.issues[0].message,
        };
    }

    const {
        Institute_name,
        license_no,
        Email_Address,
        Phone_Number,
        permanentAddress,
        address,
        city,
        upazilla,
        password,
        confirm_password,
        instituteType,
        LcCard,
    } = validatedFields.data;

    const payload = new FormData();
    payload.append("Institute_name", Institute_name);
    payload.append("license_no", license_no);
    payload.append("Email_Address", Email_Address);
    payload.append("Phone_Number", Phone_Number);
    payload.append("permanentAddress", permanentAddress);
    payload.append("address", address);
    payload.append("city", city);
    payload.append("upazilla", upazilla);
    payload.append("password", password);
    payload.append("confirm_password", confirm_password);
    payload.append("instituteType", instituteType);
    payload.append("LcCard", LcCard);

    try {
        const res = await fetch(process.env.SERVER_URL + "/institute_signup", {
            method: "POST",
            body: payload,
        });



    }
    catch (error) {
        console.error(error);
        return { error: "Sign up failed!" };
    }
    redirect('/login');

}