'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CheckUpResultPage() {
    const downloadReport = () => {
        // Simulate report download
        alert('Downloading Check-Up Report...')
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>Check-Up Result</CardTitle>
                <CardDescription>Your health check-up summary is displayed below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Check-Up Details */}
                <div className="space-y-2">
                    <Label htmlFor="location">Check-Up Location</Label>
                    <Input id="location" value="Dhaka Medical College Hospital" readOnly />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Check-Up Date</Label>
                    <Input id="date" value="January 5, 2025" readOnly />
                </div>
                <div className="space-y-2">
                    <Label>Health Summary</Label>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Blood Pressure: 120/80 mmHg</li>
                        <li>Hemoglobin: 14.5 g/dL</li>
                        <li>Blood Sugar Level: Normal</li>
                        <li>Other Notes: Healthy and fit for blood donation.</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={downloadReport} variant="default">Download Report</Button>
                <Button onClick={() => window.print()} variant="outline">Print Report</Button>
            </CardFooter>
        </Card>
    )
}

export default CheckUpResultPage
