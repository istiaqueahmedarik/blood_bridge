'use client';

import { useState } from 'react';

const donorsData = [
  { id: 1, name: 'Aref', bloodType: 'O+', location: 'Matikata', phone: '01769041694' },
  { id: 2, name: 'Sajedullah', bloodType: 'A-', location: 'Dhaka Cantonment', phone: '01856163072' },
  { id: 3, name: 'Ariful', bloodType: 'B+', location: 'ECB', phone: '01769012229' },
  { id: 4, name: 'Tawsif', bloodType: 'AB-', location: 'Mirpur 12', phone: '01558694201' },
  { id: 5, name: 'Shakib Al Hassan', bloodType: 'O-', location: 'Mothijeel', phone: '01856163075' },
  { id: 6, name: 'Ishtiaq Arik', bloodType: 'A+', location: 'Gulshan', phone: '01856163074' },
];

function Donors() {
  const [search, setSearch] = useState('');
  const [filteredDonors, setFilteredDonors] = useState(donorsData);
  const [bannedDonors, setBannedDonors] = useState<number[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = donorsData.filter(donor =>
      donor.name.toLowerCase().includes(query) ||
      donor.bloodType.toLowerCase().includes(query) ||
      donor.location.toLowerCase().includes(query)
    );

    setFilteredDonors(filtered);
  };

  const handleBan = (id: number) => {
    setBannedDonors([...bannedDonors, id]);
  };

  const handleUnban = (id: number) => {
    setBannedDonors(bannedDonors.filter(donorId => donorId !== id));
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-14'>
      <div className="background-white shadow-md rounded-lg p-6 w-full">
        <h1 className="text-xl font-semibold mb-4">List of Donors</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name, blood type, or location..."
          value={search}
          onChange={handleSearch}
          className="border p-2 rounded w-full mb-4"
        />

        {/* Donors List */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Blood Type</th>
              <th className="border border-gray-300 px-4 py-2">Location</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.length > 0 ? (
              filteredDonors.map(donor => (
                <tr key={donor.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{donor.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{donor.bloodType}</td>
                  <td className="border border-gray-300 px-4 py-2">{donor.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{donor.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {bannedDonors.includes(donor.id) ? (
                      <button
                        onClick={() => handleUnban(donor.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Unban
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBan(donor.id)}
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
                <td colSpan={5} className="text-center py-4 text-gray-500">No matching donors found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donors;