"use client"

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
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { year: "2019", total: Math.floor(Math.random() * 5) },
    { year: "2020", total: Math.floor(Math.random() * 5) },
    { year: "2021", total: Math.floor(Math.random() * 5) },
    { year: "2022", total: Math.floor(Math.random() * 5) },
    { year: "2023", total: Math.floor(Math.random() * 5) },
    { year: "2024", total: Math.floor(Math.random() * 5) },

]

const chartConfig = {
    total: {
        label: "total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function DonationChart() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Donation Chart</CardTitle>
                <CardDescription>
                    Your donation chart for the last 5 years
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[calc(50svh-theme(spacing.4))]">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
