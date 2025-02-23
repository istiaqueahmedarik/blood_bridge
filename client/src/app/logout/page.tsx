import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default function LogoutPage() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form action={logout}>
                <Button formAction={logout} className="max-w-xl" variant="default">
                    Logout
                </Button>
            </form>
        </div>
    )
}

async function logout() {
    'use server'
    const cookieStore = await cookies()
    cookieStore.delete('token')
    redirect('/')
}
