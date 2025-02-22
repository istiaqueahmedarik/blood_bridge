/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useActionState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { RemoveOffer } from '@/app/actions/hospital'


export function OfferTable({ offers }: any) {
  const [, formAction, pending] = useActionState(RemoveOffer, null)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Details</TableHead>
          <TableHead>Expiry Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers.map((offer: any) => (
          <TableRow key={offer.ID}>
            <TableCell>

              {offer.Service_name}
            </TableCell>
            <TableCell>
              {offer.Details.slice(0, 10)}...
            </TableCell>
            <TableCell>
              {new Date(offer.Expired_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <form action={formAction} className="inline">
                <Input type="hidden" name="offerId" value={offer.ID} />
                <Button type="submit" size="sm" variant="destructive"
                  disabled={pending}>
                  {pending ? 'Removing...' : 'Remove'}
                </Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

