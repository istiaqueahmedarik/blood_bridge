'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"

export function BloodTestForm() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [testType, setTestType] = useState('')

    return (
        <Card className="w-full max-w-full mx-auto">
            <CardHeader>
                <CardTitle>Blood Test Appointment</CardTitle>
                <CardDescription>Schedule your blood test today.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Md. Rahim" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="rahim@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+880 1XXX-XXXXXX" />
                </div>
                <div className="space-y-2">
                    <Label>Test Type</Label>
                    <Select onValueChange={setTestType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select your test type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cbc">Complete Blood Count (CBC)</SelectItem>
                            <SelectItem value="bmp">Basic Metabolic Panel (BMP)</SelectItem>
                            <SelectItem value="cmp">Comprehensive Metabolic Panel (CMP)</SelectItem>
                            <SelectItem value="lipid">Lipid Panel</SelectItem>
                            <SelectItem value="thyroid">Thyroid Panel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Preferred Date Range</Label>
                    <DatePickerWithRange />
                </div>
                <div className="space-y-2">
                    <Label>Preferred Time</Label>
                    <div className="flex space-x-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Start Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="09:00">09:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                <SelectItem value="16:00">04:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="End Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="13:00">01:00 PM</SelectItem>
                                <SelectItem value="14:00">02:00 PM</SelectItem>
                                <SelectItem value="15:00">03:00 PM</SelectItem>
                                <SelectItem value="16:00">04:00 PM</SelectItem>
                                <SelectItem value="17:00">05:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="additional-info">Additional Information</Label>
                    <Input id="additional-info" placeholder="Any additional information or special requirements" />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Schedule Appointment</Button>
            </CardFooter>
        </Card>
    )
}
