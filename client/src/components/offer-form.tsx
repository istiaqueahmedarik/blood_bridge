'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addOffer } from '@/app/actions/action'

interface OfferFormProps {
  hospitalName: string
}

export function OfferForm({ hospitalName }: OfferFormProps) {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    formData.append('hospital', hospitalName)
    await addOffer(formData)
    router.refresh()
  }

  return (
    <Card className="w-full">
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Input id="service" name="service" required className="border-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discountPercentage">Discount Percentage</Label>
            <Input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              required
              min="1"
              max="100"
              className="border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" name="expiryDate" type="date" required className="border-input" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Add Discount Offer
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

