/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";

export default function Inbox({ res, val, token }: any) {
    const [messages, setMessages] = useState<any[]>(res.messages || []);
    const [inputValue, setInputValue] = useState("");

    // Fetch messages from Supabase for the current inbox
    useEffect(() => {
        async function fetchMessages() {
            const { data, error } = await supabase
                .from("Message")
                .select("ID, Text, Inbox_id, created_at")
                .eq("Inbox_id", val.slug)
                .order("created_at", { ascending: true });
            if (error) {
                console.error("Error fetching messages", error);
            } else if (data) {
                // Map DB columns to local message format.
                const formattedMessages = data.map((msg) => ({
                    id: msg.ID,
                    text: msg.Text,
                    // Assuming the current user’s ID is stored under res.res1[0].ID.
                    mine: msg.Inbox_id === res.res1[0].ID,
                }));
                setMessages(formattedMessages);
            }
        }
        fetchMessages();
    }, []);

    // Subscribe to new realtime messages from Supabase
    useEffect(() => {
        const subscription = supabase
            .channel('public:Message')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'Message' },
                (payload: any) => {
                    // Check if the new message belongs to the current inbox
                    if (payload.new.Inbox_id === val.slug) {
                        const newMessage = {
                            id: payload.new.ID || Date.now(),
                            text: payload.new.Text,
                            mine: false
                        };
                        setMessages((prev) => [...prev, newMessage]);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [val.slug]);

    async function handleSend() {
        if (!inputValue.trim()) return;
        const newMessageData = { Text: inputValue.trim(), Inbox_id: val.slug };
        // Insert the new message into the "Message" table
        const { data, error } = await supabase
            .from("Message")
            .insert([newMessageData])
            .single();
        if (error) {
            console.error("Error sending message", error);
            return;
        }
        const sentMessage = {
            id: data.ID,
            text: data.Text,
            mine: true
        };
        setMessages((prev) => [...prev, sentMessage]);
        setInputValue("");
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-4">
                        <div className="bg-muted p-3 rounded-lg">{msg.text}</div>
                    </div>
                ))}
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