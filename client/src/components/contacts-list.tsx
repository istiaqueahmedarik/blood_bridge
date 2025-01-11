'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const contacts = [
  { id: 1, name: 'Ariful Islam', avatar: '/ariful.png' },
  { id: 2, name: 'Aref', avatar: '/logo.svg' },
  { id: 3, name: 'Rasiul', avatar: '/logo.svg' },
  { id: 4, name: 'ABC Blood Bank', avatar: '/logo.svg' },
]

interface ContactsListProps {
  onSelectContact: (contact: { id: number; name: string; avatar: string }) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({ onSelectContact }) => {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-4 p-2 rounded-md hover:bg-accent cursor-pointer"
            onClick={() => onSelectContact(contact)}
          >
            <Avatar>
              <AvatarImage src={contact.avatar} />
              <AvatarFallback>{contact.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">Click to chat</p>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}

