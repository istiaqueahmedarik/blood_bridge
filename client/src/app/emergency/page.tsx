
import { DropletIcon, Send, X } from 'lucide-react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const EmergencyBloodRequestForm = () => {


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="text-center">
                        <DropletIcon className="mx-auto h-12 w-12 text-destructive" />
                        <h1 className="mt-2 text-3xl font-bold text-foreground">Emergency Blood Request</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Turn on your location for real-time access</p>
                    </div>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="patientName">Patient Name*</Label>
                                <Input id="patientName" name="patientName" placeholder="Enter Patient Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="patientAge">Age*</Label>
                                <Input id="patientAge" name="patientAge" type="number" placeholder="Enter Patient Age" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bloodGroup">Blood Group Required*</Label>
                                <Input id="bloodGroup" name="bloodGroup" placeholder="Enter Required Blood Group" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unitsRequired">Units Required*</Label>
                                <Input id="unitsRequired" name="unitsRequired" type="number" placeholder="Enter Required Blood Units" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hospitalName">Hospital Name*</Label>
                                <Input id="hospitalName" name="hospitalName" placeholder="Enter Hospital Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hospitalLocation">Hospital Location*</Label>
                                <Input id="hospitalLocation" name="hospitalLocation" placeholder="Enter Hospital Location" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose/Reason*</Label>
                            <Input id="purpose" name="purpose" placeholder="Enter the purpose" className="h-24" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="contactPersonName">Contact Person Name*</Label>
                                <Input id="contactPersonName" name="contactPersonName" placeholder="Enter Contact Person Name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactNumber">Contact Number*</Label>
                                <Input id="contactNumber" name="contactNumber" type="tel" placeholder="Enter contact number" required />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" name="terms" required />
                            <Label htmlFor="terms" className="text-sm font-medium leading-none">
                                I confirm this is an emergency requirement
                            </Label>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <Button type="submit" className="bg-destructive hover:bg-destructive text-background">
                                <Send className="mr-2 h-4 w-4" />
                                Submit Emergency Request
                            </Button>
                            <Button type="button" variant="outline" className="border-destructive text-destructive hover:bg-background">
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block">
                    <Image src="/droplet.svg" alt="Blood Donation Illustration" width={600} height={900} className="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default EmergencyBloodRequestForm

