'use server'

import { post_with_token } from "./req"


export async function send_message(message: string, id: string) {
    const res = await post_with_token(`inbox/api/send/${id}`, { message })

    return res
}