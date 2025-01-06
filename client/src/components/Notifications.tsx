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
                  <h3 className="mt-1 text-base font-semibold text-foreground">Urgent A+ Blood Needed at City Hospital</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Patient requires 2 units of A+ blood for emergency surgery. Location: City Hospital, Ward 7
                  </p>
                  <div className="mt-4">
                    <Button variant="destructive" size="sm" asChild>
                      <Link href="/respond/1">
                        Respond Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Gift className="h-5 w-5 text-blue-500 mt-1" />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-500">Upcoming Blood Drive</p>
                    <span className="text-sm text-foreground">1 day ago</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-foreground">Community Blood Donation Camp</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Join us for the monthly blood donation camp at Community Center. Your donation can save lives!
                  </p>
                  <div className="mt-2 text-sm text-foreground">
                    <p>March 15, 2025 - 9:00 AM</p>
                    <p>Community Center, Downtown</p>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success Story */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="h-5 w-5 text-green-500 mt-1">❤️</div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-green-500">Donation Success Story</p>
                    <span className="text-sm text-foreground">2 days ago</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-foreground">Your Donation Saved a Life!</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    Your recent blood donation helped save a 6-year-old child during emergency surgery. Thank you for your
                    contribution!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* General Update */}
          <Card className="border-l-4 border-l-foretext-foreground">
            <CardContent className="p-4">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-foreground mt-1" />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">General Update</p>
                    <span className="text-sm text-foreground">3 days ago</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-foreground">New Mobile Blood Collection Unit</h3>
                  <p className="mt-1 text-sm text-secondary-foreground">
                    We&apos;ve added a new mobile blood collection unit to better serve our community. Check the schedule for its
                    location.
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

