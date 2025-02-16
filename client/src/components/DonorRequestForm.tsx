/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useActionState, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "./date-range-picker"
import dynamic from 'next/dynamic'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { TestAppointment } from '@/app/actions/donor'
const initialState = {
  message: ''
}
export function DonorRequestForm({ data }: { data: any[] }) {
  const [state, formAction, pending] = useActionState(TestAppointment, initialState);
  const MapModal = dynamic(() => import('./map-modal'), { ssr: false })
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')
  const [testLocation, setTestLocation] = useState('Hospital')
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  return (
    <form action={formAction}>
      <Card className="w-full max-w-full mx-auto">
        <CardHeader>
          <CardTitle>Donor Test/Check-Up Request</CardTitle>
          <CardDescription>Request a health check-up or test today. Price is set by the hospital</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">


          <div className="space-y-2">
            <Label>Test Type</Label>
            <Select name='test_type'>
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
            <Input name='symptoms' id="symptoms" placeholder="Mention symptoms or reason for the test" />
          </div>
          <div className="space-y-2">
            <Label>Test Location</Label>
            <RadioGroup defaultValue="Hospital" onValueChange={setTestLocation}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Hospital" id="Hospital" />
                <Label htmlFor="Hospital">Choose Hospital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="map" id="map" />
                <Label htmlFor="map">Choose on Map</Label>
              </div>
            </RadioGroup>
            {testLocation === 'Hospital' && (
              <Select onValueChange={(v) => setLocation(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Hospital" />
                </SelectTrigger>
                <SelectContent>
                  {data.map((l: any, id: any) => {
                    return <div key={id}>
                      <SelectItem value={`${l['latitude']},${l['longitude']}`}>{l['Full_name']}</SelectItem>
                    </div>
                  })}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Selected Location</Label>
            <div className="flex space-x-2">
              <Input name='location' id="location" value={location} readOnly placeholder="No location selected" className="flex-grow" />
              <Button onClick={(e) => {
                e.preventDefault()
                setShowMap(true)
              }} disabled={testLocation !== 'map'}>Open Map</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Date Range</Label>
            <DatePickerWithRange date={date} setDate={setDate} />
            <Input name='start_date' type='hidden' value={date?.from?.toISOString()} />
            <Input name='end_date' type='hidden' value={date?.to?.toISOString()} />
          </div>
          <div className="space-y-2">
            <Label>Preferred Time</Label>
            <div className="flex space-x-2">
              <Select name='start_time'>
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
              <Select name='end_time'>
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
            <Label htmlFor="additional-info">Additional Comments</Label>
            <Input name='add_info' id="additional-info" placeholder="Any additional information or special requests" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full"
            disabled={pending}
            type="submit"
          >
            {pending ? 'Submitting...' : 'Submit Request'}
          </Button>

        </CardFooter>
        <MapModal open={showMap} onOpenChange={setShowMap} onLocationSelect={(loc) => setLocation(loc)} />
      </Card>
      <p>
        {state ? state.message : ''}
      </p>
    </form>
  )
}
