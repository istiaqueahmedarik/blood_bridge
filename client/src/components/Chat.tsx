import { Bell } from 'lucide-react'
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/Button"
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Star } from 'coolshapes-react'
import { Input } from './ui/input'

async function rnd() {
  return Math.floor(Math.random() * 12) + 1;
}

export default async function Chat() {
  const idx = await rnd();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback className="bg-blue-500 text-background">a</AvatarFallback>
            </Avatar>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <p>I Want to donate my blood</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback className="bg-transparent">
                <Star
                  index={idx}
                  noise={true}
                  size={100}
                />
              </AvatarFallback>
            </Avatar>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <p>You donated blood 2 days ago. Unfortunately you can&apos;t donate again.</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
          <div className="max-w-3xl mx-auto">
            <Input
              type="text"
              placeholder="Enter a prompt here"
              className="w-full p-6 pr-16 rounded-full bg-input border-none focus:ring-2 focus:ring-purple-500"
            />
            <Button
              className="absolute right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
              aria-label="Add new chat"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

