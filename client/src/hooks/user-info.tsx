import { Badge } from "@/components/ui/badge"

export const UserInfo = () => {
  return (
    <div className="space-y-2">
      <div>
        <p className="font-semibold">Istiaque Ahmed</p>
        <p className="text-sm text-muted-foreground">Age: 20</p>
      </div>
      <div>
        <div className="font-semibold">Blood Group: <Badge variant="secondary">A+</Badge></div>
        <p className="text-sm text-muted-foreground">Units Required: 2</p>
      </div>
      <div>
        <p className="font-semibold">Hospital: Dhaka Medical College</p>
        <p className="text-sm text-muted-foreground">Location: Dhaka</p>
      </div>
      <div>
        <p className="font-semibold">Contact: +880 1875448172</p>
        <p className="text-sm text-muted-foreground">Emergency Contact</p>
      </div>
    </div>
  )
}

