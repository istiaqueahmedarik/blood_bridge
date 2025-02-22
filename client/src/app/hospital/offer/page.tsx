import { get_with_token } from "@/app/actions/req"
import { OfferForm } from "@/components/offer-form"
import { OfferTable } from "@/components/offer-table"

export default async function OffersPage() {
  const offers = await get_with_token('hospital/auth/offer', false);
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary/80">Add New Discount Offer</h2>
          <OfferForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary/80">Existing Discount Offers</h2>
          <OfferTable offers={offers.data} />
        </div>
      </div>
    </div>
  )
}

