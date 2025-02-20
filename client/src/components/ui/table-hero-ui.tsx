"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Router from "next/router";

interface Institute {
  id: number;
  instituteName: string;
  instituteType: string;
}

const initialInstitutes: Institute[] = [
  { id: 1, instituteName: "City General Hospital", instituteType: "Hospital" },
  { id: 2, instituteName: "Sunshine Blood Bank", instituteType: "Blood Bank" },
  { id: 3, instituteName: "Metropolitan Hospital", instituteType: "Hospital" },
  { id: 4, instituteName: "Lifeline Blood Center", instituteType: "Blood Bank" },
  { id: 5, instituteName: "Community Health Clinic", instituteType: "Hospital" },
  { id: 6, instituteName: "Red Cross Blood Services", instituteType: "Blood Bank" },
  { id: 7, instituteName: "Apollo Hospitals", instituteType: "Hospital" },
  { id: 8, instituteName: "Pacific Blood Bank", instituteType: "Blood Bank" },
  { id: 9, instituteName: "Carewell Hospital", instituteType: "Hospital" },
  { id: 10, instituteName: "Global Blood Resources", instituteType: "Blood Bank" },
];

export function InstituteTable() {
  const [search, setSearch] = useState("");
  const [institutes, setInstitutes] = useState(initialInstitutes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedInstitute, setEditedInstitute] = useState<Partial<Institute>>({});

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };

  // Handle edit input change
  const handleEditChange = (field: keyof Institute, value: string) => {
    setEditedInstitute((prev) => ({ ...prev, [field]: value }));
  };

  // Save the edited institute
  const handleSave = (id: number) => {
    setInstitutes((prev) =>
      prev.map((inst) =>
        inst.id === id
          ? { ...inst, ...editedInstitute }
          : inst
      )
    );
    setEditingId(null);
  };

  // Delete an institute
  const handleDelete = (id: number) => {
    setInstitutes((prev) => prev.filter((inst) => inst.id !== id));
  };

      // View an institute
//     const handleView = (id: number) => {
//         Router.push(`/institute/${id}`);
//   };

  // Filtered list based on search
  const filteredInstitutes = institutes.filter(
    (inst) =>
      inst.instituteName.toLowerCase().includes(search) ||
      inst.instituteType.toLowerCase().includes(search)
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-xl font-semibold mb-4">Institutes List</h1>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search by name or type..."
        value={search}
        onChange={handleSearch}
        className="mb-4 border p-2 rounded w-full"
      />

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Institute Name</TableHead>
            <TableHead>Institute Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInstitutes.length > 0 ? (
            filteredInstitutes.map((inst) => (
              <TableRow key={inst.id}>
                <TableCell>{inst.id}</TableCell>

                {/* Institute Name - Editable */}
                <TableCell>
                  {editingId === inst.id ? (
                    <Input
                      defaultValue={inst.instituteName}
                      onChange={(e) => handleEditChange("instituteName", e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    inst.instituteName
                  )}
                </TableCell>

                {/* Institute Type - Editable */}
                <TableCell>
                  {editingId === inst.id ? (
                    <Input
                      defaultValue={inst.instituteType}
                      onChange={(e) => handleEditChange("instituteType", e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    inst.instituteType
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-left space-x-2">
                  {editingId === inst.id ? (
                    <>
                      <Button size="sm" onClick={() => handleSave(inst.id)}>Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      {/* <Button size="sm" variant="outline" onClick={() => setEditingId(inst.id)}>Edit</Button> */}
                      <Button size="sm" variant="destructive" onClick={() => window.location.href = '/admin/pending_approval'}>View</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(inst.id)}>Reject</Button>
                      <Button size="sm" variant="destructive" onClick={() => window.location.href = '/admin/pending_approval'}>Accept</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                No matching institutes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}