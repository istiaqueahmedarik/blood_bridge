import { Button } from '@/components/ui/button'
import { Link } from 'next-view-transitions'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

export default function LogoutPage() {
    return (
        <div className="relative flex min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/logout.png"
                    alt="Inspirational background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
            </div>

            <div className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-white md:items-start md:px-16 lg:px-24">
                <div className="max-w-md">
                    <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">See you soon!</h1>

                    <p className="mb-8 text-lg text-white/80 md:text-xl">
                        Thank you for using our platform. We&apos;re looking forward to your next visit.
                    </p>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <form action={logout}>
                            <Button variant="default" size="lg" type="submit">
                                Logout
                            </Button>
                        </form>

                        <Link href="/">
                            <Button variant="outline" size="lg" className="text-foreground">
                                Return to home
                            </Button>
                        </Link>
                    </div>

                    <p className="mt-12 text-sm text-white/60">
                        &quot;The journey of a thousand miles begins with a single step.&quot; — Lao Tzu
                    </p>
                </div>
            </div>
        </div>
    )
}

async function logout() {
    'use server'
    const cookieStore = await cookies()
    cookieStore.delete('token')
    redirect('/')
}
