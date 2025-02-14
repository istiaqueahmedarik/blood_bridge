/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { redirect } from "next/navigation"
import { post_with_token } from "./req"
import { revalidatePath } from "next/cache"

export async function donationAppointment(prevState: any, formData: FormData) {
    const location = formData.get('location')
    const start_date = formData.get('start_date')
    const end_date = formData.get('end_date')
    const start_time = formData.get('start_time')
    const end_time = formData.get('end_time')
    const add_info = formData.get('add_info')
    const donationType = formData.get('donation_type')
    let redirectPath: string | null = null
    try {
        const res = post_with_token('donor/auth/appointment', {
            location,
            start_date,
            end_date,
            start_time,
            end_time,
            add_info,
            donationType
        })

        redirectPath = '/donor'
    }
    catch (e) {
        console.log(e);
        return {
            message: 'Failed to book appointment',
        }
    }
    if (redirectPath) {
        revalidatePath(redirectPath)
        redirect(redirectPath)
    }
}
