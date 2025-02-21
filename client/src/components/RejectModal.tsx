"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface RejectModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (explanation: string) => void
}

export function RejectModal({ isOpen, onClose, onSubmit }: RejectModalProps) {
    const [explanation, setExplanation] = useState("")

    const handleSubmit = () => {
        onSubmit(explanation)
        setExplanation("")
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reject Request</DialogTitle>
                </DialogHeader>
                <Textarea
                    placeholder="Enter rejection explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    className="min-h-[100px]"
                />
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

