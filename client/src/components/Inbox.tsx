'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Inbox() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("messages");
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, []);

  function handleSend() {
    if (!inputValue.trim()) return;
    const newMessage = { id: Date.now(), text: inputValue.trim() };
    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responseMessage = { id: Date.now() + 1, text: "This is a sample response." };
      const updatedWithResponse = [...updated, responseMessage];
      setMessages(updatedWithResponse);
      localStorage.setItem("messages", JSON.stringify(updatedWithResponse));
    }, 1000);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <div className="bg-muted p-3 rounded-lg">{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div className="mb-4">
            <div className="bg-muted p-3 rounded-lg">Typing...</div>
          </div>
        )}
      </div>
      <div className="border-t p-4 flex space-x-2">
        <Input
          placeholder="Write Message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button size="icon" onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

