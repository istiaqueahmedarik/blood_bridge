'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
    id: string
    sender: string
    content: string
    timestamp: string
}

export default function ConversationPage() {
    const params = useParams()
    const conversationId = params.id as string
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetchMessages = async () => {
            const mockMessages: Message[] = [
                { id: '1', sender: 'Hospital', content: 'We urgently need 2 units of A+ blood. Do you have any available?', timestamp: '2023-05-15T10:30:00Z' },
                { id: '2', sender: 'Blood Bank', content: 'Yes, we currently have 3 units of A+ blood available. When do you need them?', timestamp: '2023-05-15T10:35:00Z' },
                { id: '3', sender: 'Hospital', content: 'We need them as soon as possible. Can we arrange for immediate delivery?', timestamp: '2023-05-15T10:40:00Z' },
            ]
            setMessages(mockMessages)
        }

        fetchMessages()
    }, [conversationId])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: Date.now().toString(),
                sender: 'Blood Bank',
                content: newMessage,
                timestamp: new Date().toISOString(),
            }
            setMessages([...messages, newMsg])
            setNewMessage('')
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Conversation</h1>
            <div className="space-y-4 mb-6">
                {messages.map(message => (
                    <Card key={message.id} className={message.sender === 'Blood Bank' ? 'ml-12' : 'mr-12'}>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center text-sm">
                                <span>{message.sender}</span>
                                <span className="text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{message.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex space-x-2">
                <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-grow"
                />
                <Button onClick={handleSendMessage}>Send</Button>
            </div>
        </div>
    )
}

