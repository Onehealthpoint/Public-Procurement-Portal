import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='w-[99%] mx-auto mt-6 mb-1 bg-nepBlue text-white'>
      <div className='w-full flex flex-col md:flex-row gap-4 items-start justify-between p-4 text-pretty'>
        <div className='w-full md:w-1/3 text-center shadow-xl shadow-black'>
          <h1 className='text-2xl text-center font-bold'>Contact Us</h1>
          <p className='text-lg text-center font-bold'>Department of eTender</p>
          <div className='flex flex-col items-start justify-start gap-3 m-4'>
            <span className='flex items-center justify-start gap-2'>
              <MapPin/><p>Location: Gwarko, Lalitpur</p>
            </span>
            <span className='flex items-center justify-start gap-2'>
              <Phone/><p>Phone: +977-01-5555555</p>
            </span>
            <span className='flex items-center justify-start gap-2'>
              <Mail/><p>Email: gunaso@etender.gov.np</p>
            </span>
          </div>
        </div>
        <div className='w-full md:w-1/3 text-center shadow-xl shadow-black'>
          <h1 className='text-2xl text-center font-bold'>Visit us</h1>
          <iframe 
            title='Google Map'
            className='w-full md:h-[156px]'
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500.0765952724016!2d85.32319108768!3d27.667200541908564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d089fa474b%3A0x7541732c75a612d2!2sLagankhel%20Bus%20Station!5e0!3m2!1sen!2snp!4v1744976488610!5m2!1sen!2snp"
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className='w-full md:w-1/3 text-center shadow-xl shadow-black'>
          <h1 className='text-2xl text-center font-bold'>Some important links</h1>
          <div className='flex flex-col items-start justify-start gap-2 m-4'>
            <a className='hover:text-nepRed hover:bg-white' href="/">Department of E-Governance and Citizen Services</a>
            <a className='hover:text-nepRed hover:bg-white' href="https://www.mocit.gov.np">Ministry of Communication and Information Technology</a>
            <a className='hover:text-nepRed hover:bg-white' href="https://www.dotm.gov.np">Department of Transport Management</a>
            <a className='hover:text-nepRed hover:bg-white' href="https://www.nepal.gov.np">Government of Nepal</a>
          </div>
        </div>
      </div>

      <div className='w-[99%] flex flex-col sm:flex-row items-center justify-between mx-auto px-4 py-2 border-t-2 border-white'>
        <p>Copyright © 2080. All rights reserved.</p>
        <p>Lastest Update: February 20, 2025</p>
      </div>
    </footer>
  )
}

export default Footer
