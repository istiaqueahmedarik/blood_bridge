"use client"

import { useActionState, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddReport } from "@/app/actions/bloodbank"

const imageToBase64 = async (image: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(image)
    })
}
export default function Page() {
    const [userId, setUserId] = useState("")
    const [report, setReport] = useState('');
    const [state, formAction, pending] = useActionState(AddReport, null)

    return (
        <div className="flex ">
            <Card className="w-full max-w-5xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Add New Report</CardTitle>
                    <CardDescription>Enter User details and upload file</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div>
                            <Label htmlFor="user-id" className="text-sm font-medium text-muted-foreground">
                                User ID
                            </Label>
                            <Input
                                type="text"
                                id="user-id"
                                className="mt-1 block w-full"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                            <Input type="hidden" name='user_id' value={userId} />
                        </div>

                        <AnimatePresence>
                            {userId && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="file-upload" className="text-sm font-medium text-muted-foreground">
                                                Upload File
                                            </Label>
                                            <Input id="file-upload" type="file" className="mt-1 block w-full"
                                                onChange={async (e) => {
                                                    if (!e.target.files) return
                                                    const file = e.target.files[0]
                                                    const base64 = await imageToBase64(file)
                                                    setReport(base64)
                                                }}

                                            />
                                            <Input type="hidden" name='report' value={report} />
                                        </div>

                                        <Button type="submit" className="w-full" disabled={pending}>
                                            {pending ? "Uploading..." : "Upload"}
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {state?.message && <p className="text-red-500">{state.message}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

