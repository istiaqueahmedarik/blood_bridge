"use client"

import { useRef } from "react"
import html2canvas from "html2canvas"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ServiceCardProps {
    image?: string
    name: string
    id: string
    title: string
    passage: string
    number: string
}

export default function ServiceVer({
    image = "/vercel.svg?height=200&width=200",
    name = "John Doe",
    id = "ID: 12345",
    title = "Service Title",
    passage = "Detailed passage about the service...",
    number = "#098765",
}: ServiceCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const downloadCard = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current)
                const dataUrl = canvas.toDataURL("image/png")
                const link = document.createElement("a")
                link.download = `service-card-${number}.png`
                link.href = dataUrl
                link.click()
            } catch (error) {
                console.error("Error downloading card:", error)
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card ref={cardRef} className="relative p-6 bg-[#f4f1ea] border-2 border-stone-300 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left Column */}
                    <div className="md:w-1/3 space-y-4">
                        <div className="relative w-full aspect-square overflow-hidden rounded-sm border border-stone-300">
                            <Image
                                src={image || "/vercel.svg"}
                                alt={`${name}'s service card`}
                                className="object-cover w-full h-full grayscale"
                                layout="fill"
                            />
                        </div>
                        <div className="space-y-1 text-center md:text-left">
                            <h2 className="font-serif text-xl font-bold">{name}</h2>
                            <p className="font-mono text-sm text-stone-600">{id}</p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:w-2/3 space-y-4">
                        <h1 className="font-serif text-3xl font-bold border-b-2 border-stone-300 pb-2">{title}</h1>
                        <p className="font-serif text-base leading-relaxed whitespace-pre-line">{passage}</p>
                    </div>
                </div>

                {/* Bottom Number */}
                <div className="absolute bottom-2 right-4">
                    <p className="font-mono text-sm text-stone-600">{number}</p>
                </div>
            </Card>

            {/* Download Button */}
            <div className="mt-4 flex justify-end">
                <Button onClick={downloadCard} variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Card
                </Button>
            </div>
        </div>
    )
}

