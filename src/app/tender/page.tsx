'use client'

import { DataTable } from "@/components/data-table"
import { procurementData, procurementColumns } from "@/lib/data/data"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ProcurementPage() {
  const departments = ["education", "technology", "finance", "health", "transport", "energy", "agriculture", "legal"]

  const paramVal = useSearchParams().get("department")
  let id

  if (paramVal === null || !departments.includes(paramVal)) {
    id = undefined
  }else{
    id = paramVal
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Procurement Management System</h1>
      <DataTable 
        data={procurementData} 
        columns={procurementColumns}
        defaultSortValue={id}
      />
    </div>
  )
}

function ViewLoading() {
  return <div>Loading tender details...</div>
}

export default function ViewPage() {
  return (
    <Suspense fallback={<ViewLoading />}>
      <ProcurementPage />
    </Suspense>
  )
}