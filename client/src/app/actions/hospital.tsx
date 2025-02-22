/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { revalidatePath } from "next/cache"
import { post_with_token } from "./req"

export async function AddReq(prevData: any, formData: any) {
    const reqType = formData.get('reqType')
    const req_date = formData.get('req_date')
    const location = formData.get('location')
    const contact = formData.get('contact')
    const reason = formData.get('reason')
    const units = formData.get('units')
    const bloodType = formData.get('bloodType')

    //console.log(reqType, req_date, location, contact, reason, units, bloodType)

    const res = await post_with_token('hospital/auth/req_blood', {
        reqType: reqType,
        req_date: req_date,
        location: location,
        contact: contact,
        reason: reason,
        units: units,
        bloodType: bloodType
    })
        .catch((err: any) => {
            return {
                success: false,
                message: "Failed to add request"
            }
        })

    return {
        success: true,
        message: "Request added successfully"
    }
}

export async function RemoveReq(prevData: any, formData: any) {
    const reqId = formData.get('reqId')
    console.log(reqId)
    const res = await post_with_token('hospital/auth/req_blood/delete', {
        reqId: reqId
    })
        .catch((err: any) => {
            return {
                success: false,
                message: "Failed to remove request"
            }
        })
    revalidatePath('hospital/requested')
    return {
        success: true,
        message: "Request removed successfully"
    }
}

export async function AddOffer(prevData: any, formData: any) {
    const service = formData.get('service')
    const minCoin = formData.get('minCoin')
    const maxCoin = formData.get('maxCoin')
    const expiryDate = formData.get('expiryDate')
    const Details = formData.get('Details')
    console.log(service, minCoin, maxCoin, expiryDate, Details)
    const res = await post_with_token('hospital/auth/offer', {
        Service_name: service,
        minCoin: minCoin,
        maxCoin: maxCoin,
        expDate: expiryDate,
        details: Details
    })
        .catch((err: any) => {
            return {
                success: false,
                message: "Failed to add offer"
            }
        })
    revalidatePath('hospital/offer')
    return {
        success: true,
        message: "Offer added successfully"
    }
}




export async function RemoveOffer(prevData: any, formData: any) {
    const offerId = formData.get('offerId')
    const res = await post_with_token('hospital/auth/offer/delete', {
        offerId: offerId
    })
        .catch((err: any) => {
            return {
                success: false,
                message: "Failed to remove offer"
            }
        })
    revalidatePath('hospital/offer')
    return {
        success: true,
        message: "Offer removed successfully"
    }
}