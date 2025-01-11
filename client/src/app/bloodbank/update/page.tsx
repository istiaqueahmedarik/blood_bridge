import { ReportUpdate } from '@/components/ReportUpdate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'


function page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Report</CardTitle>
                <CardDescription>Enter User details and upload file</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label htmlFor="User-id" className="block text-sm font-medium text-muted-foreground">
                            User ID
                        </label>
                        <Input
                            type="text"
                            id="User-id"
                            className="mt-1 block w-full rounded-md border-input shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="User-name" className="block text-sm font-medium text-muted-foreground">
                            User Name
                        </label>
                        <Input
                            type="text"
                            id="User-name"
                            className="mt-1 block w-full rounded-md border-input shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <ReportUpdate />
                    </div>

                </form>
            </CardContent>
        </Card >
    )
}

export default page