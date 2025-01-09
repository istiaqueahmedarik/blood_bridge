import { ServiceCard } from "@/components/ServiceCard"

const services = [
  { id: 1, name: 'Basic Health Checkup', hospital: 'Dhaka Medical College Hospital', points: 100 },
  { id: 2, name: 'Dental Cleaning', hospital: 'Bangladesh Dental Society', points: 150 },
  { id: 3, name: 'Eye Examination', hospital: 'Ispahani Islamia Eye Institute and Hospital', points: 120 },
  { id: 4, name: 'Nutrition Consultation', hospital: 'National Institute of Preventive and Social Medicine', points: 80 },
  { id: 5, name: 'Physiotherapy Session', hospital: 'CRP - Centre for the Rehabilitation of the Paralysed', points: 200 },
  { id: 6, name: 'Mental Health Counseling', hospital: 'National Institute of Mental Health & Hospital', points: 180 },
  { id: 7, name: 'Vaccination', hospital: 'Institute of Public Health', points: 90 },
  { id: 8, name: 'Blood Pressure Monitoring', hospital: 'National Heart Foundation Hospital & Research Institute', points: 50 },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            name={service.name}
            hospital={service.hospital}
            points={service.points}
          />
        ))}
      </div>
    </div>
  )
}

