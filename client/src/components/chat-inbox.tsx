'use client'

import { useState, useEffect } from 'react'
import { ChatList } from "./chat-list"
import { ConversationView } from "./conversation-view"

interface BloodBank {
  id: number
  name: string
  avatar: string
  address: string
  phone: string
  email: string
  operatingHours: string
  availableBloodTypes: string[]
}

interface Message {
  id: number
  senderId: number
  receiverId: number
  content: string
  timestamp: string
}

const bloodBanks: BloodBank[] = [
  {
    id: 1,
    name: "Dhaka Blood Bank",
    avatar: "/logo.svg",
    address: "123 Main St, Dhaka",
    phone: "+880 123-456789",
    email: "info@dhakabloodbank.com",
    operatingHours: "Sun-Thu: 8AM-6PM, Fri: 9AM-3PM",
    availableBloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-"]
  },
  {
    id: 2,
    name: "Chittagong Blood Center",
    avatar: "/logo.svg",
    address: "456 Oak Ave, Chittagong",
    phone: "+880 987-654321",
    email: "contact@chittagongblood.com",
    operatingHours: "Sun-Fri: 7AM-8PM",
    availableBloodTypes: ["A+", "B+", "O+", "O-", "AB+"]
  },
  {
    id: 3,
    name: "Sylhet LifeSaver Blood Bank",
    avatar: "/logo.svg",
    address: "789 Pine Rd, Sylhet",
    phone: "+880 246-813579",
    email: "help@sylhetlifesaver.org",
    operatingHours: "24/7",
    availableBloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  },
]

export function ChatInbox() {
  const [selectedBloodBank, setSelectedBloodBank] = useState<BloodBank | null>(null)
  const [conversations, setConversations] = useState<{ [key: number]: Message[] }>({})

  useEffect(() => {
    const fetchedConversations: { [key: number]: Message[] } = {
      1: [
      ],
      2: [
      ],
      3: [
      ],
    }
    setConversations(fetchedConversations)
    setSelectedBloodBank(bloodBanks[0])
  }, [])

  const sendMessage = (content: string) => {
    if (selectedBloodBank) {
      const newMessage: Message = {
        id: Date.now(),
        senderId: 0,
        receiverId: selectedBloodBank.id,
        content,
        timestamp: new Date().toISOString(),
      }
      setConversations(prev => ({
        ...prev,
        [selectedBloodBank.id]: [...(prev[selectedBloodBank.id] || []), newMessage],
      }))
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-border">
        <ChatList
          bloodBanks={bloodBanks}
          selectedBloodBank={selectedBloodBank}
          onSelectBloodBank={setSelectedBloodBank}
        />
      </div>
      <div className="w-3/4">
        {selectedBloodBank && (
          <ConversationView
            bloodBank={selectedBloodBank}
            messages={conversations[selectedBloodBank.id] || []}
            onSendMessage={sendMessage}
          />
        )}
      </div>

    </div>
  )
}

