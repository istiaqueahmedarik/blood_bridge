/* eslint-disable @typescript-eslint/no-explicit-any */
import { get_with_token } from "@/app/actions/req";
import { ServiceCard } from "@/components/ServiceCard"



export default async function ServicesPage() {
  const services = await get_with_token("donor/auth/services");

  console.log(services);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Services</h1>
      <p className="text-center text-lg text-foreground/80 mb-8">
        Token Left: {services?.services[0].token_left}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services?.services.map((service: any, idx: number) => (
          <ServiceCard
            key={idx}
            name={service.Service_name}
            hospital={service.Full_name}
            Details={service.Details}
            points={Math.round(Number(service.token_need))}
            token_left={service.token_left}
            id={service.offer_id}
          />
        ))}
      </div>
    </div>
  )
}

