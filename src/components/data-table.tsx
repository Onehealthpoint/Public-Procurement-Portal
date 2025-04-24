"use client"

import type React from "react"

import { useState, useMemo, useEffect } from "react"
import { ArrowUpDown, ChevronDown, ChevronUp, Eye, X } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define the data structure
export type TableData = {
  id: string | number
  name: string
  openingDate: string
  department: "education" | "technology" | "finance" | "health" | "transport" | "energy" | "agriculture" | "legal" | "none"
  location: string
  closingDate: string
  [key: string]: any
}

type SortDirection = "asc" | "desc" | null
type SortConfig = {
  key: keyof TableData | null
  direction: SortDirection
}

type FilterConfig = {
  [key: string]: string
}

interface DataTableProps {
  data: TableData[]
  columns: {
    key: keyof TableData
    label: string
    sortable?: boolean
    filterable?: boolean
    renderCell?: (value: any, row: TableData) => React.ReactNode
  }[]
  defaultSortValue?: string
}

export function DataTable({ data, columns, defaultSortValue }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  })
  const [filters, setFilters] = useState<FilterConfig>({
    "department": defaultSortValue || "",
  })
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    if (defaultSortValue) {
      setFilters({
        "department": defaultSortValue || "",
      })
      setActiveFilters(["department"])
    }
  }, [defaultSortValue])

  // Handle sorting
  const handleSort = (key: keyof TableData) => {
    let direction: SortDirection = "asc"

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc"
      } else if (sortConfig.direction === "desc") {
        direction = null
      }
    }

    setSortConfig({ key, direction })
  }

  // Handle filtering
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))

    if (value && !activeFilters.includes(key)) {
      setActiveFilters((prev) => [...prev, key])
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters((prev) => prev.filter((filter) => filter !== key))
    }
  }

  const clearFilter = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: "",
    }))
    setActiveFilters((prev) => prev.filter((filter) => filter !== key))
  }

  const clearAllFilters = () => {
    const emptyFilters = columns.reduce((acc, column) => {
      if (column.filterable) {
        acc[column.key as string] = ""
      }
      return acc
    }, {} as FilterConfig)

    setFilters(emptyFilters)
    setActiveFilters([])
  }

  // Calculate days remaining
  const calculateDaysRemaining = (closingDate: string) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const closeDate = new Date(closingDate)
    closeDate.setHours(0, 0, 0, 0)

    const diffTime = closeDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays
  }

  // Apply sorting and filtering
  const processedData = useMemo(() => {
    let result = [...data]

    // Apply filters
    if (activeFilters.length > 0) {
      result = result.filter((item) => {
        return activeFilters.every((filterKey) => {
          const filterValue = filters[filterKey]?.toLowerCase()

          // Special handling for date filtering
          if ((filterKey === "openingDate" || filterKey === "closingDate") && filterValue) {
            const itemDate = new Date(item[filterKey])
            const filterDate = new Date(filters[filterKey])
            return itemDate >= filterDate
          }

          const itemValue = String(item[filterKey]).toLowerCase()
          return !filterValue || itemValue.includes(filterValue)
        })
      })
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof TableData]
        const bValue = b[sortConfig.key as keyof TableData]

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
    }

    return result
  }, [data, sortConfig, filters, activeFilters])

  // Department badge renderer
  const renderDepartmentBadge = (department: string) => {
    const departmentStyles = {
      education: "bg-blue-100 text-blue-800 border-blue-200",
      technology: "bg-purple-100 text-purple-800 border-purple-200",
      finance: "bg-green-100 text-green-800 border-green-200",
      health: "bg-red-100 text-red-800 border-red-200",
      transport: "bg-yellow-100 text-yellow-800 border-yellow-200",
      energy: "bg-orange-100 text-orange-800 border-orange-200",
      agriculture: "bg-emerald-100 text-emerald-800 border-emerald-200",
      legal: "bg-gray-100 text-gray-800 border-gray-200",
    }

    const departmentKey = department.toLowerCase() as keyof typeof departmentStyles
    const style = departmentStyles[departmentKey] || "bg-gray-100 text-gray-800 border-gray-200"

    return (
      <Badge variant="outline" className={cn("font-medium", style)}>
        {department}
      </Badge>
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Filter controls */}
      <div className="flex flex-col space-y-2">
        <div className="flex flex-wrap gap-2 items-center">
          {columns.map(
            (column) =>
              column.filterable && (
                <div key={`filter-${column.key}`} className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        {column.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="p-2 w-60">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Filter by {column.label}</div>
                        {column.key === "openingDate" || column.key === "closingDate" ? (
                          <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Show items on or after:</div>
                            <Input
                              type="date"
                              value={filters[column.key as string] || ""}
                              onChange={(e) => handleFilterChange(column.key as string, e.target.value)}
                              className="h-8"
                            />
                          </div>
                        ) : column.key === "department" ? (
                          <div className="grid grid-cols-2 gap-1">
                            {[
                              "education",
                              "technology",
                              "finance",
                              "health",
                              "transport",
                              "energy",
                              "agriculture",
                              "legal",
                            ].map((dept) => (
                              <Button
                                key={dept}
                                variant={filters[column.key as string] === dept ? "default" : "ghost"}
                                size="sm"
                                className={cn(
                                  "justify-start text-xs capitalize h-8",
                                  filters[column.key as string] === dept ? "font-medium" : "font-normal",
                                )}
                                onClick={() => handleFilterChange(column.key as string, dept)}
                              >
                                {dept}
                                {/* {renderDepartmentBadge(dept)} */}
                              </Button>
                            ))}
                            {filters[column.key as string] && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => clearFilter(column.key as string)}
                                className="col-span-2 mt-1 text-xs"
                              >
                                Clear selection
                              </Button>
                            )}
                          </div>
                        ) : (
                          <Input
                            placeholder={`Search ${column.label.toLowerCase()}...`}
                            value={filters[column.key as string] || ""}
                            onChange={(e) => handleFilterChange(column.key as string, e.target.value)}
                            className="h-8"
                          />
                        )}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ),
          )}

          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-muted-foreground">
              Clear all
              <X className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterKey) => {
              const column = columns.find((col) => col.key === filterKey)
              return (
                <Badge key={`active-${filterKey}`} variant="secondary" className="px-2 py-1">
                  {column?.label}: {filters[filterKey]}
                  <Button variant="ghost" size="sm" onClick={() => clearFilter(filterKey)} className="h-4 w-4 p-0 ml-1">
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th key={`header-${column.key}`} className="px-4 py-3 text-left font-medium text-muted-foreground">
                    {column.sortable ? (
                      <button
                        className="flex items-center gap-1 hover:text-foreground"
                        onClick={() => handleSort(column.key)}
                      >
                        <ArrowUpDown className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="flex items-center">
                          {column.label}
                          {sortConfig.key === column.key && (
                            <>
                              {sortConfig.direction === "asc" ? (
                                <ChevronUp className="h-4 w-4 ml-1" />
                              ) : sortConfig.direction === "desc" ? (
                                <ChevronDown className="h-4 w-4 ml-1" />
                              ) : null}
                            </>
                          )}
                        </span>
                      </button>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {processedData.length > 0 ? (
                processedData.map((row, rowIndex) => (
                  <tr key={`row-${row.id || rowIndex}`} className="bg-background hover:bg-muted/50">
                    {columns.map((column) => (
                      <td key={`cell-${row.id || rowIndex}-${column.key}`} className="px-4 py-3">
                        {column.renderCell ? (
                          column.renderCell(row[column.key], row)
                        ) : column.key === "department" ? (
                          renderDepartmentBadge(row[column.key])
                        ) : column.key === "daysRemaining" && row.closingDate ? (
                          <span
                            className={cn(
                              calculateDaysRemaining(row.closingDate) <= 7
                                ? "text-red-600 font-medium"
                                : calculateDaysRemaining(row.closingDate) <= 14
                                  ? "text-amber-600 font-medium"
                                  : "",
                            )}
                          >
                            {calculateDaysRemaining(row.closingDate)} days
                          </span>
                        ) : column.key === "view" ? (
                          <Link href={`/tender/view?id=${row.id}`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                          </Link>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {processedData.length} of {data.length} results
      </div>
    </div>
  )
}
