import { Clock, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

interface TrackingCardProps {
  donorId: string
  destination: string
  eta: number
  distance: number
  onAccept?: () => void
  onChat?: () => void
}

export default function TrackingCard({
  donorId,
  destination,
  eta,
  distance,
  onAccept,
  onChat,
}: TrackingCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Blood Donation Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Donor {donorId} en route to {destination}
            </p>
            <div className="flex space-x-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>ETA: {eta} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Distance: {distance} km</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={onAccept}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Accept
            </Button>
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 hover:bg-green-100"
              asChild
            >
              <Link href="/inbox/1">Chat</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

