/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { format, subDays } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleActionHospital } from "@/app/actions/bloodbank"


export default function FutureAppHospital({ appointments }: any) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const toggleAppointmentStatus = async (id: string) => {
        const updatedAppointments = appointments.map((appointment: any) =>
            appointment.id === id ? { ...appointment, completed: !appointment.completed } : appointment,
        )

        await ToggleActionHospital({
            donor_id: id,
            completed: updatedAppointments.find((appointment: any) => appointment.id === id)?.completed,
        })


    }

    const filteredAppointments = appointments.filter(
        (appointment: any) => date && (subDays(new Date(appointment.date), 1)).toDateString() === date.toDateString(),
    )

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Blood Bank Appointments</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Select Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {date ? (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">{format(date, "MMMM d, yyyy")}</h2>
                                {filteredAppointments.length > 0 ? (
                                    <ul className="space-y-2">
                                        {filteredAppointments.map((appointment: any) => (
                                            <li key={appointment.id} className="bg-muted px-5 p-3 rounded-full flex justify-between items-center">
                                                <div>
                                                    <span className="font-medium">{(subDays(new Date(appointment.date), 1)).toLocaleTimeString()}</span> - {appointment.name}
                                                    {appointment.completed && <span className="ml-2 text-green-500 text-sm rounded-full">(Completed)</span>}
                                                </div>
                                                <button
                                                    onClick={() => toggleAppointmentStatus(appointment.id)}
                                                    className="px-3 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors  rounded-full"
                                                >
                                                    {appointment.completed ? "Undo" : "Complete"}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted-foreground">No appointments for this date.</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Please select a date to view appointments.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

