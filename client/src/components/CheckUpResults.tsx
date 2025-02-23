/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import CheckUpResultPage from "./CheckUpResultPage"



export default function CheckUpList({ data }: any) {
    const [expandedId, setExpandedId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCards = data.filter(
        (card: any) =>
            card.Full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.Address.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="max-w-6xl mx-auto p-4 space-y-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    className="pl-10"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredCards.map((card: any, id: any) => (
                    <motion.div
                        key={id}
                        initial={false}
                        animate={{ backgroundColor: expandedId === card.id ? "#f4f1ea" : "#ffffff" }}
                        className="border rounded-lg shadow-sm"
                    >
                        <div
                            className="p-4 cursor-pointer flex items-center justify-between"
                            onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 relative rounded-sm overflow-hidden border border-stone-300">
                                    <Image
                                        src={"/logo.svg"}
                                        alt={"logo"}
                                        className="object-cover w-full h-full grayscale"
                                        layout="fill"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-serif text-xl font-bold">{card.Service_name}</h3>
                                    <p className="text-sm text-muted-foreground">{card.Full_name}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                {expandedId === card.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>

                        <AnimatePresence>
                            {expandedId === card.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0">

                                        <CheckUpResultPage
                                            address={card.Address}
                                            date={card.created_at}
                                            summary={`Summary: ${card.intro} ${card.secondary} ${card.others} ${card.future_cause} ${card.explanation}`}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {filteredCards.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No services found matching your search.</div>
            )}
        </div>
    )
}

