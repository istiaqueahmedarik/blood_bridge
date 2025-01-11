'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Contact {
  name: string;
  avatar: string;
}

export const ChatInterface = ({ contact }: { contact: Contact }) => {
  const [messages, setMessages] = useState<{ id: number; sender: string; content: string }[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    setMessages([
      { id: 1, sender: 'system', content: `Welcome to your chat with ${contact.name}. How can we assist you?` },
    ])
  }, [contact])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', content: input }])
      setInput('')
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, sender: 'system', content: `This is a test message` }])
      }, 1000)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-foreground/10 text-foreground p-4 flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={contact.avatar} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{contact.name}</span>
      </div>
      <ScrollArea className="flex-grow mb-4 p-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.sender === 'user' ? 'U' : contact.name[0]}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
      <div className="flex space-x-2 p-4 bg-background">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  )
}

