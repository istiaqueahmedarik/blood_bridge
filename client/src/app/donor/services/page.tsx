import { get } from "@/app/req";
import { ServiceCard } from "@/components/ServiceCard"

interface Service {
  title: string;
  place: string;
  points: number;
}

const services: Service[] = await get("/donor/services");
export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service: Service, idx: number) => (
          <ServiceCard
            key={idx}
            name={service.title}
            hospital={service.place}
            points={service.points}
          />
        ))}
      </div>
    </div>
  )
}

