'use client'

import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

moment.locale('en-GB')
const localizer = momentLocalizer(moment)

interface CalendarModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (selectedTime: Date) => void
}

export function CalendarModal({ isOpen, onClose, onConfirm }: CalendarModalProps) {
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)
    const [availableTimes, setAvailableTimes] = useState([
        { start: new Date(2025, 0, 9, 13, 0), end: new Date(2025, 0, 9, 15, 0), title: 'Available' },
        { start: new Date(2025, 0, 10, 9, 0), end: new Date(2025, 0, 10, 11, 0), title: 'Available' },
        { start: new Date(2025, 0, 10, 14, 0), end: new Date(2025, 0, 10, 16, 0), title: 'Available' },
        { start: new Date(2025, 0, 11, 10, 0), end: new Date(2025, 0, 11, 12, 0), title: 'Available' },
        { start: new Date(2025, 0, 11, 13, 0), end: new Date(2025, 0, 11, 15, 0), title: 'Available' },
    ])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userAvailableTimes, setUserAvailableTimes] = useState([
        { start: new Date(2025, 0, 9, 14, 0), end: new Date(2025, 0, 9, 16, 0) },
        { start: new Date(2025, 0, 10, 10, 0), end: new Date(2025, 0, 10, 12, 0) },
        { start: new Date(2025, 0, 10, 15, 0), end: new Date(2025, 0, 10, 17, 0) },
        { start: new Date(2025, 0, 11, 11, 0), end: new Date(2025, 0, 11, 13, 0) },
    ])
    useEffect(() => {
        const generateRandomTime = () => {
            const now = new Date()
            const startHour = Math.floor(Math.random() * 24)
            const startMinute = Math.floor(Math.random() * 60)
            const endHour = startHour + 1
            const endMinute = startMinute

            const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute)
            const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute)

            return { start: startTime, end: endTime, title: 'Available' }
        }
        
        const newTime = generateRandomTime()
       
            setAvailableTimes([...availableTimes, newTime])
        
        setUserAvailableTimes([...userAvailableTimes, newTime])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        const isAvailable = availableTimes.some(
            (time) => slotInfo.start >= time.start && slotInfo.end <= time.end
        )
        const isUserAvailable = userAvailableTimes.some(
            (time) => slotInfo.start >= time.start && slotInfo.end <= time.end
        )
        if (isAvailable && isUserAvailable) {
            setSelectedTime(slotInfo.start)
        } else {
            alert('Selected time is not available')
        }
    }

    const handleConfirm = () => {
        if (selectedTime) {
            onConfirm(selectedTime)
            setAvailableTimes((prevTimes) =>
                prevTimes.filter(
                    (time) => selectedTime < time.start || selectedTime >= time.end
                )
            )
            setSelectedTime(null)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Select Available Time Slot</DialogTitle>
                </DialogHeader>
                <div className="h-[400px] mt-4">
                    <Calendar
                        localizer={localizer}
                        events={[...availableTimes, ...userAvailableTimes.map(time => ({ ...time, title: 'User Available' }))]}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectSlot={handleSelectSlot}
                        selectable
                        defaultView="week"
                        eventPropGetter={(event, start, end, isSelected) => ({
                            className: cn(
                                event.title === 'User Available' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground',
                                isSelected && 'ring-2 ring-secondary'
                            ),
                        })}
                        dayPropGetter={(date) => ({
                            className: cn(
                                'transition-colors hover:bg-muted/50',
                                selectedTime && date.toDateString() === selectedTime.toDateString() && 'bg-muted'
                            ),
                        })}
                        slotPropGetter={(date) => {
                            const isAvailable = availableTimes.some(
                                (time) => date >= time.start && date < time.end
                            )
                            const isUserAvailable = userAvailableTimes.some(
                                (time) => date >= time.start && date < time.end
                            )
                            return {
                                className: cn(
                                    (!isAvailable || !isUserAvailable) && 'bg-muted text-muted-foreground cursor-not-allowed'
                                ),
                                style: {
                                    pointerEvents: isAvailable && isUserAvailable ? 'auto' : 'none',
                                },
                            }
                        }}
                    />
                </div>
                <div className="mt-4">
                    {selectedTime ? (
                        <p className="text-sm font-medium">
                            Selected time: {selectedTime.toLocaleString()}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            Please select an available time slot
                        </p>
                    )}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedTime}
                        variant={selectedTime ? "default" : "outline"}
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

