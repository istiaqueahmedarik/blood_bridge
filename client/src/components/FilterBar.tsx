'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterBarProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    filterType: string
    setFilterType: (type: string) => void
}

export default function FilterBar({ searchTerm, setSearchTerm, filterType, setFilterType }: FilterBarProps) {
    return (
        <div className="flex space-x-4 mb-4">
            <Input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
            />
            <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by blood type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

