import { Search, Plus, Send, Check, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Inbox() {
  return (
    <div className='mb-10'>
      <div className="flex-1 p-4 max-h-[80vh] min-h-[70vh] overflow-y-auto" >
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="mt-1">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium mb-1">Arik</div>
            <div className="bg-muted p-3 rounded-lg">
              Are you there?
            </div>
          </div>
        </div>
      </div >

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input placeholder="Write Message..." className="flex-1" />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div >

  )
}

