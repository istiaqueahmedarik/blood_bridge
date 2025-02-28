/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useActionState, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import dynamic from "next/dynamic"
import { AddReq } from "@/app/actions/hospital"

export function BloodRequestForm({ res }: any) {
  const MapModal = dynamic(() => import("./map-modal"), { ssr: false })
  const [date, setDate] = useState<Date>()
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState("")
  const [testLocation, setTestLocation] = useState("Blood Bank")
  const [state, formAction,] = useActionState(AddReq, null);
  return (
    <form action={formAction}>
      <Card className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-red-50 p-6 border-r border-red-100">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold text-red-800">Blood Request Form</CardTitle>
              <CardDescription className="text-red-600 mt-2">Please fill out the form to request blood.</CardDescription>
            </CardHeader>
          </div>
          <div className="md:w-2/3">
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-2">
                <Label htmlFor="bloodType" className="text-sm font-medium text-gray-700">
                  Blood Type Needed
                </Label>
                <Select name="bloodType">
                  <SelectTrigger
                    id="bloodType"
                    className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                  >
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
                <Label htmlFor="units" className="text-sm font-medium text-gray-700">
                  Number of Units
                </Label>
                <Input
                  id="units"
                  type="number"
                  name="units"
                  placeholder="Enter number of units needed"
                  className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Urgency Level</Label>
                <Select name="reqType">
                  <SelectTrigger
                    id="reqType"
                    className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                  >
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>

                  </SelectContent>
                </Select>
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
                {testLocation === "Blood Bank" && (
                  <Select onValueChange={(value) => setLocation(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Blood Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {res?.map((item: any, id: any) => {
                        return <SelectItem key={id} value={item.latitude + ',' + item.longitude}>{item.Full_name}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Selected Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    value={location}
                    readOnly
                    placeholder="No location selected"
                    className="flex-grow"
                  />
                  <Button onClick={() => setShowMap(true)} disabled={testLocation !== "map"}>
                    Open Map
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Required By Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300 focus:border-red-500 focus:ring-red-500",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                  Reason for Request
                </Label>
                <Textarea
                  name="reason"
                  id="reason"
                  placeholder="Please provide the reason for the blood request"
                  className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                  Contact Information
                </Label>
                <Input
                  name="contact"
                  id="contact"
                  placeholder="Enter your contact number"
                  className="w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-200 p-6">
              <Input type="hidden" name="location" value={location} />
              <Input type="hidden" name="req_date" value={date ? new Date(date).toDateString() : ''} />


              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Submit Blood Request</Button>
              {state?.success &&
                <div className={`text-${state.success ? 'green' : 'red'}-500`}>
                  {state.message}
                </div>
              }
            </CardFooter>
          </div>
        </div>
        <MapModal
          open={showMap}
          onOpenChange={setShowMap}
          onLocationSelect={(loc) => {
            setLocation(loc)
            setShowMap(false)
          }}
        />
      </Card>
    </form>
  )
}

