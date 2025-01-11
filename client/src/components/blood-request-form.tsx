'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import dynamic from 'next/dynamic'


export function BloodRequestForm() {
  const MapModal = dynamic(() => import('./map-modal'), { ssr: false })
  const [date, setDate] = useState<Date>()
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')
  const [testLocation, setTestLocation] = useState('Blood Bank')



  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-red-50 border-b border-red-100">
        <CardTitle className="text-2xl font-bold text-red-800">Blood Request Form</CardTitle>
        <CardDescription className="text-red-600">Please fill out the form to request blood.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="bloodType" className="text-sm font-medium text-gray-700">Blood Type Needed</Label>
          <Select>
            <SelectTrigger id="bloodType" className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="units" className="text-sm font-medium text-gray-700">Number of Units</Label>
          <Input
            id="units"
            type="number"
            placeholder="Enter number of units needed"
            className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Urgency Level</Label>
          <RadioGroup defaultValue="normal" className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id="normal" className="text-red-500 focus:ring-red-500" />
              <Label htmlFor="normal" className="text-sm text-gray-700">Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" className="text-red-500 focus:ring-red-500" />
              <Label htmlFor="urgent" className="text-sm text-gray-700">Urgent</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="emergency" id="emergency" className="text-red-500 focus:ring-red-500" />
              <Label htmlFor="emergency" className="text-sm text-gray-700">Emergency</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Test Location</Label>
          <RadioGroup defaultValue="Blood Bank" onValueChange={setTestLocation}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Blood Bank" id="Blood Bank" />
              <Label htmlFor="Blood Bank">Choose Blood Bank</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="map" id="map" />
              <Label htmlFor="map">Choose on Map</Label>
            </div>
          </RadioGroup>
          {testLocation === 'Blood Bank' && (
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a Blood Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Blood Bank-1">Dhaka Medical College Blood Bank</SelectItem>
                <SelectItem value="Blood Bank-2">Square Blood Bank</SelectItem>
                <SelectItem value="Blood Bank-3">United Blood Bank</SelectItem>
                <SelectItem value="Blood Bank-4">Apollo Blood Bank</SelectItem>
                <SelectItem value="Blood Bank-5">Ma-Shisho Blood Bank</SelectItem>
                <SelectItem value="Blood Bank-6">Central Blood Bank</SelectItem>
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
          <Label htmlFor="date" className="text-sm font-medium text-gray-700">Required By Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-300 focus:border-red-500 focus:ring-red-500",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason" className="text-sm font-medium text-gray-700">Reason for Request</Label>
          <Textarea
            id="reason"
            placeholder="Please provide the reason for the blood request"
            className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact" className="text-sm font-medium text-gray-700">Contact Information</Label>
          <Input
            id="contact"
            placeholder="Enter your contact number"
            className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t border-gray-200">
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Submit Blood Request</Button>
      </CardFooter>
      <MapModal
        open={showMap}
        onOpenChange={setShowMap}
        onLocationSelect={(loc) => {
          setLocation(loc)
          setShowMap(false)
        }}
      />
    </Card>
  )
}

