/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useActionState, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "./date-range-picker"
import { donationAppointment } from '@/app/actions/donor'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import dynamic from 'next/dynamic'
const initialState = {
  message: ''
}


export function BloodDonationForm({ list }: { list: any[] }) {

  const MapModal = dynamic(() => import('@/components/map-modal'), { ssr: false })

  const [state, formAction, pending] = useActionState(donationAppointment, initialState);

  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState('')
  const [donationLocation, setDonationLocation] = useState('hospital')
  const [donationType, setDonationType] = useState('whole_blood')
  const [c1, setC1] = useState(false)
  const [c2, setC2] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <form action={formAction}>

      <Card className="w-full max-w-full mx-auto">
        <CardHeader>
          <CardTitle>Blood Donation Appointment</CardTitle>
          <CardDescription>Schedule your life-saving donation today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          <div className="space-y-2">
            <Label>Type of Donation</Label>
            <RadioGroup defaultValue="whole_blood" name="donation_type" onValueChange={setDonationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whole_blood" id="whole_blood" />
                <Label htmlFor="whole_blood">Whole Blood</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="apheresis" id="apheresis" />
                <Label htmlFor="apheresis">Apheresis</Label>
              </div>
            </RadioGroup>
            <Input name='donationType' type='hidden' value={donationType} />
          </div>

          <div className="space-y-2">
            <Label>Eligibility Checklist</Label>
            <div className="grid gap-2">

              <div className="flex items-center space-x-2">
                <Checkbox id="weight" onClick={() => setC1(prev => !prev)} />
                <label htmlFor="weight" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I weigh at least 50 kg.
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="health"
                  onClick={() => setC2(prev => !prev)}
                />
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
              <Select onValueChange={(v) => setLocation(v)}>
                <SelectTrigger >
                  <SelectValue placeholder="Select a Blood Bank" />
                </SelectTrigger>
                <SelectContent>

                  {list.map((l, id) => {
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
              <Button type="button" onClick={(e) => {
                e.preventDefault()
                setShowMap(true)
              }} disabled={donationLocation !== 'map'}>Open Map</Button>
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
            <Label htmlFor="additional-info">Additional Information</Label>
            <Input name='add_info' id="additional-info" placeholder="Any additional information or special requirements" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full"
            disabled={location === '' || !location || !c1 || !c2 || pending}
          >
            {pending ? 'Processing...' : 'Schedule Appointment'}
          </Button>
        </CardFooter>
        <MapModal open={showMap} onOpenChange={setShowMap} onLocationSelect={(loc) => setLocation(loc)} />
      </Card>
      <p aria-live="polite">{state?.message}</p>
    </form>

  )
}


