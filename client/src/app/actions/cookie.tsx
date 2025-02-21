'use server'

import { cookies } from "next/headers"

export async function get_cookie(name: string) {
    return (await cookies()).get(name);
}