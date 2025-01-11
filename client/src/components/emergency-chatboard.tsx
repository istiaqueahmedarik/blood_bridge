'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"


import { ChatInterface } from './chat-interface'
import { LogEntries } from './log-entries'
import { ContactsList } from './contacts-list'
import { UserInfo } from '@/hooks/user-info'
import { MapWithMarkers } from './MapWithMarkers'
import { redirect } from 'next/navigation'

const EmergencyChatboard = () => {
  const [status, setStatus] = useState<'pending' | 'received' | 'cancelled'>('pending')
  const [selectedContact, setSelectedContact] = useState<{ id: number; name: string; avatar: string } | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col"
    >
      <header className="bg-background text-foreground p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Emergency Blood Request Dashboard</h1>
        <StatusControl status={status} setStatus={setStatus} />
      </header>
      <div className="flex-grow flex">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 bg-card border-r"
        >
          <Tabs defaultValue="inbox" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="inbox">Inbox</TabsTrigger>
              <TabsTrigger value="log">Log</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="flex-grow overflow-hidden">
              <ContactsList onSelectContact={setSelectedContact} />
            </TabsContent>
            <TabsContent value="log" className="flex-grow overflow-hidden">
              <LogEntries />
            </TabsContent>
          </Tabs>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow flex"
        >
          <div className="flex-grow">
            {selectedContact ? (
              <ChatInterface contact={selectedContact} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Select a contact to start chatting
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 bg-card border-l"
        >
          <Card className="h-full rounded-none border-0">
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <UserInfo />
              <div className="h-64">

                <MapWithMarkers locations={[{ name: 'Dhaka', latitude: 23.8103, longitude: 90.4125 }, { name: 'Savar', latitude: 23.8583, longitude: 90.2666 }, { name: 'Gazipur', latitude: 23.9996, longitude: 90.4203 }]} className='w-30 h-full' />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

const StatusControl = ({ status, setStatus }: { status: 'pending' | 'received' | 'cancelled', setStatus: React.Dispatch<React.SetStateAction<'pending' | 'received' | 'cancelled'>> }) => {

  function clickHandler() {
    setStatus('received')
    redirect('/')
  }



  return (
    <div className="flex space-x-2">
      <AnimatePresence mode="wait">
        {status === 'pending' && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button variant="outline" className="bg-yellow-500 text-yellow-950" onClick={() => clickHandler()}>
              <Check className="mr-2 h-4 w-4" /> Received Blood
            </Button>
          </motion.div>
        )}
        {status === 'received' && (
          <motion.div
            key="received"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Badge variant="default" className="text-lg py-2 px-4">Blood Received</Badge>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {status !== 'cancelled' && (
          <motion.div
            key="cancel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Button variant="destructive" onClick={() => clickHandler()}>
              <X className="mr-2 h-4 w-4" /> Cancel Request
            </Button>
          </motion.div>
        )}
        {status === 'cancelled' && (
          <motion.div
            key="cancelled"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Badge variant="destructive" className="text-lg py-2 px-4">Request Cancelled</Badge>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EmergencyChatboard

