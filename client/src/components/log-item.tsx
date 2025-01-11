import React from 'react'
import { motion } from 'framer-motion'
import { Droplet, Check, FileText } from 'lucide-react'

export interface LogItemProps {
  type: 'request' | 'accepted' | 'offer'
  message: string
  timestamp: string
}

const iconMap = {
  request: Droplet,
  accepted: Check,
  offer: FileText,
}

const colorMap = {
  request: 'text-red-500',
  accepted: 'text-green-500',
  offer: 'text-blue-500',
}

export function LogItem({ type, message, timestamp }: LogItemProps) {
  const Icon = iconMap[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md"
    >
      <div className={`flex-shrink-0 ${colorMap[type]}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </motion.div>
  )
}

