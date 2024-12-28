import { Search, X } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import Form from 'next/form'
async function page() {

    return (
        <div className="h-[70vh]  container mx-auto px-4 py-16 grid  place-content-center">
            <div className="max-w-2xl mx-auto text-center border-1 border-input px-12 py-9 rounded-xl">
                <h1 className="text-3xl font-bold mb-4">Ask Your Question / Task</h1>
                <p className="text-muted-foreground mb-8">
                    Our LLM will analyze your query and does your task for you.
                </p>
                <Form action={'/ask/chat'} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="i want O+ blood"
                        className="w-full pl-10 pr-10"
                        name='query'

                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default page