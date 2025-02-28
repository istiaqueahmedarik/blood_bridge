/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "./ui/input"
import { DeliverReq, RemoveReq } from "@/app/actions/hospital"
import { useActionState } from "react"

export default function BloodRequestsPage({ res }: any) {


    const [, formAction, pending] = useActionState(RemoveReq, null);
    const [, formAction1, pending1] = useActionState(DeliverReq, null);



    const getStatusBadge = (ins_id: any, is_comp: any, is_delivered: any) => {
        if (ins_id === null) {
            return <Badge variant="outline">pending</Badge>
        }
        else if (is_delivered === false) {
            return <Badge variant="secondary">On the way</Badge>
        }
        return <Badge variant="secondary">Completed</Badge>
    }

    return (
        <div className="container mx-auto py-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-2">
                        <CardTitle>Blood Requests</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Blood Type</TableHead>
                                <TableHead>Request Date</TableHead>
                                <TableHead>Blood Bank Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {res.map((request: any) => (
                                <TableRow key={request.hosp_id}>
                                    <TableCell className="font-medium">{request.Blood_type_req}</TableCell>
                                    <TableCell>{format(request.Date_needed, "PPP")}</TableCell>
                                    <TableCell>{request.Full_name}</TableCell>
                                    <TableCell>{getStatusBadge(request.Institute_id, request.Is_complete, request.is_delivered)}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            {request.Institute_id === null && (
                                                <form action={formAction}>
                                                    <Input type="hidden" name="reqId" value={request.hosp_id} />
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        type="submit"
                                                        disabled={pending}
                                                    >
                                                        {
                                                            pending ? 'Removing...' : 'Remove'
                                                        }
                                                    </Button>
                                                </form>
                                            )}
                                            {request.is_delivered === false && (
                                                <form action={formAction1}>
                                                    <Input type="hidden" name="reqId" value={request.hosp_id} />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        type="submit"
                                                        disabled={pending1}
                                                    >
                                                        {
                                                            pending1 ? 'Submitting...' : 'Delivered?'
                                                        }
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

