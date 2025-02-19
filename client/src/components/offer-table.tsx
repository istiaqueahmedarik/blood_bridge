'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { deleteOffer, updateOffer } from '@/app/actions/action'

interface Offer {
  id: number
  hospital: string
  service: string
  discountPercentage: number
  expiryDate: string
}

export function OfferTable({ offers }: { offers: Offer[] }) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const router = useRouter()

  const handleUpdate = async (formData: FormData) => {
    await updateOffer(formData)
    setEditingId(null)
    router.refresh()
  }

  const handleDelete = async (formData: FormData) => {
    await deleteOffer(formData)
    router.refresh()
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Discount %</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer) => (
          <TableRow key={offer.id}>
            <TableCell>
              {editingId === offer.id ? (
                <Input name="service" defaultValue={offer.service} className="border-input" />
              ) : (
                offer.service
              )}
            </TableCell>
            <TableCell>
              {editingId === offer.id ? (
                <Input
                  name="discountPercentage"
                  type="number"
                  defaultValue={offer.discountPercentage}
                  min="1"
                  max="100"
                  className="border-input"
                />
              ) : (
                `${offer.discountPercentage}%`
              )}
            </TableCell>
            <TableCell>
              {editingId === offer.id ? (
                <Input name="expiryDate" type="date" defaultValue={offer.expiryDate} className="border-input" />
              ) : (
                offer.expiryDate
              )}
            </TableCell>
            <TableCell>
              {editingId === offer.id ? (
                <form action={handleUpdate} className="space-x-2">
                  <input type="hidden" name="id" value={offer.id} />
                  <input type="hidden" name="hospital" value={offer.hospital} />
                  <Button type="submit" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Save</Button>
                  <Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                </form>
              ) : (
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(offer.id)}>Edit</Button>
                  <form action={handleDelete} className="inline">
                    <input type="hidden" name="id" value={offer.id} />
                    <Button type="submit" size="sm" variant="destructive">Delete</Button>
                  </form>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

