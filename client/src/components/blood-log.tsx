'use client'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { LogItem, LogItemProps } from './log-item'

export interface BloodLogProps {
  logs: LogItemProps[]
}

export function BloodLog({ logs }: BloodLogProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Activity Log</h2>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 gap-2 p-4">
          {logs.map((log, index) => (
            <LogItem key={index} {...log} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

