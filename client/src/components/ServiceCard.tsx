'use client'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TakeOffer } from "@/app/actions/donor";
import { useActionState } from "react";


export function ServiceCard({ id, name, hospital, Details, points, token_left }: any) {
  const [state, formAction, pending] = useActionState(TakeOffer, null);
  return (
    <Card className={`flex flex-col justify-between h-full ${token_left - points < 0 ? 'bg-foreground/10' : 'bg-background'} max-w-5xl break-words`}>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm mb-2">{hospital}</p>
        <p className="text-sm text-muted-foreground">{Details}</p>
        <p className="text-lg font-semibold">{points} points</p>
      </CardContent>
      <CardFooter>
        <form action={formAction}>
          <input type="hidden" name="offer_id" value={id} />
          <Button
            className="w-full bg-primary text-background hover:bg-foreground"
            disabled={token_left - points < 0 || pending}
          >
            Select
          </Button>
          {state?.message && <p className="text-red-500">{state.message}</p>}
        </form>

      </CardFooter>
    </Card>
  )
}

