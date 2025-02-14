/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ScrollArea } from "@/components/ui/scroll-area"

interface DonationEvent {
    ID: string
    created_at: string
    Donor_id: string
    Location: string;
    Pref_date_start: string;
    Pref_date_end: string;
    Pref_time_start: string;
    Pref_time_end: string;
    Add_info: string | null;
    Completed: boolean;
    Institute_id: string;
    Final_Time: string;
    donationType: string;
    Address: string;
}

interface PublicEvent {
    ID: string
    Time: string
    status: "scheduled" | "completed" | "cancelled" | "pending"
    timeAgo?: string
    Title: string
    Location: string
}

export default function UpComingDonation({ data, appo }: { data: any[], appo: any[] }) {
    const appointments: DonationEvent[] = appo?.filter((apt: any) => apt.Completed === false);
    console.log(appo)
    const recentDonations: DonationEvent[] = appo?.filter((apt: any) => apt.Completed === true);

    const publicEvents: PublicEvent[] = data;

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
                        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="pending">Pending</TabsTrigger>
                            <TabsTrigger value="past">Past</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upcoming" className="space-y-4">
                            <ScrollArea className="max-h-[calc(100svh-theme(spacing.4))] pr-4">
                                {appointments.filter(apt => apt['Institute_id'] !== null).map((appointment, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between rounded-lg border p-4 mt-4"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(appointment.Final_Time).toLocaleDateString('en-US', { weekday: 'short' })}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {new Date(appointment.Final_Time).getDate()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <DropletIcon className="h-4 w-4 text-red-500" />
                                                    <span className="font-medium">{appointment.donationType}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {new Date(appointment.Final_Time).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    {appointment.Address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className={getStatusColor(appointment.Completed === true ? 'completed' : 'scheduled')}>
                                                {appointment.Completed ? 'completed' : 'scheduled'}
                                            </Badge>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">

                                                    <DropdownMenuItem className="text-red-600">
                                                        Cancel event
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="pending" className="space-y-4">
                            <ScrollArea className="h-[400px] pr-4">
                                {appointments.filter(apt => apt['Institute_id'] === null).map((appointment, index) => (
                                    <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(appointment.Final_Time).toLocaleDateString('en-US', { weekday: 'short' })}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {new Date(appointment.Final_Time).getDate()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <DropletIcon className="h-4 w-4 text-red-500" />
                                                    <span className="font-medium">{appointment.donationType}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {new Date(appointment.Final_Time).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    {appointment.Address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className={getStatusColor(appointment.Completed === true ? 'completed' : 'scheduled')}>
                                                {appointment.Completed ? 'completed' : 'scheduled'}
                                            </Badge>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">


                                                    <DropdownMenuItem className="text-red-600">
                                                        Cancel event
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="past" className="space-y-4">
                            <ScrollArea className="h-[400px] pr-4">
                                {recentDonations.map((donation, index) => (
                                    <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(donation.Final_Time).toLocaleDateString('en-US', { weekday: 'short' })}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {new Date(donation.Final_Time).getDate()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <DropletIcon className="h-4 w-4 text-red-500" />
                                                    <span className="font-medium">{donation.donationType}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {new Date(donation.Final_Time).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    {donation.Address}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className={getStatusColor(donation.Completed === true ? 'completed' : 'scheduled')}>
                                                {donation.Completed ? 'completed' : 'scheduled'}
                                            </Badge>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">

                                                    <DropdownMenuItem>
                                                        Download certificate
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>
                <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">Upcoming Public Events</h2>
                    </div>
                    <div className="w-full">
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-4">
                                {publicEvents.filter(event => event.status === "scheduled").map((event, index) => (
                                    <div key={index} className="flex items-start justify-between rounded-lg border p-4 mt-4">
                                        <div className="flex items-start gap-4">
                                            <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(event.Time).toLocaleDateString('en-US', { weekday: 'short' })}
                                                </span>
                                                <span className="text-2xl font-bold">
                                                    {new Date(event.Time).getDate()}
                                                </span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-blue-500" />
                                                    <span className="font-medium">{event.Title}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {new Date(event.Time).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    {event.Location}
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
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </CardContent>

        </Card >
    )
}

