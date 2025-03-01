/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { generateText, Output } from "ai";
import { post_with_token } from "./req";
import { revalidatePath } from "next/cache";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function doc_extraction(image: string) {
    const result = await generateText({
        model: google('gemini-2.0-flash-exp', {
            structuredOutputs: true
        }),

        maxSteps: 10,
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'text', text: "Talk as if you are talking to a patient, You will be given a blood test report, it will have all the necessary information, but if not given any report responsd with isOk=No otherwise your job is to extract all the document from the image, and store it in three part - intro (name and other part) - secondary (test and other stuff), others - (suggestion or something that is not related to blood) , now you will added another section called explanation, it will have all the explanation of the report in plain english so that general public understand also go as detailed as possible and another section called future_cause: it is what might happened or what the patient should do?" },
                    { type: 'image', image: image },
                ],
            },
        ],


        experimental_output: Output.object({
            schema: z.object({
                isOk: z.boolean(),
                explanation: z.string(),
                future_cause: z.string(),
                intro: z.string(),
                secondary: z.string(),
                others: z.string(),
            }),
        }),
    });
    console.log(result);
    return result.experimental_output;
    // return {
    //     isOk: true,
    //     explanation: "This is the explanation",
    //     future_cause: "This is the future cause",
    //     intro: "This is the intro",
    //     secondary: "This is the secondary",
    //     others: "This is the others",
    // }

}



export async function AddReport(prevState: any, formData: FormData) {
    const userId = formData.get("user_id") as string
    const fullName = formData.get("full_name") as string
    const email = formData.get("email") as string
    const report = formData.get("report") as string
    const inventory = formData.get("inventory") as string

    const report_doc = await doc_extraction(report);

    if (!userId || !fullName || !email || !report) {
        return {
            success: false,
            message: "Missing fields",
        }
    }
    if (!report_doc.isOk) {
        return {
            success: false,
            message: "Invalid report",
        }
    }
    console.log(inventory)

    await post_with_token("institute/auth/booked/add_report", {
        userId: userId,
        fullName: fullName,
        email: email,
        report: report,
        inventory: (inventory === "on") ? true : false,
        explanation: report_doc.explanation,
        future_cause: report_doc.future_cause,
        intro: report_doc.intro,
        secondary: report_doc.secondary,
        others: report_doc.others

    })


    revalidatePath("/bloodbank/update")
    return {
        success: true,
        message: "Report added successfully!",
    }
}


export async function AddReportHospital(prevState: any, formData: FormData) {
    const userId = formData.get("user_id") as string
    const fullName = formData.get("full_name") as string
    const email = formData.get("email") as string
    const report = formData.get("report") as string
    const inventory = formData.get("inventory") as string

    const report_doc = await doc_extraction(report);

    if (!userId || !fullName || !email || !report) {
        return {
            success: false,
            message: "Missing fields",
        }
    }
    if (!report_doc.isOk) {
        return {
            success: false,
            message: "Invalid report",
        }
    }
    console.log(inventory)

    await post_with_token("institute/auth/booked/add_report/hospital", {
        userId: userId,
        fullName: fullName,
        email: email,
        report: report,
        inventory: (inventory === "on") ? true : false,
        explanation: report_doc.explanation,
        future_cause: report_doc.future_cause,
        intro: report_doc.intro,
        secondary: report_doc.secondary,
        others: report_doc.others

    })


    revalidatePath("/hospital/update")
    return {
        success: true,
        message: "Report added successfully!",
    }
}


export async function AddBlood(prevState: any, formData: FormData) {
    const bloodType = formData.get("bloodType") as string
    const amount = formData.get("amount") as string

    if (!bloodType || !amount) {
        return {
            success: false,
            message: "Missing fields",
        }
    }

    await post_with_token("institute/auth/inventory/add", {
        bloodType: bloodType,
        amount: amount
    })

    revalidatePath("/bloodbank/update")
    return {
        success: true,
        message: "Blood added successfully!",
    }
}




export async function AcceptRequest(prevState: any, formData: FormData) {
    const appointment_id = formData.get("appointment_id");
    await post_with_token('institute/auth/booked/accept', {
        appointment_id: appointment_id
    });
    revalidatePath('/bloodbank/requests');
    revalidatePath('/hospital/requests');
    return {
        'message': 'Request accepted successfully'
    }
}

export async function AcceptRequestHospital(prevState: any, formData: FormData) {
    const appointment_id = formData.get("appointment_id");
    await post_with_token('institute/auth/booked/accept/hospital', {
        appointment_id: appointment_id
    });
    revalidatePath('/bloodbank/requests');
    revalidatePath('/hospital/requests');
    return {
        'message': 'Request accepted successfully'
    }
}

export async function RejectRequest(selectedRequestId: any, explanation: string) {

    await post_with_token("institute/auth/booked/reject", {
        user_id: selectedRequestId.user_id,
        explanation: explanation,
        appointment_id: selectedRequestId.id
    })
    revalidatePath('/bloodbank/requests');
    revalidatePath('/hospital/requests');
    return {
        'message': 'Request rejected successfully'
    }
}


export async function RejectRequestHospital(selectedRequestId: any, explanation: string) {

    await post_with_token("institute/auth/booked/reject/hospital", {
        user_id: selectedRequestId.user_id,
        explanation: explanation,
        appointment_id: selectedRequestId.id
    })
    revalidatePath('/bloodbank/requests');
    revalidatePath('/hospital/requests');
    return {
        'message': 'Request rejected successfully'
    }
}

export async function ToggleAction(data: any) {

    await post_with_token("institute/auth/booked/app_complete", data)
        .then(() => {
            console.log("Appointment status updated successfully")
        })
        .catch((error: any) => {
            console.error("Error updating appointment status:", error)
            return {
                success: false,
                message: "Error updating appointment status"
            }
        })

    revalidatePath('/bloodbank/requests');
    return {
        'message': 'Request toggled successfully'
    }
}

export async function ToggleActionHospital(data: any) {

    await post_with_token("institute/auth/booked/app_complete/hospital", data)
        .then(() => {
            console.log("Appointment status updated successfully")
        })
        .catch((error: any) => {
            console.error("Error updating appointment status:", error)
            return {
                success: false,
                message: "Error updating appointment status"
            }
        })

    revalidatePath('/hospital/requests');
    return {
        'message': 'Request toggled successfully'
    }
}


export async function AcceptOffer(prevData: any, formData: any) {
    const id = formData.get('id')

    const res = await post_with_token('bloodbank/auth/req_blood/accept', {
        id
    })

        .catch((err: any) => {
            console.log(err)
            return {
                success: false,
                message: err
            }
        })

    if (res.status === 'error') {
        return {
            success: false,
            message: res.message
        }
    }
    revalidatePath('hospital/offer')
    return {
        success: true,
        message: "Request accepted successfully"
    }
}