'use server'

import { cache } from "react"
import { get_with_token } from "./req"

export const check_type = cache(async () => {
    try {
        const res = await get_with_token('auth/type');
        return res.type;
    }
    catch (error) {
        console.error('Error:', error)
        throw Error('An error occurred')
    }
})