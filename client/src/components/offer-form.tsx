'use client'

import { AddOffer } from "@/app/actions/hospital"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"


export function OfferForm() {

  const [state, formAction, pending] = useActionState(AddOffer, null);


  return (
    <Card className="w-full">
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Service</Label>
            <Input id="service" name="service" required className="border-input" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Details">Details</Label>
            <Input
              id="Details"
              name="Details"
              type="text"
              required
              className="border-input"
            />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div className="space-y-2">
              <Label htmlFor="minCoin">Min Coin</Label>
              <Input id="minCoin" name="minCoin" type="number" required className="border-input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCoin">Max Coin</Label>
              <Input id="maxCoin" name="maxCoin" type="number" required className="border-input" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input id="expiryDate" name="expiryDate" type="date" required className="border-input" />
          </div>
        </CardContent>
        <CardFooter>
          {state?.success && (
            <div className={`text-${state.success ? 'success' : 'error'} text-sm`}>
              {state.message}
            </div>
          )}
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={pending}>
            {pending ? 'Adding Offer...' : 'Add Offer'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

