"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { SparklesIcon } from "./ui/sparkles"


function SearchBar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            layout
            className={`fixed z-50 overflow-hidden ${isOpen ? "inset-0 bg-background/80 backdrop-blur-sm" : "bottom-4 right-4"
                }`}
        >
            <motion.div
                layout
                className={`relative ${isOpen ? "w-full max-w-2xl mx-auto mt-[20vh]" : "w-12 h-12"}`}
                initial={false}
                animate={isOpen ? { borderRadius: 16 } : { borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                <AnimatePresence>
                    {isOpen ? (
                        <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Input className="w-full text-lg py-6 pr-12 pl-4" placeholder="Ask me anything..." autoFocus />
                            <Button
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="button"
                            className="w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Button className="w-full h-full rounded-full" onClick={() => setIsOpen(true)}>
                                <SparklesIcon className="hover:bg-transparent w-32" />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export default SearchBar