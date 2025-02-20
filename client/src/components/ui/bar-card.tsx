"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { month: "November",  donor: 186, recipient: 80 },
  { month: "December",  donor: 305, recipient: 200 },
  { month: "January",   donor: 237, recipient: 120 },
  { month: "Februray",  donor: 73,  recipient: 190 },
  { month: "March",     donor: 209, recipient: 130 },
  { month: "April",     donor: 214, recipient: 140 },
]

const chartConfig = {
  donor: {
    label: "Donor",
    color: "hsl(var(--chart-1))",
  },
  recipent: {
    label: "Recipient",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Barchart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Rate</CardTitle>
        <CardDescription>November - February 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="donor" fill="#f54949" radius={4} />
            <Bar dataKey="recipient" fill="#c4b08d" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Donation rate up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total donor for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default  Barchart
