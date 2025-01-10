'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ClockIcon, DropletIcon, MapPinIcon, MoreVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DonationEvent {
    location: string
    date: string
    time: string
    status: "scheduled" | "completed" | "cancelled" | "pending"
    timeAgo?: string
    donationType: string
    appointmentId?: string
}

interface PublicEvent {
    eventName: string
    location: string
    date: string
    time: string
    status: "scheduled" | "completed" | "cancelled" | "pending"
    timeAgo?: string
}

export default function UpComingDonation() {
    const appointments: DonationEvent[] = [
        {
            appointmentId: "APT001",
            location: "Dhaka Medical College Hospital",
            date: "2024-01-15",
            time: "10:30 AM",
            status: "scheduled",
            donationType: "Whole Blood"
        },
        {
            appointmentId: "APT002",
            location: "Bangladesh Red Crescent Society",
            date: "2024-02-01",
            time: "2:15 PM",
            status: "pending",
            donationType: "Plasma"
        }
    ]

    const recentDonations: DonationEvent[] = [
        {
            location: "Chittagong Medical College Hospital",
            date: "2023-12-20",
            time: "11:00 AM",
            status: "completed",
            timeAgo: "20 days ago",
            donationType: "Whole Blood"
        },
        {
            location: "Rajshahi Medical College Hospital",
            date: "2023-11-15",
            time: "3:45 PM",
            status: "completed",
            timeAgo: "2 months ago",
            donationType: "Platelets"
        }
    ]

    const publicEvents: PublicEvent[] = [
        {
            eventName: "Blood Donation Camp",
            location: "Central Park",
            date: "2024-03-10",
            time: "9:00 AM",
            status: "scheduled"
        },
        {
            eventName: "Health Awareness Seminar",
            location: "City Hall",
            date: "2024-04-05",
            time: "11:00 AM",
            status: "pending"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
            case 'completed':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
            default:
                return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Bookings</h2>
                        <Button variant="outline">Schedule New</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        See your scheduled events from your calendar events links.
                    </p>
                    <Tabs defaultValue="upcoming" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="recurring">Recurring</TabsTrigger>
                            <TabsTrigger value="past">Past</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upcoming" className="space-y-4">
                            {appointments.filter(apt => apt.status === "scheduled").map((appointment, index) => (
                                <div
                                    key={index}
                                    className="flex items-start justify-between rounded-lg border p-4 mt-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                {new Date(appointment.date).getDate()}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <DropletIcon className="h-4 w-4 text-red-500" />
                                                <span className="font-medium">{appointment.donationType}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ClockIcon className="h-4 w-4" />
                                                {appointment.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPinIcon className="h-4 w-4" />
                                                {appointment.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                                            {appointment.status}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    Reschedule booking
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Request reschedule
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Edit location
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Invite people
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Cancel event
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="pending" className="space-y-4">
                            {appointments.filter(apt => apt.status === "pending").map((appointment, index) => (
                                <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                {new Date(appointment.date).getDate()}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <DropletIcon className="h-4 w-4 text-red-500" />
                                                <span className="font-medium">{appointment.donationType}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ClockIcon className="h-4 w-4" />
                                                {appointment.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPinIcon className="h-4 w-4" />
                                                {appointment.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={getStatusColor(appointment.status)}>
                                            {appointment.status}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    Reschedule booking
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Request reschedule
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Edit location
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Invite people
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Cancel event
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                        <TabsContent value="past" className="space-y-4">
                            {recentDonations.map((donation, index) => (
                                <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(donation.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                {new Date(donation.date).getDate()}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <DropletIcon className="h-4 w-4 text-red-500" />
                                                <span className="font-medium">{donation.donationType}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ClockIcon className="h-4 w-4" />
                                                {donation.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPinIcon className="h-4 w-4" />
                                                {donation.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={getStatusColor(donation.status)}>
                                            {donation.status}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    View details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Download certificate
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Public Events</h2>
                    </div>
                    <Tabs defaultValue="upcomingPublic" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 lg:w-[600px]">
                            <TabsTrigger value="upcomingPublic">Upcoming</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upcomingPublic" className="space-y-4">
                            {publicEvents.filter(event => event.status === "scheduled").map((event, index) => (
                                <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-2xl font-bold">
                                                {new Date(event.date).getDate()}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="h-4 w-4 text-blue-500" />
                                                <span className="font-medium">{event.eventName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <ClockIcon className="h-4 w-4" />
                                                {event.time}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPinIcon className="h-4 w-4" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={getStatusColor(event.status)}>
                                            {event.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                    </Tabs>
                </div>
            </CardContent>
        </Card>
    )
}

