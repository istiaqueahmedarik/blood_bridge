'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitOffer } from '../actions/submitOffer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from '@/hooks/use-toast'

export function OfferForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    const result = await submitOffer(formData)
    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      })
      router.push('/offers')
    } else {
      toast({
        title: "Error",
        description: "Failed to submit offer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</label>
        <Input type="text" id="hospitalName" name="hospitalName" required className="mt-1" />
      </div>
      <div>
        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700">Service Name</label>
        <Input type="text" id="serviceName" name="serviceName" required className="mt-1" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea id="description" name="description" required className="mt-1" />
      </div>
      <div>
        <label htmlFor="pointsRequired" className="block text-sm font-medium text-gray-700">Points Required</label>
        <Input type="number" id="pointsRequired" name="pointsRequired" required min="0" className="mt-1" />
      </div>
      <div>
        <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
        <Input type="date" id="expirationDate" name="expirationDate" required className="mt-1" />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Offer'}
      </Button>
    </form>
  )
}

