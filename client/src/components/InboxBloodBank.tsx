'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'next-view-transitions'

interface Message {
    id: string
    hospitalName: string
    subject: string
    preview: string
    lastMessageDate: string
}

export default function Inbox() {
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        // Simulated API call to fetch messages
        const fetchMessages = async () => {
            // In a real application, this would be an API call
            const mockMessages: Message[] = [
                { id: '1', hospitalName: 'Central Hospital', subject: 'Urgent A+ Request', preview: 'We urgently need 2 units of A+ blood...', lastMessageDate: '2023-05-15T10:30:00Z' },
                { id: '2', hospitalName: 'City Medical Center', subject: 'O- Blood Request', preview: 'Our User requires 1 unit of O- blood...', lastMessageDate: '2023-05-14T15:45:00Z' },
                { id: '3', hospitalName: 'St. Mary\'s Hospital', subject: 'B+ Blood Availability', preview: 'Do you have 3 units of B+ blood available?', lastMessageDate: '2023-05-13T09:20:00Z' },
            ]
            setMessages(mockMessages)
        }

        fetchMessages()
    }, [])

    return (
        <div className="space-y-4">
            {messages.map(message => (
                <Link key={message.id} href={`/bloodbank/blood/inbox/${message.id}`}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{message.hospitalName}</span>
                                <span className="text-sm text-gray-500">{new Date(message.lastMessageDate).toLocaleString()}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{message.subject}</p>
                            <p className="text-sm text-gray-500">{message.preview}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

