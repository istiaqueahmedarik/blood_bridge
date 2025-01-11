import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BloodBank {
  id: number
  name: string
  avatar: string
  address: string
  phone: string
  email: string
  operatingHours: string
  availableBloodTypes: string[]
}

interface BloodBankInfoProps {
  bloodBank: BloodBank
}

export function BloodBankInfo({ bloodBank }: BloodBankInfoProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{bloodBank.name} Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Address:</h3>
          <p>{bloodBank.address}</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone:</h3>
          <p>{bloodBank.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email:</h3>
          <p>{bloodBank.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Operating Hours:</h3>
          <p>{bloodBank.operatingHours}</p>
        </div>
        <div>
          <h3 className="font-semibold">Available Blood Types:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {bloodBank.availableBloodTypes.map((type) => (
              <span key={type} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {type}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

