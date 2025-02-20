'use client';

import { useState } from 'react';

const bloodBanks = [
  { 
    id: 1,
    name: 'LifeSave Blood Center',
    registrationNumber: 'BB-2023-0456',
    licenseStatus: 'Valid',
    location: 'Matikata, Dhaka',
    storageCapacity: 1500, // in liters
    availableServices: ['Whole Blood', 'Platelets', 'Plasma'],
    contactEmail: 'lifesave@bloodbank.org',
    contactPhone: '+8801769041694',
    operationalHours: '24/7 Emergency',
    lastInspectionDate: '2024-02-15',
    isActive: true
  },
  { 
    id: 2,
    name: 'Cantonment Blood Bank',
    registrationNumber: 'BB-2024-0123',
    licenseStatus: 'Pending Renewal',
    location: 'Dhaka Cantonment',
    storageCapacity: 800,
    availableServices: ['Blood Testing', 'Storage'],
    contactEmail: 'cantonment@bloodbank.org',
    contactPhone: '+8801856163072',
    operationalHours: '08:00-20:00',
    lastInspectionDate: '2023-11-30',
    isActive: true
  },
  { 
    id: 3,
    name: 'ECB Community Blood Center',
    registrationNumber: 'BB-2022-0789',
    licenseStatus: 'Expired',
    location: 'ECB Complex, Dhaka',
    storageCapacity: 2000,
    availableServices: ['Donor Screening', 'Blood Research'],
    contactEmail: 'ecb.blood@bloodbank.org',
    contactPhone: '+8801769012229',
    operationalHours: '09:00-17:00',
    lastInspectionDate: '2022-12-01',
    isActive: false
  },
  { 
    id: 4,
    name: 'Mirpur Blood Services',
    registrationNumber: 'BB-2024-0321',
    licenseStatus: 'Valid',
    location: 'Mirpur 12, Dhaka',
    storageCapacity: 1200,
    availableServices: ['Mobile Donation Units', 'Blood Education'],
    contactEmail: 'mirpur.blood@bloodbank.org',
    contactPhone: '+8801558694201',
    operationalHours: '10:00-22:00',
    lastInspectionDate: '2024-01-10',
    isActive: true
  },
  { 
    id: 5,
    name: 'National Blood Network',
    registrationNumber: 'BB-2023-0987',
    licenseStatus: 'Under Review',
    location: 'Motijheel, Dhaka',
    storageCapacity: 2500,
    availableServices: ['Rare Blood Types', 'Cryopreservation'],
    contactEmail: 'national.blood@bloodbank.org',
    contactPhone: '+8801856163075',
    operationalHours: '24/7',
    lastInspectionDate: '2023-09-15',
    isActive: true
  },
  { 
    id: 6,
    name: 'Gulshan Blood Foundation',
    registrationNumber: 'BB-2024-0055',
    licenseStatus: 'Valid',
    location: 'Gulshan-1, Dhaka',
    storageCapacity: 1800,
    availableServices: ['Donor Rewards Program', 'Community Outreach'],
    contactEmail: 'gulshan.blood@bloodbank.org',
    contactPhone: '+8801856163074',
    operationalHours: '07:00-23:00',
    lastInspectionDate: '2024-03-01',
    isActive: true
  }
];

function BloodBanks() {
  const [search, setSearch] = useState('');
  const [filteredBloodBanks, setFilteredBloodBanks] = useState(bloodBanks);
  const [bannedBloodBanks, setBannedBloodBanks] = useState<number[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    
    const filtered = bloodBanks.filter(bloodbank =>
      bloodbank.name.toLowerCase().includes(query) ||
      bloodbank.location.toLowerCase().includes(query) ||
      bloodbank.licenseStatus.toLowerCase().includes(query)
    );
    
    setFilteredBloodBanks(filtered);
  };

  const handleBan = (id: number) => {
    setBannedBloodBanks([...bannedBloodBanks, id]);
  };

  const handleUnban = (id: number) => {
    setBannedBloodBanks(bannedBloodBanks.filter(bloodBankId => bloodBankId !== id));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-14'>
      <div className="background-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-xl font-semibold mb-4">List of Blood Banks</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, location, or license status..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Blood Banks List */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Available Services</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBloodBanks.length > 0 ? (
              filteredBloodBanks.map(bloodbank => (
                <tr key={bloodbank.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{bloodbank.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{bloodbank.availableServices.join(', ')}</td>
                  <td className="border border-gray-300 px-4 py-2">{bloodbank.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{bloodbank.contactPhone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {bannedBloodBanks.includes(bloodbank.id) ? (
                      <button
                        onClick={() => handleUnban(bloodbank.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBan(bloodbank.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Ban
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No matching blood banks found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodBanks;