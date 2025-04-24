'use client'
import React, { useEffect, useState }  from 'react'
import { procurementData } from '@/lib/data/data'
import { TableData } from '@/components/data-table'
import { useSearchParams } from 'next/navigation'

const ViewProcurement = () => {
    const id = useSearchParams().get("id")
    const [daysRemaining, setDaysRemaining] = useState(0)
    const [daysStyle, setDaysStyle] = useState("")
    const [data, setData] = useState<TableData>({
        id: "",
        name: "",
        openingDate: "",
        department: "none",
        location: "",
        closingDate: "",
      })

    useEffect(() => {
        const procurement = procurementData.find((item) => {
            //console.log(item.id, id);
            return item.id === id;
        })
        if (procurement) {
            setData(procurement)
        } else {
            setData({
                id: "",
                name: "",
                openingDate: "",
                department: "none",
                location: "",
                closingDate: "",
            })
        }
    },[setData, procurementData, id])

    useEffect(() => {
        const calculateDaysRemaining = (closingDate: string) => {
            const today = new Date()
            const closing = new Date(closingDate)
            const timeDiff = closing.getTime() - today.getTime()
            const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))
            return daysRemaining > 0 ? daysRemaining : 0
        }
        
        setDaysRemaining(calculateDaysRemaining(data.closingDate))
    },[data.closingDate])

    useEffect(() => {
        if (daysRemaining < 7) {
            setDaysStyle("text-red-500 font-bold")
        } else if (daysRemaining < 14) {
            setDaysStyle("text-yellow-500 font-bold")
        } else {
            setDaysStyle("text-green-500 font-bold")
        }
    },[daysRemaining])

    const dateToString = (value: string): string => {
        const date = new Date(value)
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      }

    return (
        <div className='w-[99%] mx-auto my-4 p-4 bg-amber-50'>
            <h1 className='w-full text-center text-2xl font-bold mb-6'>Tender Contract Details</h1>
            <div className='w-full grid gap-2'>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Tender ID :</h1>
                    <p className='col-span-4 text-left'>{data.id}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Tender :</h1>
                    <p className='col-span-4 text-left capitalize'>{data.name}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Opening Date :</h1>
                    <p className='col-span-4 text-left'>{dateToString(data.openingDate)}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Department :</h1>
                    <p className='col-span-4 text-left capitalize'>{data.department}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Location :</h1>
                    <p className='col-span-4 text-left capitalize'>{data.location}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Closing Date :</h1>
                    <p className='col-span-4 text-left'>{dateToString(data.closingDate)}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'>Days Remaining :</h1>
                    <p className={`col-span-4 text-left ${daysStyle}`}>{daysRemaining}</p>
                </div>
                <div className='w-full grid grid-cols-7 gap-4 mt-6'>
                    <h1 className='col-span-3 text-right font-black'></h1>
                    <a href="/downloads/BID DOCUMENT.pdf" 
                        download 
                        className='w-50 xs p-2 rounded-sm col-span-4 text-centre bg-nepRed text-white hover:bg-nepBlue'
                    >
                        Download Bid Document
                    </a>
                </div>
                <div className='w-full grid grid-cols-7 gap-4'>
                    <h1 className='col-span-3 text-right font-black'></h1>
                    <a href={`/tender/apply?id=${data.id}`} 
                        className='w-50 p-2 rounded-sm col-span-4 text-center bg-green-700 text-white hover:bg-nepBlue'
                    >
                        Apply For Procurement
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ViewProcurement