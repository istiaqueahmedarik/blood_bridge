/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"

const chartConfig = {
    total: {
        label: "total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

function ChartTooltipEnhanced({ active, payload, label }: any) {
    if (active && payload && payload.length) {
        const data = payload[0]?.payload
        return (
            <div className="bg-gray-100 p-2 rounded shadow">
                <div>
                    <strong>{label}</strong>
                </div>
                <div>Total Donations: {data.total}</div>
            </div>
        )
    }
    return null
}



export default function DonationChart({ data }: { data: any[] }) {
    console.log(data);
    const [groupBy, setGroupBy] = useState<"year" | "month" | "date">("year")

    const aggregatedData = useMemo(() => {
        if (!data || data.length === 0) return []
        const groups: { [key: string]: number } = {}
        data.forEach((item) => {
            const d = new Date(item.Date)
            let key = ""
            if (groupBy === "year") {
                key = d.getFullYear().toString()
            } else if (groupBy === "month") {
                key =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1).toString().padStart(2, "0")
            } else if (groupBy === "date") {
                key = d.toISOString().split("T")[0]
            }
            groups[key] = (groups[key] || 0) + 1
        })
        return Object.entries(groups)
            .map(([label, total]) => ({ label, total }))
            .sort((a, b) => (a.label > b.label ? 1 : -1))
    }, [data, groupBy])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Donation Chart</CardTitle>
                <CardDescription>
                    Your donation chart aggregated by {groupBy}
                </CardDescription>
                <div className="mt-2">
                    <label htmlFor="groupBy" className="mr-2 text-sm">
                        Group By:
                    </label>
                    <select
                        id="groupBy"
                        value={groupBy}
                        onChange={(e) =>
                            setGroupBy(e.target.value as "year" | "month" | "date")
                        }
                        className="rounded border p-1 text-sm"
                    >
                        <option value="year">Year</option>
                        <option value="month">Month</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="max-h-[calc(50svh-theme(spacing.4))] min-w-full"
                >
                    <AreaChart
                        accessibilityLayer
                        data={aggregatedData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipEnhanced />} />
                        <defs>
                            <linearGradient id="filltotal" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-total)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-total)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="total"
                            type="natural"
                            fill="url(#filltotal)"
                            fillOpacity={0.4}
                            stroke="var(--color-total)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
