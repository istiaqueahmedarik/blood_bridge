'use client'

import { useState } from "react"
import { Minus, Plus, Maximize } from 'lucide-react'
import { Button } from "@/components/ui/Button"

export default function MapView() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setZoom(Math.min(zoom + 1, 5))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setZoom(Math.max(zoom - 1, 0))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

