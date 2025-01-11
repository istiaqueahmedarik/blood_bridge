import React from 'react'
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import { Search } from 'lucide-react';



const bloodBanks = [
    {
        name: "National Institute of Diseases of the Chest & Hospital (NIDCH)",
        time: "2 min away",
    },
    {
        name: "Alif Blood Bank",
        time: "5 min away",
    },
    {
        name: "Shahjalala Blood Bank",
        time: "20 min away",
    },
    {
        name: "National Institute of Diseases of the Chest & Hospital (NIDCH)",
        time: "2 min away",
    },
    {
        name: "National Institute of Diseases of the Chest & Hospital (NIDCH)",
        time: "2 min away",
    },
    {
        name: "National Institute of Diseases of the Chest & Hospital (NIDCH)",
        time: "2 min away",
    },
];

const donors = [
    { name: "Arik", time: "6 min away" },
    { name: "Sajedullah", time: "6 min away" },
    { name: "Ariful Khan", time: "6 min away" },
    { name: "Rasiul", time: "6 min away" },
    { name: "Reza", time: "6 min away" },
];
function SearchPageWrapper() {

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
                        <h2 className="text-lg font-semibold mb-4">Blood Bank (6)</h2>
                        <div className="space-y-4">
                            {bloodBanks.map((bank, i) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <h3 className="font-medium">{bank.name}</h3>
                                    <p className="text-sm text-foreground">{bank.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Donor (5)</h2>
                        <div className="space-y-4">
                            {donors.map((donor, i) => (
                                <div key={i} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src="/placeholder.svg" />
                                                <AvatarFallback>{donor.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{donor.name}</h3>
                                                <p className="text-sm text-foreground">{donor.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-primary bg-secondary px-2 py-1 rounded">Available</span>
                                        </div>
                                    </div>
                                    <Button className="w-full bg-primary hover:bg-secondary text-foreground" asChild>
                                        <Link href="/donor/inbox/1">Contact</Link>
                                    </Button>
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