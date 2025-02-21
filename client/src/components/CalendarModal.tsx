"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "./ui/button"
import { BookedTimesList } from "./BookedTimesList"
import { Slider } from "./ui/slider"

interface CalendarModalProps {
    isOpen: boolean
    onClose: () => void
    onBooking: (dateTime: {
        start_time: Date
        end_time: Date
    }) => void
    onRemoveBooking: (index: number) => void
    bookedTimes: {
        start_time: Date
        end_time: Date
    }[]
}

export function CalendarModal({ isOpen, onClose, onBooking, onRemoveBooking, bookedTimes }: CalendarModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [timeRange, setTimeRange] = useState([0, 24])

    const handleBooking = () => {
        if (selectedDate) {
            const startTime = new Date(selectedDate)
            startTime.setHours(timeRange[0])
            startTime.setMinutes(0)
            startTime.setSeconds(0)

            const endTime = new Date(selectedDate)
            endTime.setHours(timeRange[1])
            endTime.setMinutes(0)
            endTime.setSeconds(0)

            onBooking({
                start_time: startTime,
                end_time: endTime,
            })
        }
    }

    const formatTimeLabel = (hour: number) => {
        return hour.toString().padStart(2, "0") + ":00"
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[850px] sm:max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Book a Time Slot</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Select Time Range</h3>
                            <Slider min={0} max={23} step={1} value={timeRange} onValueChange={setTimeRange} className="w-full" />
                            <div className="flex justify-between mt-2">
                                <span>{formatTimeLabel(timeRange[0])}</span>
                                <span>{formatTimeLabel(timeRange[1])}</span>
                            </div>
                        </div>
                        <Button onClick={handleBooking} disabled={!selectedDate}>
                            Book Time Slot
                        </Button>
                        <BookedTimesList bookedTimes={bookedTimes} onRemoveBooking={onRemoveBooking} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

