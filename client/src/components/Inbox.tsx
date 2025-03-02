/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { send_message } from "@/app/actions/inbox"
import { motion, AnimatePresence } from "framer-motion"
import { useCookies } from 'react-cookie';
import { createClient } from "@supabase/supabase-js"
import { get_with_token } from "@/app/actions/req"



export default function Inbox({ res, val }: any) {
    const [messages, setMessages] = useState<any[]>(res.messages || [])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const handleInserts = (payload: any) => {
        console.log(res.uid, payload.new.sender_id, payload)
        setMessages((prev) => [...prev, { Text: payload.new.Text, owner: res.uid === payload.new.sender_id ? "me" : "other" }])
    }
    const [cookies, ,] = useCookies(['token']);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }



    useEffect(() => {
        async function ws() {
            const sec = cookies.token || ''
            console.log("sec", sec)
            if (sec === '')
                return <></>
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
            console.log(sec, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
            const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
            client.realtime.setAuth(sec)
            const id = val.slug
            const res = await get_with_token(`inbox/api/auth/inbox/${id}`, id)
            console.log(res)
            const iid = res.iid;

            client.channel('Message')
                .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Message',
                    filter: `Inbox_id=eq.${iid}`
                }, handleInserts)
                .subscribe()

            setLoading(false);
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        ws();
        scrollToBottom()

        return () => {
            console.log("unsubscribed")
            // client.channel('Message').unsubscribe()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies])

    async function handleSend() {
        if (!inputValue.trim()) return

        await send_message(inputValue, val.slug)
            .then((res) => {
                setInputValue("")
                return res;
            })
            .catch((err) => {
                console.log(err)
            }
            )
        // setMessages((prev) => [...prev, { Text: inputValue, owner: "me" }])

    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (cookies === undefined)
        return <div>loading...</div>

    return (
        <>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <AnimatePresence initial={false}>
                    {messages.map((msg, id) => (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className={`mb-4 flex ${msg.owner === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-2xl max-w-[70%] ${msg.owner === "me"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none"
                                    }`}
                            >
                                {msg.Text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                    <Input
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700 border-none"
                    />
                    <Button size="icon" onClick={handleSend} className="rounded-full">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

