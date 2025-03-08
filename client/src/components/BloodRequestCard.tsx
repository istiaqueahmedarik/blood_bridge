/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from 'next-view-transitions'
import { useActionState } from "react"
import { AcceptOffer } from "@/app/actions/bloodbank"
import { Input } from "./ui/input"



export default function BloodRequestCard({ request }: any) {
    const [state, formAction, pending] = useActionState(AcceptOffer, null);
    const urgencyColor = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>{request.Full_name}</CardTitle>
                <Badge className={urgencyColor[request.urgency as keyof typeof urgencyColor]}>{request.urgency} urgency</Badge>
            </CardHeader>
            <CardContent className='flex gap-2 flex-col'>
                <p>Blood Type: {request.Blood_type_req}</p>
                <p>Quantity: {request.Unit_req} units</p>
                <div>Status: {request.Is_complete ? (
                    request.is_delivered ? <Badge className="bg-green-100 text-green-800">Delivered</Badge> : <Badge className="bg-yellow-100 text-yellow-800">On the way</Badge>
                ) : (
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                )}</div>
                {request.Date_needed && (
                    <p>Scheduled Time: {new Date(request.Date_needed).toLocaleString()}</p>
                )}
            </CardContent>
            <CardFooter className="grid auto-rows-min gap-2">
                {!request.Is_complete && (
                    <form action={formAction} >
                        <Input type="hidden" name="id" value={request.ID} />
                        <Button variant="outline" disabled={pending}>
                            {pending ? 'Accepting...' : 'Accept Offer'}
                        </Button>
                        {state?.message && <p className="text-red-500">{state.message}</p>}
                    </form>
                )}
                <Link href={`/bloodbank/inbox/`}>
                    <Button variant="link">Contact Hospital</Button>
                </Link>
            </CardFooter>

        </Card>
    )
}

