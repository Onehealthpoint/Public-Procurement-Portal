import { TableData } from '@/components/data-table';


export const procurementData: TableData[] = [
  {
    id: "T-2025-001",
    name: "Supply, Installation and Commissioning of Infertility Treatment Equipment",
    openingDate: "2025-04-22",
    department: "health",
    location: "Kailali",
    closingDate: "2025-06-06",
  },
  {
    id: "T-2025-002",
    name: "Supply, Delivery, Installation, Testing and Commissioning of Internet Core Router Equipment",
    openingDate: "2025-04-21",
    department: "technology",
    location: "Kathmandu",
    closingDate: "2025-05-05",
  },
  {
    id: "T-2025-003",
    name: "The procurement of Different types of Aircraft Towbars applicable for Commercial Aircrafts",
    openingDate: "2025-04-17",
    department: "transport",
    location: "Kathmandu",
    closingDate: "2025-06-02",
  },
  {
    id: "T-2025-004",
    name: "Construction of Bagmati Bridge and Approach Roads",
    openingDate: "2025-04-11",
    department: "transport",
    location: "Kathmandu",
    closingDate: "2025-06-01",
  },
  {
    id: "T-2025-005",
    name: "Construction of Community Building in Tikapur Municipality",
    openingDate: "2025-04-16",
    department: "education",
    location: "Tikapur",
    closingDate: "2025-05-30",
  },
  {
    id: "T-2025-006",
    name: "Supply, Installation and Commissioning of 3D Laparoscopy System",
    openingDate: "2025-04-15",
    department: "health",
    location: "Kailali",
    closingDate: "2025-05-30",
  },
  {
    id: "T-2025-007",
    name: "Supply, Installation and Commissioning of ICU/NICU Equipment",
    openingDate: "2025-04-15",
    department: "health",
    location: "Kailali",
    closingDate: "2025-05-30",
  },
  {
    id: "T-2025-008",
    name: "Supply, Installation and Commissioning of Equipment for Histopathology Lab",
    openingDate: "2025-04-15",
    department: "health",
    location: "Kailali",
    closingDate: "2025-05-30",
  },
];

export const procurementColumns = [
  {
    key: "id" as keyof TableData,
    label: "Tender ID",
    sortable: false,
    filterable: false,
  },
  {
    key: "name" as keyof TableData,
    label: "Project Title",
    sortable: true,
    filterable: true,
  },
  {
    key: "department" as keyof TableData,
    label: "Department",
    sortable: true,
    filterable: true,
  },
  {
    key: "location" as keyof TableData,
    label: "Location",
    sortable: true,
    filterable: true,
  },
  {
    key: "openingDate" as keyof TableData,
    label: "Published Date",
    sortable: true,
    filterable: true,
    renderCell: (value: string) => {
      const date = new Date(value)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
    key: "closingDate" as keyof TableData,
    label: "Closing Date",
    sortable: true,
    filterable: true,
    renderCell: (value: string) => {
      const date = new Date(value)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    },
  },
  {
    key: "daysRemaining" as keyof TableData,
    label: "Days Remaining",
    sortable: false,
    filterable: false,
  },
  {
    key: "view" as keyof TableData,
    label: "Action",
    sortable: false,
    filterable: false,
  },
];