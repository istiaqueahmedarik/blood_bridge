import Image from 'next/image'
import React from 'react'
import { Grid } from './Task'



function HospitalCard({ hospital: hospital }: Readonly<{ hospital: { name: string, beds: number, doctors: number, image: string } }>) {
    return (
        <div
            className="relative bg-gradient-to-b 
                            from-input to-input-light
                            p-6 rounded-3xl overflow-hidden  transition-transform transform hover:scale-105 m-5"
        >
            <Grid size={20} />
            <Image src={hospital.image} alt={hospital.name} width={300} height={300} className="m-auto" />
            <p className="m-auto text-center text-3xl font-bold text-accent-foreground relative z-20">
                {hospital.name}
            </p>
            <p className="text-muted-foreground text-center mt-4 text-base font-normal relative z-20">
                {`${hospital.beds} beds, ${hospital.doctors} doctors`}
            </p>
        </div>
    )
}

export default HospitalCard