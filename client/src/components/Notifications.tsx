import { Bell, Gift, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

export default function Notification() {
  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-foreground">Notification</h1>
          <p className="mt-1 text-sm text-secondary-foreground">Stay updated with donation requests and events</p>
        </div>

        <div className="mt-6 space-y-4">
          <Card className="border-l-4 border-destructive">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Bell className="h-5 w-5 text-destructive mt-1" />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-destructive">Emergency Blood Required</p>
                    <span className="text-sm text-secondary-foreground">2 hours ago</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-foreground">Urgent A+ Blood Needed at Dhaka Medical College</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Patient requires 2 units of A+ blood for emergency surgery. Location: Dhaka Medical College Hospital.
                  </p>
                  <div className="mt-4">
                    <Button variant="destructive" size="sm" asChild>
                      <Link href="/emergency/1">
                        Respond Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>



          <Card className="border-l-4 border-l-foretext-foreground">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-foreground mt-1" />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">General Update</p>
                    <span className="text-sm text-foreground">3 days ago</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-foreground">Your report is ready!</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Your latest blood taste report is now available. Click here to view and download it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="w-full max-w-xs">
              Load More Notification
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

