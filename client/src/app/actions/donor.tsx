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
        const res = await post_with_token('donor/auth/appointment', {
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

        return {
            message: 'Failed to book appointment',
        }
    }
    if (redirectPath) {
        revalidatePath(redirectPath)
        redirect(redirectPath)
    }
}


export async function TestAppointment(prevState: any, formData: FormData) {
    const location = formData.get('location')
    const start_date = formData.get('start_date')
    const end_date = formData.get('end_date')
    const start_time = formData.get('start_time')
    const end_time = formData.get('end_time')
    const add_info = formData.get('add_info')
    const test_type = formData.get('test_type')
    const symptoms = formData.get('symptoms')
    let redirectPath: string | null = null
    try {
        const res = await post_with_token('donor/auth/test_appointment', {
            location,
            start_date,
            end_date,
            start_time,
            end_time,
            add_info,
            test_type,
            symptoms
        })

        revalidatePath('/donor/form')
        if (res.error) {
            return {
                message: 'Failed to book appointment',
            }
        }

        redirectPath = '/donor'
    }
    catch (e) {

        return {
            message: 'Failed to book appointment',
        }
    }
    if (redirectPath) {
        revalidatePath(redirectPath)
        redirect(redirectPath)
    }
}

export async function TakeOffer(prevState: any, formData: FormData) {
    const offer_id = formData.get('offer_id')
    let redirectPath: string | null = null
    try {
        const res = await post_with_token('donor/auth/service/accept', {
            offer_id
        })

        revalidatePath('/donor/service_using')
        if (res.error) {
            return {
                message: 'Failed to book appointment',
            }
        }

        redirectPath = '/donor/service_using'
    }
    catch (e) {

        return {
            message: 'Failed to book appointment',
        }
    }
    if (redirectPath) {
        revalidatePath(redirectPath)
        redirect(redirectPath)
    }

}