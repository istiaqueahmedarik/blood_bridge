"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { ConfirmDialog } from "./ui/confirm"

interface BookedTimesListProps {
    bookedTimes: {
        start_time: Date
        end_time: Date
    }[]
    onRemoveBooking: (index: number) => void
}

export function BookedTimesList({ bookedTimes, onRemoveBooking }: BookedTimesListProps) {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const handleRemoveClick = (index: number) => {
        setSelectedIndex(index)
        setConfirmDialogOpen(true)
    }

    const handleConfirmRemove = () => {
        if (selectedIndex !== null) {
            onRemoveBooking(selectedIndex)
            setConfirmDialogOpen(false)
            setSelectedIndex(null)
        }
    }

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Booked Times:</h3>
            {bookedTimes.length > 0 ? (
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {bookedTimes.map((time, index) => (
                        <li key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                            <span>
                                {time.start_time.toLocaleDateString()} {time.start_time.toLocaleTimeString()} - {time.end_time.toLocaleTimeString()}
                            </span>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveClick(index)} className="h-6 w-6">
                                <X className="h-4 w-4" />
                            </Button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No times booked yet.</p>
            )}
            <ConfirmDialog
                isOpen={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmRemove}
                title="Confirm Removal"
                description="Are you sure you want to remove this booked time slot?"
            />
        </div>
    )
}

