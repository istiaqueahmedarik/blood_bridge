/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import { Droplet } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"



const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
}



export default function DashboardContent({ data, bloodTestsByDay }: any) {


    return (
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
            <motion.div
                className="flex flex-col gap-6 lg:col-span-2"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <motion.div variants={item} className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Overview</h1>
                        <p className="text-muted-foreground">
                            Today&apos;s laboratory statistics
                        </p>
                    </div>

                </motion.div>

                <motion.div variants={item} className="grid gap-6 md:grid-cols-1">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Blood Tests</CardTitle>
                            <Droplet className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {data}
                            </div>

                        </CardContent>
                    </Card>

                </motion.div>

                <motion.div variants={item}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Collect Activity</CardTitle>
                            <CardDescription>
                                Total blood tests collected by day
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    bloodCollect: {
                                        label: "Blood Tests",
                                        color: "hsl(var(--chart-1))",
                                    },

                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={bloodTestsByDay}>
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <ChartTooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="bloodCollect"
                                            stroke="var(--color-bloodCollect)"
                                            strokeWidth={2}
                                        />

                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>




            </motion.div>

        </div>
    )
}


