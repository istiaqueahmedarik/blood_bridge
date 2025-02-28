/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react'
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Search } from 'lucide-react';
import { post } from '@/app/actions/req';




function SearchPageWrapper({ data, donor, institute }: any) {

    const [coords, setCoords] = React.useState<{ lat: number; lng: number } | null>(null);
    const [, setRes] = React.useState<any>(null);
    const [bloodBanks, setBloodBanks] = React.useState<any>([]);
    const [donors, setDonors] = React.useState<any>([]);
    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    React.useEffect(() => {
        if (coords) {
            post('search', {
                res: data,
                lat: coords.lat,
                lng: coords.lng,
            }).then((res) => {
                setRes(res)
                const data = res.data;
                console.log("data", data)
                console.log("donor", donor)
                for (let i = 0; i < data.length; i++) {
                    const id = data[i].ID;
                    if (donor.find((d: any) => d.id === id)) {
                        console.log("donor", data[i])
                        setDonors((prev: any) => [...prev, data[i]]);
                    }
                    else if (institute.find((d: any) => d.id === id)) {
                        setBloodBanks((prev: any) => [...prev, data[i]]);
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coords]);
    if (!coords) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto text-center mb-8">
                    <h1 className="text-2xl font-semibold mb-2">What types of blood you need?</h1>
                    <p className="text-foreground">Result is based on your location and current traffic behaviour</p>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground" />
                        <Input className="pl-9" placeholder="Value" type="search" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Blood Bank ({bloodBanks.length})</h2>
                        <div className="space-y-4">
                            {bloodBanks.map((bank: any, i: any) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <h3 className="font-medium">{bank.name}</h3>
                                    <p className="text-sm text-foreground">{bank.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Donor ({donors.length})</h2>
                        <div className="space-y-4">
                            {donors.map((donor: any, i: any) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src="/placeholder.svg" />
                                                <AvatarFallback>{donor.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{donor.name}</h3>
                                                <p className='text-sm text-foreground'>{donor.Address}</p>
                                                <p className="text-sm text-foreground">{Math.round(donor.distance)} m</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-primary bg-secondary px-2 py-1 rounded">Available</span>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default SearchPageWrapper