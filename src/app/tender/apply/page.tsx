'use client'
import React, { useState, useEffect} from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FormData = {
    name: string
    vat: string
    address: string
    email: string
    phone: string
    submittedDate: string
    estimatedPrice: string
    document: File | null
    status: string | null
}


const ApplyProcurement = () => {
    const priceRegex = /^\d*(\.\d{0,2})?$/
    const phoneRegex = /^\d{0,10}$/
    const [submitted, setSubmitted] = useState(false)
    const [applicationId, setApplicationId] = useState("")
    const [data, setData] = useState<FormData>({
        name: "",
        vat: "",
        address: "",
        email: "",
        phone: "",
        submittedDate: "",
        estimatedPrice: "",
        document: null,
        status: "",
    })

    useEffect(()=>{
        const GenApplicationId = () =>{
            return "T-WN02-11209"
        }

        setApplicationId(GenApplicationId())
    }, [])

    return (
        <div className='w-[99%] mx-auto my-4 p-4 bg-amber-50'>
            <h1 className='w-full text-center text-2xl font-bold mb-6'>Tender Contract Form</h1>
            <form className='flex flex-col md:w-1/4 gap-4 justify-center items-center mx-auto' onSubmit={()=>setSubmitted(true)}>
                <Input 
                    type='text'
                    placeholder='Organization Name' 
                    required
                    value={data.name} 
                    onChange={(e) => {
                        setData({...data, name: e.target.value})
                    }} 
                    className=''
                />
                <Input 
                    type='text'
                    placeholder='Organization VAT Number' 
                    required
                    value={data.vat} 
                    onChange={(e) => {
                        setData({...data, vat: e.target.value})
                    }} 
                    className=''
                />
                <Input 
                    type='text'
                    placeholder='Organization Address' 
                    required
                    value={data.address} 
                    onChange={(e) => {
                        setData({...data, address: e.target.value})
                    }} 
                    className=''
                />
                <Input 
                    type='email'
                    placeholder='Contact Email' 
                    required
                    value={data.email} 
                    onChange={(e) => {
                        setData({...data, email: e.target.value})
                    }} 
                    className=''
                />
                <Input 
                    type='tel'
                    placeholder='Contact Phone' 
                    required
                    value={data.phone} 
                    onChange={(e) => {
                        const phoneVal = phoneRegex.test(e.target.value)? e.target.value : data.phone
                        setData({...data, phone: phoneVal})
                    }} 
                    className=''
                />
                <Input 
                    type='date'
                    placeholder='Date at which submitted' 
                    required
                    value={data.submittedDate} 
                    onChange={(e) => {
                        setData({...data, submittedDate: e.target.value})
                    }} 
                    className=''
                />
                <Input 
                    type='text'
                    placeholder='Estimated Price' 
                    required
                    value={data.estimatedPrice} 
                    onChange={(e) => {
                        const priceVal = priceRegex.test(e.target.value)? e.target.value : data.estimatedPrice
                        setData({...data, estimatedPrice: priceVal})
                    }} 
                    className=''
                />
                <Input 
                    type='file'
                    placeholder='Upload bid document' 
                    required
                    onChange={(e) => {
                        setData({...data, document: e.target.files?.length? e.target.files[0] : null})
                    }} 
                    className=''
                />
                <Button
                    type='submit'
                    variant='outline'
                    size='default'
                    className='bg-nepBlue text-white'
                >
                    Submit to Apply
                </Button>
            </form>
            
            {submitted && 
                <div className='w-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-center p-4 rounded'>
                    <div>&quot;Application submitted successfully!&quot;</div>
                    <div className='text-xl font-bold mt-1'>{applicationId}</div>
                    <Button className='mt-6' onClick={()=>setSubmitted(false)}>Okay</Button>
                </div>
            }
        </div>
    )
}
export default ApplyProcurement