'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"
import dynamic from 'next/dynamic'

export function DonorRequestForm() {
  const MapModal = dynamic(() => import('./map-modal'), { ssr: false })
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')
  const [testLocation, setTestLocation] = useState('hospital')

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle>Donor Test/Check-Up Request</CardTitle>
        <CardDescription>Request a health check-up or test today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="space-y-2">
          <Label>Blood Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A-positive">A+</SelectItem>
              <SelectItem value="A-negative">A-</SelectItem>
              <SelectItem value="B-positive">B+</SelectItem>
              <SelectItem value="B-negative">B-</SelectItem>
              <SelectItem value="O-positive">O+</SelectItem>
              <SelectItem value="O-negative">O-</SelectItem>
              <SelectItem value="AB-positive">AB+</SelectItem>
              <SelectItem value="AB-negative">AB-</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Test Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select the test type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blood-group-test">Blood Group Test</SelectItem>
              <SelectItem value="hemoglobin-level">Hemoglobin Level Test</SelectItem>
              <SelectItem value="iron-level">Iron Level Test</SelectItem>
              <SelectItem value="platelet-count">Platelet Count Test</SelectItem>
              <SelectItem value="Other-test">Other Test</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="symptoms">Symptoms or Reason</Label>
          <Input id="symptoms" placeholder="Mention symptoms or reason for the test" />
        </div>
        <div className="space-y-2">
          <Label>Test Location</Label>
          <RadioGroup defaultValue="hospital" onValueChange={setTestLocation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hospital" id="hospital" />
              <Label htmlFor="hospital">Choose Hospital</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="map" id="map" />
              <Label htmlFor="map">Choose on Map</Label>
            </div>
          </RadioGroup>
          {testLocation === 'hospital' && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a hospital" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital-1">Dhaka Medical College Hospital</SelectItem>
                <SelectItem value="hospital-2">Square Hospital</SelectItem>
                <SelectItem value="hospital-3">United Hospital</SelectItem>
                <SelectItem value="hospital-4">Apollo Hospital</SelectItem>
                <SelectItem value="hospital-5">Ma-Shisho Hospital</SelectItem>
                <SelectItem value="hospital-6">Central Hospital</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Selected Location</Label>
          <div className="flex space-x-2">
            <Input id="location" value={location} readOnly placeholder="No location selected" className="flex-grow" />
            <Button onClick={() => setShowMap(true)} disabled={testLocation !== 'map'}>Open Map</Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Preferred Date and Time</Label>
          <DatePickerWithRange />
        </div>
        <div className="space-y-2">
          <Label htmlFor="additional-info">Additional Comments</Label>
          <Input id="additional-info" placeholder="Any additional information or special requests" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Request</Button>
      </CardFooter>
      <MapModal open={showMap} onOpenChange={setShowMap} onLocationSelect={(loc) => setLocation(loc)} />
    </Card>
  )
}
