import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceProps {
  name: string;
  hospital: string;
  points: number;
}

export function ServiceCard({ name, hospital, points }: ServiceProps) {
  return (
    <Card className="flex flex-col justify-between h-full">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm mb-2">{hospital}</p>
        <p className="text-lg font-semibold">{points} points</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary text-background hover:bg-foreground"
        >
          Select
        </Button>
      </CardFooter>
    </Card>
  )
}

