'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const initialLabReports = [
    { id: "#A-125401", name: "Abdul Karim", type: "A+", file: "Blood.pdf" },
    { id: "#A-125501", name: "Fatima Begum", type: "O-", file: "Scan.pdf" },
    { id: "#A-125511", name: "Rafiq Ahmed", type: "B+", file: "Holter.pdf" }
];

const LabReports = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = initialLabReports.filter(report =>
        report.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lab Reports</CardTitle>
                <CardDescription>Recent test results and reports</CardDescription>
                <input
                    type="text"
                    placeholder="Search by User name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-2 p-2 border rounded"
                />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>User Name</TableHead>
                            <TableHead>Blood Type</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.id}</TableCell>
                                <TableCell>{report.name}</TableCell>
                                <TableCell>{report.type}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default LabReports;
