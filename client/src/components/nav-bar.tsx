import Link from "next/link"
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 border-b">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-xl font-semibold">
          🩸
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/donor" className="text-sm font-medium">
            Donor
          </Link>
          <Link href="/blood-bank" className="text-sm font-medium">
            Blood Bank
          </Link>
          <Link href="/hospital" className="text-sm font-medium">
            Medical
          </Link>
          <Link href="/ask" className="text-sm font-medium">
            Ask
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline">Choose User</Button>
        <Button variant="destructive" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Alert
        </Button>
      </div>
    </nav>
  )
}

