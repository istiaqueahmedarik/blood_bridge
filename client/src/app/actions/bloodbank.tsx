/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { z } from "zod";
import { post_with_token } from "./req";
import { revalidatePath } from "next/cache";

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
    return {
        isOk: true,
        explanation: "This is the explanation",
        future_cause: "This is the future cause",
        intro: "This is the intro",
        secondary: "This is the secondary",
        others: "This is the others",
    }

}

export async function AddReport(prevState: any, formData: FormData) {
    const user_id = formData.get("user_id");
    const report = formData.get("report");
    const report_data = await doc_extraction(report as string);
    console.log(report_data);
    return {
        'message': 'Report submitted successfully'
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