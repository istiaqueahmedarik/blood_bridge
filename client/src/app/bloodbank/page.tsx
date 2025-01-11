"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Droplet, Heart, Microscope } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"


const testData = [
  { hour: "08:00", bloodTests: 12 },
  { hour: "09:00", bloodTests: 18 },
  { hour: "10:00", bloodTests: 25 },
  { hour: "11:00", bloodTests: 30 },
  { hour: "12:00", bloodTests: 22 },
  { hour: "13:00", bloodTests: 35 },
]

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



export default function DashboardContent() {


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

        <motion.div variants={item} className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Tests</CardTitle>
              <Droplet className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">54</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                +12% from yesterday
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platelet Tests</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                +5% from yesterday
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Other Tests</CardTitle>
              <Microscope className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                +8% from yesterday
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Test Activity</CardTitle>
              <CardDescription>
                Number of tests performed throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  bloodTests: {
                    label: "Blood Tests",
                    color: "hsl(var(--chart-1))",
                  },

                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={testData}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <ChartTooltip />
                    <Line
                      type="monotone"
                      dataKey="bloodTests"
                      stroke="var(--color-bloodTests)"
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



