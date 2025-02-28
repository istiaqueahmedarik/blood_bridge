// 'use client'

// import { useState } from 'react'
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { DatePickerWithRange } from './date-range-picker'
// import dynamic from 'next/dynamic'

// export function BloodAppointmentCard() {
//     const [donationLocation, setDonationLocation] = useState('hospital')
//     const [location, setLocation] = useState('')
//     const MapModal = dynamic(() => import('./map-modal'), { ssr: false })
//     const [showMap, setShowMap] = useState(false)
//     return (
//         <Card className="w-[800px] h-[400px] overflow-hidden">
//             <CardContent className="p-6 grid grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                     <div className="space-y-2">
//                         <Label>Donation Location</Label>
//                         <RadioGroup defaultValue="hospital" onValueChange={setDonationLocation}>
//                             <div className="flex items-center space-x-2">
//                                 <RadioGroupItem value="hospital" id="hospital" />
//                                 <Label htmlFor="hospital">Choose Hospital</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <RadioGroupItem value="map" id="map" />
//                                 <Label htmlFor="map">Choose on Map</Label>
//                             </div>
//                         </RadioGroup>
//                     </div>
//                     {donationLocation === 'hospital' && (
//                         <Select>
//                             <SelectTrigger>
//                                 <SelectValue placeholder="Select a hospital" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="hospital-1">Dhaka Medical College Hospital</SelectItem>
//                                 <SelectItem value="hospital-2">Square Hospital</SelectItem>
//                                 <SelectItem value="hospital-3">United Hospital</SelectItem>
//                                 <SelectItem value="hospital-4">Apollo Hospital</SelectItem>
//                                 <SelectItem value="hospital-5">Ibn Sina Hospital</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     )}
//                     <div className="space-y-2">
//                         <Label htmlFor="location">Selected Location</Label>
//                         <div className="flex space-x-2">
//                             <Input id="location" value={location} readOnly placeholder="No location selected" className="flex-grow" />
//                             <Button onClick={() => setShowMap(true)} disabled={donationLocation !== 'map'}>Open Map</Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="space-y-4">
//                     <div className="space-y-2">
//                         <Label>Preferred Date Range</Label>
//                         <DatePickerWithRange />
//                     </div>
//                     <div className="space-y-2">
//                         <Label>Preferred Time</Label>
//                         <div className="flex space-x-2">
//                             <Select>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Start Time" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="09:00">09:00 AM</SelectItem>
//                                     <SelectItem value="10:00">10:00 AM</SelectItem>
//                                     <SelectItem value="11:00">11:00 AM</SelectItem>
//                                     <SelectItem value="12:00">12:00 PM</SelectItem>
//                                     <SelectItem value="13:00">01:00 PM</SelectItem>
//                                     <SelectItem value="14:00">02:00 PM</SelectItem>
//                                     <SelectItem value="15:00">03:00 PM</SelectItem>
//                                     <SelectItem value="16:00">04:00 PM</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                             <Select>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="End Time" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="10:00">10:00 AM</SelectItem>
//                                     <SelectItem value="11:00">11:00 AM</SelectItem>
//                                     <SelectItem value="12:00">12:00 PM</SelectItem>
//                                     <SelectItem value="13:00">01:00 PM</SelectItem>
//                                     <SelectItem value="14:00">02:00 PM</SelectItem>
//                                     <SelectItem value="15:00">03:00 PM</SelectItem>
//                                     <SelectItem value="16:00">04:00 PM</SelectItem>
//                                     <SelectItem value="17:00">05:00 PM</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         <Label htmlFor="additional-info">Additional Information</Label>
//                         <Input id="additional-info" placeholder="Any additional information or special requirements" />
//                     </div>
//                 </div>
//             </CardContent>
//             <CardFooter>
//                 <Button className="w-full">Schedule Appointment</Button>
//             </CardFooter>
//             <MapModal open={showMap} onOpenChange={setShowMap} onLocationSelect={(loc) => setLocation(loc)} />
//         </Card>
//     )
// }

import React from 'react'


function BloodAppointmentCard() {
    return (
        <div>BloodAppointmentCard</div>
    )
}

export default BloodAppointmentCard