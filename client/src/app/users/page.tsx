import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className="min-h-screen bg-background grid place-content-center">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Select Your Type</h1>
                    <p className="text-muted-foreground">
                        You can have only one account with one Email
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Link href="/nid_verify">
                        <Card className="group isolate flex flex-col rounded-2xl bg-popover transition-all hover:bg-primary shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                            <CardContent className="relative z-10 flex-none px-6 order-last pb-6">
                                <h2 className="text-2xl font-bold text-center text-white">Donor</h2>
                            </CardContent>
                            <div className="pointer-events-none relative flex-auto select-none isolate" style={{ minHeight: '10.25rem' }} aria-hidden="true">
                                <div className="absolute inset-0 -bottom-5 z-10 bg-[radial-gradient(50%_100%_at_top,theme(colors.gray.900/0),theme(colors.gray.900/0.68)_61.5%,rgb(33,33,38))]"></div>
                                <div className="absolute inset-x-0 top-full z-10 mt-5 h-12 bg-gray-900"></div>
                                <div className="relative flex h-full items-center justify-center">
                                    <Image
                                        src="/donor.svg"
                                        alt="Donor illustration"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/hospital_verify">

                        <Card className="group isolate flex flex-col rounded-2xl bg-input hover:bg-primary transition-all shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                            <CardContent className="relative z-10 flex-none px-6 order-last pb-6">
                                <h2 className="text-2xl font-bold text-center text-background">Hospital</h2>
                            </CardContent>
                            <div className="pointer-events-none relative flex-auto select-none isolate" style={{ minHeight: '10.25rem' }} aria-hidden="true">
                                <div className="absolute inset-0 -bottom-5 z-10 bg-[radial-gradient(50%_100%_at_top,theme(colors.gray.900/0),theme(colors.gray.900/0.68)_61.5%,rgb(33,33,38))]"></div>
                                <div className="absolute inset-x-0 top-full z-10 mt-5 h-12 bg-gray-900"></div>
                                <div className="relative flex h-full items-center justify-center">
                                    <Image
                                        src="/hospital.svg"
                                        alt="Hospital illustration"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/bloodbank_verify">

                        <Card className="group isolate transition-all flex flex-col rounded-2xl bg-primary hover:bg-destructive shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                            <CardContent className="relative z-10 flex-none px-6 order-last pb-6">
                                <h2 className="text-2xl font-bold text-center text-background">Blood Bank</h2>
                            </CardContent>
                            <div className="pointer-events-none relative flex-auto select-none isolate" style={{ minHeight: '10.25rem' }} aria-hidden="true">
                                <div className="absolute inset-0 -bottom-5 z-10 bg-[radial-gradient(50%_100%_at_top,theme(colors.gray.900/0),theme(colors.gray.900/0.68)_61.5%,rgb(33,33,38))]"></div>
                                <div className="absolute inset-x-0 top-full z-10 mt-5 h-12 bg-gray-900"></div>
                                <div className="relative flex h-full items-center justify-center">
                                    <Image
                                        src="/blood_bank.svg"
                                        alt="Blood Bank illustration"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default page