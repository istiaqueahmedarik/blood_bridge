'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "./date-range-picker"
import dynamic from 'next/dynamic'

export function BloodDonationForm() {
  const MapModal = dynamic(() => import('./map-modal'), { ssr: false })
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')
  const [donationLocation, setDonationLocation] = useState('hospital')

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle>Blood Donation Appointment</CardTitle>
        <CardDescription>Schedule your life-saving donation today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="space-y-2">
          <Label>Eligibility Checklist</Label>
          <div className="grid gap-2">

            <div className="flex items-center space-x-2">
              <Checkbox id="weight" />
              <label htmlFor="weight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I weigh at least 50 kg.
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="health" />
              <label htmlFor="health" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I am in good health and feeling well
              </label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Donation Location</Label>
          <RadioGroup defaultValue="hospital" onValueChange={setDonationLocation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hospital" id="hospital" />
              <Label htmlFor="hospital">Choose Blood Bank</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="map" id="map" />
              <Label htmlFor="map">Choose on Map</Label>
            </div>
          </RadioGroup>
          {donationLocation === 'hospital' && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a Blood Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital-1">Dhaka Medical College Blood Bank</SelectItem>
                <SelectItem value="hospital-2">Square Blood Bank</SelectItem>
                <SelectItem value="hospital-3">United Blood Bank</SelectItem>
                <SelectItem value="hospital-4">Apollo Blood Bank</SelectItem>
                <SelectItem value="hospital-5">Ibn Sina Blood Bank</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Selected Location</Label>
          <div className="flex space-x-2">
            <Input id="location" value={location} readOnly placeholder="No location selected" className="flex-grow" />
            <Button onClick={() => setShowMap(true)} disabled={donationLocation !== 'map'}>Open Map</Button>
          </div>
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
      <MapModal open={showMap} onOpenChange={setShowMap} onLocationSelect={(loc) => setLocation(loc)} />
    </Card>
  )
}

