/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useActionState, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddReportHospital } from "@/app/actions/bloodbank"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

const imageToBase64 = async (image: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(image)
    })
}



export default function AddRepHospital({ data }: any) {
    console.log("data", data)
    const [userId, setUserId] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [report, setReport] = useState("")
    const [fileName, setFileName] = useState("")
    const [state, formAction, isPending] = useActionState(AddReportHospital, null)
    const [openName, setOpenName] = useState(false)
    const [openEmail, setOpenEmail] = useState(false)
    const [openUserId, setOpenUserId] = useState(false)

    const handleAutofill = useCallback((user: (typeof data)[0]) => {
        setUserId(user.id)
        setFullName(user.fullName)
        setEmail(user.email)
        setOpenName(false)
        setOpenEmail(false)
        setOpenUserId(false)
    }, [])

    const filteredUsers = (input: string, field: "fullName" | "email" | "id") =>
        data.filter((user: any) => user[field]?.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className="flex justify-center items-center bg-input/10 p-4">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-primary">Add New Report</CardTitle>
                    <CardDescription>Enter user details and upload the report file</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full-name" className="text-sm font-medium">
                                    Full Name
                                </Label>
                                <Popover open={openName} onOpenChange={setOpenName}>
                                    <PopoverTrigger asChild>
                                        <Input
                                            type="text"
                                            id="full-name"
                                            name="full_name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Full Name"
                                            className="w-full"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search users..." />
                                            <CommandList>
                                                <CommandEmpty>No user found.</CommandEmpty>
                                                <CommandGroup>
                                                    {filteredUsers(fullName, "fullName").map((user) => (
                                                        <CommandItem key={user.id} onSelect={() => handleAutofill(user)}>
                                                            {user.fullName} ({user.email})
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="user-id" className="text-sm font-medium">
                                    User ID
                                </Label>
                                <Popover open={openUserId} onOpenChange={setOpenUserId}>
                                    <PopoverTrigger asChild>
                                        <Input
                                            type="text"
                                            id="user-id"
                                            name="user_id"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                            placeholder="Enter User ID"
                                            className="w-full"
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0" align="start">
                                        <Command>
                                            <CommandInput placeholder="Search users..." />
                                            <CommandList>
                                                <CommandEmpty>No user found.</CommandEmpty>
                                                <CommandGroup>
                                                    {filteredUsers(userId, "id").map((user) => (
                                                        <CommandItem key={user.id} onSelect={() => handleAutofill(user)}>
                                                            {user.id} - {user.fullName}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <AnimatePresence>
                            {(userId || fullName) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </Label>
                                        <Popover open={openEmail} onOpenChange={setOpenEmail}>
                                            <PopoverTrigger asChild>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Email address"
                                                    className="w-full"
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Search users..." />
                                                    <CommandList>
                                                        <CommandEmpty>No user found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {filteredUsers(email, "email").map((user) => (
                                                                <CommandItem key={user.id} onSelect={() => handleAutofill(user)}>
                                                                    {user.email} ({user.fullName})
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="file-upload" className="text-sm font-medium">
                                            Upload Report
                                        </Label>
                                        <div className="flex items-center space-x-2">
                                            <Input
                                                id="file-upload"
                                                type="file"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    if (!e.target.files) return
                                                    const file = e.target.files[0]
                                                    const base64 = await imageToBase64(file)
                                                    setReport(base64)
                                                    setFileName(file.name)
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById("file-upload")?.click()}
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Choose File
                                            </Button>
                                            <span className="text-sm text-gray-500">{fileName || "No file chosen"}</span>
                                        </div>
                                    </div>

                                    {report && (
                                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                            <h3 className="text-sm font-medium mb-2">File Preview:</h3>
                                            <Image
                                                src={report || "/vercel.svg"}
                                                alt="Report Preview"
                                                className="max-w-full h-auto"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    )}

                                    <Input type="hidden" name="report" value={report} />

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isPending || !userId || !fullName || !email || !report}
                                    >
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            "Upload Report"
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {state?.message && (
                            <p className={`text-sm ${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

