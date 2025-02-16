'use client'
import { DropletIcon, Send } from 'lucide-react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useActionState } from 'react'
import { EmergencyReq } from '../actions/emergency'
import { redirect } from 'next/navigation'

const EmergencyBloodRequestForm = () => {

    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
            })
        }
    }, [])


    const [state, formAction, pending] = useActionState(EmergencyReq, null)
    useEffect(() => {
        if (state && state.data) {
            async function logout() {

                for (let i = 0; i < state?.data.length; i++) {
                    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            service_id: 'service_nsfwyrb',
                            template_id: 'template_dqb6ys4',
                            user_id: '-5Yq0qod4i_9g_tOj',
                            template_params: {
                                distance: state!.data[i].distance,
                                link: state!.data[i].link,
                                reply_to: state!.data[i].email,
                            }
                        })
                    })
                        .then((res) => {
                            if (res.ok) {


                            }
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                }
            }
            logout()
            redirect('/emergency/' + state!.data[0].id)
        }

    }, [state])

    return (

        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center shadow-none">
            <Card className="w-full max-w-4xl overflow-hidden shadow-none">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center space-x-2">
                        <DropletIcon className="h-8 w-8 text-destructive" />
                        <span>Emergency Blood Request</span>
                    </CardTitle>
                    <CardDescription>Turn on your location for real-time access</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <form action={formAction} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="patientName">Patient Name*</Label>
                                    <Input id="patientName" name="Name" placeholder="Enter Patient Name" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="patientAge">Age*</Label>
                                    <Input id="patientAge" name="Age" type="number" placeholder="Enter Patient Age" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bloodGroup">Blood Group Required*</Label>
                                    <Select name='Blood_type_req' required>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Blood Group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A+">A+</SelectItem>
                                            <SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem>
                                            <SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem>
                                            <SelectItem value="AB-">AB-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem>
                                            <SelectItem value="O-">O-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unitsRequired">Units Required*</Label>
                                    <Input id="unitsRequired" name="Unit_req" type="number" placeholder="Enter Required Blood Units" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hospitalName">Hospital Name*</Label>
                                    <Input id="hospitalName" name="Hospital_name" placeholder="Enter Hospital Name" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hospitalLocation">Hospital Location*</Label>
                                    <Input id="hospitalLocation" name="Hospital_location" placeholder="Enter Hospital Location" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>

                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="purpose">Purpose/Reason*</Label>
                                <Textarea id="purpose" name="Reason" placeholder="Enter the purpose" required className="min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-primary" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contactPersonName">Contact Person Name*</Label>
                                    <Input id="contactPersonName" name="Contact_name" placeholder="Enter Contact Person Name" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number*</Label>
                                    <Input id="contactNumber" name="Contact_phone" type="tel" placeholder="Enter contact number" required className="transition-all duration-300 focus:ring-2 focus:ring-primary" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" name="terms" required
                                />
                                <Label htmlFor="terms" className="text-sm font-medium leading-none">
                                    I confirm this is an emergency requirement
                                </Label>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <Button type="submit" className="bg-destructive hover:bg-destructive/90 text-destructive-foreground transition-all duration-300"
                                    disabled={pending}
                                >
                                    <div className="flex items-center">
                                        <Send className="mr-2 h-4 w-4" />
                                        {pending ? 'Submitting..' : ' Submit Emergency Request'}
                                    </div>
                                </Button>

                            </div>
                            <div>
                                <Input type="hidden" name="latitude" value={latitude} readOnly />
                                <Input type="hidden" name="longitude" value={longitude} readOnly />
                            </div>
                        </form>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="relative w-full h-full max-w-md">
                                <Image
                                    src="/droplet.svg"
                                    alt="Blood Donation Illustration"
                                    width={400}
                                    height={600}
                                    className="w-full h-auto object-cover rounded-lg  transition-all duration-300 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg" />
                                <div className="absolute bottom-4 left-4 right-4 text-center">
                                    <h2 className="text-xl font-semibold text-primary mb-2">Every Drop Counts</h2>
                                    <p className="text-sm text-muted-foreground/80">Your emergency request can save a life. We&apos;re here to help.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmergencyBloodRequestForm

