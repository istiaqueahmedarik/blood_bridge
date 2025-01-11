'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
}

const logs = [
    {
        id: 1,
        message: 'Blood donation request received from Dhaka Medical College.',
        date: '2023-10-01',
    },
    {
        id: 2,
        message: 'Blood inventory updated with new donations.',
        date: '2023-10-05',
    },
    {
        id: 3,
        message: 'Test request submitted for blood sample from Chittagong.',
        date: '2023-10-10',
    },
];

const pendingTestsData = [
    { id: 1, name: "A+", status: "Pending", priority: "High" },
    { id: 2, name: "B-", status: "Pending", priority: "Medium" },
    { id: 3, name: "O+", status: "Pending", priority: "Low" },
    { id: 4, name: "AB-", status: "Pending", priority: "High" },
]

const LogTab = () => {
    return (
        <Card className="w-full max-w-3xl mx-auto bg-background shadow-lg transition-all">
            <CardContent className="p-6">
                <Tabs defaultValue="logs" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="logs" className="text-lg font-semibold">Logs</TabsTrigger>
                        <TabsTrigger value="pending" className="text-lg font-semibold">Pending Tests</TabsTrigger>
                    </TabsList>
                    <AnimatePresence mode="wait">
                        <TabsContent value="logs" key="logs">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Activity Logs</h2>
                                <ScrollArea className="h-64 w-full">
                                    <ul className="space-y-4">
                                        {logs.map((log) => (
                                            <motion.li key={`log-${log.id}`} variants={itemVariants} className="bg-gray-50 p-3 rounded-md relative">
                                                <div className="flex justify-between">
                                                    <span>{log.message}</span>
                                                    <span className='border rounded-full p-4 object-cover'>{log.id}</span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="pending" key="pending">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Blood Tests</h2>
                                <ScrollArea className="h-64 w-full">
                                    <ul className="space-y-4">
                                        {pendingTestsData.map((test) => (
                                            <motion.li key={`test-${test.id}`} variants={itemVariants} className="bg-gray-50 p-3 rounded-md flex justify-between items-center relative">
                                                <span className="absolute top-2 left-2 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                                                    ID: {test.id}
                                                </span>
                                                <div className="pl-16">
                                                    <p className="text-base font-medium text-gray-700">{test.name}</p>
                                                    <p className="text-sm text-gray-500">{test.status}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${test.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                    test.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                    }`}>
                                                    {test.priority}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default LogTab

