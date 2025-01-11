import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'

interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: string
}

interface ConversationViewProps {
  bloodBank: {
    id: number
    name: string
    avatar: string
  }
  messages: Message[]
  onSendMessage: (content: string) => void
}

export function ConversationView({ bloodBank, messages, onSendMessage }: ConversationViewProps) {
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <AvatarImage src={bloodBank.avatar} alt={bloodBank.name} />
            <AvatarFallback>{bloodBank.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{bloodBank.name}</h2>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.senderId === 0 ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.senderId === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.content}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(message.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

