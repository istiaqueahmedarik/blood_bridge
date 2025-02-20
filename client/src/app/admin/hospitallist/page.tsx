'use client';
import { useState } from 'react';
import React from 'react'

const hospitals = [
    { 
        id: 101,
        name: 'Dhaka General Hospital',
        registrationNumber: 'HOSP-2022-1001',
        licenseStatus: 'Valid',
        accreditation: 'JCI Accredited',
        location: 'Paltan, Dhaka',
        bedCapacity: 500,
        specialtyDepartments: ['Emergency Care', 'Cardiology', 'Orthopedics', 'Maternity'],
        emergencyServices: true,
        outpatientServices: true,
        contactEmail: 'info@dhakageneral.com',
        contactPhone: '+8801967543210',
        operationalHours: '24/7',
        lastInspectionDate: '2024-03-01',
        numberOfDoctors: 150,
        isActive: true
    },
    { 
        id: 102,
        name: 'Bangladesh Cardiac Center',
        registrationNumber: 'HOSP-2023-1002',
        licenseStatus: 'Pending Renewal',
        accreditation: 'NABH Certified',
        location: 'Gulshan-2, Dhaka',
        bedCapacity: 250,
        specialtyDepartments: ['Cardiac Surgery', 'Interventional Cardiology', 'ICU'],
        emergencyServices: true,
        outpatientServices: false,
        contactEmail: 'cardiac@bcc.org',
        contactPhone: '+8801765987654',
        operationalHours: '24/7 Emergency, OPD: 08:00-20:00',
        lastInspectionDate: '2023-12-15',
        numberOfDoctors: 75,
        isActive: true
    },
    { 
        id: 103,
        name: 'Chittagong Medical City',
        registrationNumber: 'HOSP-2021-1003',
        licenseStatus: 'Expired',
        accreditation: 'ISO 9001 Certified',
        location: 'Agrabad, Chittagong',
        bedCapacity: 750,
        specialtyDepartments: ['Oncology', 'Neurology', 'Pediatrics', 'Radiology'],
        emergencyServices: false,
        outpatientServices: true,
        contactEmail: 'contact@cmc.org',
        contactPhone: '+8801811123456',
        operationalHours: '06:00-23:00',
        lastInspectionDate: '2022-06-30',
        numberOfDoctors: 200,
        isActive: false
    },
    { 
        id: 104,
        name: 'Sylhet Women\'s Hospital',
        registrationNumber: 'HOSP-2024-1004',
        licenseStatus: 'Valid',
        accreditation: 'Baby-Friendly Hospital',
        location: 'Zindabazar, Sylhet',
        bedCapacity: 150,
        specialtyDepartments: ['Maternity', 'Neonatal Care', 'Gynecology'],
        emergencyServices: true,
        outpatientServices: true,
        contactEmail: 'care@sylhetwomens.org',
        contactPhone: '+8801711223344',
        operationalHours: '24/7',
        lastInspectionDate: '2024-02-28',
        numberOfDoctors: 45,
        isActive: true
    },
    { 
        id: 105,
        name: 'Rajshahi Trauma Center',
        registrationNumber: 'HOSP-2023-1005',
        licenseStatus: 'Under Review',
        accreditation: 'State Emergency Center',
        location: 'Shaheb Bazar, Rajshahi',
        bedCapacity: 300,
        specialtyDepartments: ['Emergency Medicine', 'Burns Unit', 'Plastic Surgery'],
        emergencyServices: true,
        outpatientServices: false,
        contactEmail: 'emergency@rtc.gov.bd',
        contactPhone: '+8801899876543',
        operationalHours: '24/7',
        lastInspectionDate: '2023-11-01',
        numberOfDoctors: 90,
        isActive: true
    },
    { 
        id: 106,
        name: 'Khulna Children\'s Hospital',
        registrationNumber: 'HOSP-2024-1006',
        licenseStatus: 'Valid',
        accreditation: 'UNICEF Partner',
        location: 'KD Ghosh Road, Khulna',
        bedCapacity: 200,
        specialtyDepartments: ['Pediatrics', 'Vaccination Center', 'Neonatology'],
        emergencyServices: true,
        outpatientServices: true,
        contactEmail: 'support@kch.org',
        contactPhone: '+8801312345678',
        operationalHours: '24/7 Emergency, OPD: 08:00-22:00',
        lastInspectionDate: '2024-01-15',
        numberOfDoctors: 60,
        isActive: true
    }
  ];


function Hospitals() {
        const [bannedHospitals, setBannedHospitals] = useState<number[]>([]);
        const [search, setSearch] = useState('');
        const [filteredHospitals, setFilteredHospitals] = useState(hospitals);
  
        const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearch(query);
            
        const filtered = hospitals.filter(hospital =>
            hospital.name.toLowerCase().includes(query) ||
            hospital.location.toLowerCase().includes(query) ||
            hospital.licenseStatus.toLowerCase().includes(query)
        );
        
        setFilteredHospitals(filtered);
    };

    const handleBan = (id: number) => {
        setBannedHospitals([...bannedHospitals, id]);
    };

    const handleUnban = (id: number) => {
        setBannedHospitals(bannedHospitals.filter(hospitalId => hospitalId !== id));
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 p-14'>
        <div className="background-white shadow-md rounded-lg p-6 w-full">
            <h1 className="text-xl font-semibold mb-4">List of Hospitals</h1>
  
          {/* Search Bar */}
            <input
            type="text"
            placeholder="Search by name, location, or license status..."
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded w-full mb-4"
            />
  
          {/* Hospitals List */}
            <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Specialty Departments</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredHospitals.length > 0 ? (
                filteredHospitals.map(hospital => (
                    <tr key={hospital.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{hospital.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{hospital.specialtyDepartments.join(', ')}</td>
                    <td className="border border-gray-300 px-4 py-2">{hospital.location}</td>
                    <td className="border border-gray-300 px-4 py-2">{hospital.contactPhone}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        {bannedHospitals.includes(hospital.id) ? (
                        <button
                            onClick={() => handleUnban(hospital.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Unban
                            </button>
                        ) : (
                        <button
                            onClick={() => handleBan(hospital.id)}
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
                  <td colSpan={5} className="text-center py-4 text-gray-500">No matching hospitals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default Hospitals;