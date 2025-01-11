import { getOffers } from "@/app/action"
import { OfferForm } from "@/components/offer-form"
import { OfferTable } from "@/components/offer-table"

export default async function OffersPage() {
  const offers = await getOffers()
  const hospitalName = "Dhaka Medical College"
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Discount Offers Management</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary/80">Add New Discount Offer</h2>
          <OfferForm hospitalName={hospitalName} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary/80">Existing Discount Offers</h2>
          <OfferTable offers={offers} />
        </div>
      </div>
    </div>
  )
}

