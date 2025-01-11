'use client'
import { Button } from "@/components/ui/button"
import { Input } from './ui/input'
import { ChevronRightCircleIcon } from "lucide-react";
import { useState } from "react";
import { useActions, useUIState } from 'ai/rsc';
import { generateId } from 'ai';
import { ClientMessage } from "@/app/action";



export default function Chat() {

  const [input, setInput] = useState('')
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {conversation.map((message: ClientMessage) => (
            <div
              key={message.id}
              className={`${message.role === 'assistant' ? 'text-right' : 'text-left'
                }`}
            >
              {/* {m.sender === 'loading' ? <div
              >
                <TextShimmerWave className="w-1/2 mx-auto text-foreground">
                  Generating your personalized result...
                </TextShimmerWave>
              </div> : <div
                className={`${m.sender === 'model'
                  ? 'bg-foreground text-background'
                  : 'bg-input text-foreground'
                  } p-4 rounded-2xl inline-block `}
              >
                {m.message}
              </div>

              } */}
              <div
                className={`${message.role === 'assistant'
                  ? 'bg-foreground text-background'
                  : 'bg-input text-foreground'
                  } p-4 rounded-2xl inline-block `}
              >
                {message.display}
              </div>
            </div>
          ))}



        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
          <div className="max-w-3xl mx-auto relative">
            <Input
              type="text"
              placeholder="Enter a prompt here"
              className="w-full p-6 pr-16 rounded-full bg-input border-none focus:ring-2 focus:ring-purple-500"
              name="message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-foreground rounded-full flex items-center justify-center shadow-sm hover:bg-background hover:text-foreground transition-colors"
              aria-label="Add new chat"
              type="submit"
              onClick={async () => {
                setConversation((currentConversation: ClientMessage[]) => [
                  ...currentConversation,
                  { id: generateId(), role: 'user', display: input },
                ]);

                const message = await continueConversation(input);

                setConversation((currentConversation: ClientMessage[]) => [
                  ...currentConversation,
                  message,
                ]);
              }}
            >
              <ChevronRightCircleIcon size={24} />
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

