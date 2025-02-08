'use client'

import { Button } from "@/components/ui/button"
import { ChevronRightCircleIcon } from 'lucide-react'
import { useState, useEffect, useRef } from "react"
import { useActions, useUIState } from 'ai/rsc'
import { generateId } from 'ai'
import { ClientMessage } from "@/app/actions/action"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export const maxDuration = 30

export default function Chat() {
    const [input, setInput] = useState<string>('')
    const [conversation, setConversation] = useUIState()
    const { continueConversation } = useActions()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [conversation])

    const handleSubmit = async () => {
        if (!input.trim()) return

        setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            { id: generateId(), role: 'user', display: input },
        ])

        const message = await continueConversation(input)
        setInput('')

        setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            message,
        ])
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
            <div className="p-4 bg-background sticky top-0 z-10 shadow-md">
                <div className="max-w-3xl mx-auto relative">
                    <Input
                        type="text"
                        placeholder="Enter a prompt here"
                        className="w-full p-6 pr-16 rounded-full bg-input border-none focus:ring-2 focus:ring-purple-500"
                        name="message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit()
                            }
                        }}
                    />
                    <Button
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-foreground rounded-full flex items-center justify-center shadow-sm hover:bg-background hover:text-foreground transition-colors"
                        aria-label="Send message"
                        type="button"
                        onClick={handleSubmit}
                    >
                        <ChevronRightCircleIcon size={24} />
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-8">
                <div className="max-w-3xl mx-auto space-y-6">
                    {conversation.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <Image src="/logo.svg" alt="Logo" width={500} height={500} className="w-32 h-32 backdrop:blur-lg" />
                        </div>
                    ) : (
                        conversation.map((message: ClientMessage) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div
                                    className={`${message.role === 'assistant'
                                        ? 'bg-muted-foreground/10 text-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                        } p-4 rounded-2xl`}
                                >
                                    {message.display}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}

