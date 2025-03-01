import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, AlertCircleIcon, ArrowRightIcon } from "lucide-react"
import Image from "next/image"

interface CheckUpResultPageProps {
    address: string
    reportImage: string
    date: string
    intro: string
    secondary: string
    others: string
    future_cause: string
    explanation: string
}

export default function CheckUpResultPage({
    address,
    reportImage,
    date,
    intro,
    secondary,
    others,
    future_cause,
    explanation,
}: CheckUpResultPageProps) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Test Result</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{address}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Report image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-square w-full overflow-hidden rounded-md object-center">
                            <Image
                                src={reportImage || "/placeholder.svg"}
                                alt="Medical report visualization"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-1">Overview</h3>
                            <p>{intro}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium mb-1">Key Findings</h3>
                            <p>{secondary}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-2">Additional Observations</h3>
                            <p>{others}</p>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <AlertCircleIcon className="h-5 w-5 text-amber-500" />
                                <span>Potential Health Concerns</span>
                            </h3>
                            <p>{future_cause}</p>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                                <ArrowRightIcon className="h-5 w-5 text-primary" />
                                <span>Doctor&apos;s Explanation</span>
                            </h3>
                            <p className="text-muted-foreground">{explanation}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

