/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CheckUpResultPage({ address, date, summary }: any) {

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Check-Up Result</CardTitle>
                <CardDescription>Your health check-up summary is displayed below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="location">Check-Up Location</Label>
                    <Input id="location" value={address} readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Check-Up Date</Label>
                    <Input id="date" value={new Date(date).toLocaleDateString()} readOnly />
                </div>
                <div className="space-y-2">
                    <Label>Health Summary</Label>
                    <div>
                        {summary}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">

                <Button onClick={() => window.print()} variant="outline">Print Report</Button>
            </CardFooter>
        </Card>
    )
}

export default CheckUpResultPage
