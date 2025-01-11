'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

export default function InventoryPage() {
    const [bloodType, setBloodType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [inventory, setInventory] = useState([
        { type: "A+", amount: 120 },
        { type: "B+", amount: 80 },
        { type: "O-", amount: 50 },
    ])

    function addBlood(e: React.FormEvent) {
        e.preventDefault();
        if (!bloodType || !quantity) return
        const newAmount = parseInt(quantity, 10) || 0
        const updated = [...inventory]
        const found = updated.find((item) => item.type === bloodType)
        if (found) found.amount += newAmount
        else updated.push({ type: bloodType, amount: newAmount })
        setInventory(updated)
        setBloodType("")
        setQuantity("")
    }

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
                        <form onSubmit={addBlood} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8">
                            <div>
                                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                                <Input
                                    id="bloodType"
                                    value={bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                    placeholder="A+, B-, etc."
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (L)</label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Amount"
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="w-full md:w-auto">Add Blood</Button>
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
                                        {inventory.map((item) => (
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

