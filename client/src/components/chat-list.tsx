/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"




export function ChatList({ bloodBanks, selectedBloodBank, onSelectBloodBank }: any) {
  return (
    <div className="py-4">
      <h2 className="px-4 text-lg font-semibold mb-4">Blood Banks</h2>
      {bloodBanks.map((bloodBank: any) => (
        <Button
          key={bloodBank.id}
          variant="ghost"
          className={`w-full justify-start px-4 py-2 ${selectedBloodBank?.id === bloodBank.id ? 'bg-accent' : ''
            }`}
          onClick={() => onSelectBloodBank(bloodBank)}
        >
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={bloodBank.avatar} alt={bloodBank.name} />
            <AvatarFallback>{bloodBank.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="truncate">{bloodBank.name}</span>
        </Button>
      ))}
    </div>
  )
}

