/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useActionState, } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { AddBlood } from "@/app/actions/bloodbank"

export default function InventoryPage({ inventory }: any) {
    const [state, formAction, pending] = useActionState(AddBlood, null);



    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-3xl font-bold text-gray-800">Blood Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form action={formAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
                            <div>
                                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                                <Input
                                    id="bloodType"
                                    name="bloodType"
                                    placeholder="A+, B-, etc."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (L)</label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    className="w-full"
                                />
                            </div>
                            {state?.success && (
                                <div className="col-span-3">
                                    <div className="bg-green-50 border-l-4 border-green-400 p-4 text-green-700">
                                        {state.message}
                                    </div>
                                </div>
                            )}
                            <Button type="submit" disabled={pending} className="w-full md:w-auto">
                                {pending ? "Adding..." : "Add Blood"}
                            </Button>
                        </form>
                        <div className="h-80 mb-8">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={inventory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="type" stroke="#374151" />
                                    <YAxis stroke="#374151" />
                                    <Tooltip />
                                    <Bar dataKey="amount" fill="#EF4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (L)</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <AnimatePresence>
                                        {inventory.map((item: any) => (
                                            <motion.tr
                                                key={item.type}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

