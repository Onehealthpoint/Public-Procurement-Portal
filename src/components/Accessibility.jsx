'use client'
import React, { use, useEffect, useState } from 'react'
import { Mail, Phone, Search, Languages, Moon, Sun, PlusSquare, MinusSquare, Volume2 } from 'lucide-react';

const Accessibility = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [isdark, setIsDark] = useState(false);
    const [date, setDate] = useState(new Date().toLocaleDateString("en-US", options));
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


  return (
    <div className='h-10 w-[99%] mx-auto bg-nepBlue p-4 text-white text-xs hidden md:flex flex-row items-center justify-between'>
        <div className='flex items-center gap-5'>
            <span className='flex items-center'>
                <Mail size={15} className="inline-block mr-1" /> 
                <p className='cursor-pointer'>gunaso@etender.com.np</p>
            </span>
            <span className='flex items-center'>
                <Phone size={15} className="inline-block" /> 
                <p className='cursor-pointer'>+977-01-5555555</p>
            </span>
        </div>
        <div suppressHydrationWarning={true}>
            {date} {time}
        </div>
        <div className='flex items-center gap-5'>
            <button>
                <Search size={20} className="peer cursor-pointer inline-block mr-1" />
                <p className='text-white font-bold bg-nepRed absolute top-0 p-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-y-12 duration-700 text-sm -z-10'>Search</p>
            </button>
            <button>
                <Languages size={20} className="peer cursor-pointer inline-block mr-1" />
                <p className='text-white font-bold bg-nepRed absolute top-0 p-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-y-12 duration-700 text-sm -z-10'>Change Language</p>
            </button>
            <button>
                <span className='peer cursor-pointer' onClick={() => setIsDark(!isdark)}>
                    {isdark ? <Moon size={20} className="inline-block mr-1" /> : <Sun size={20} className="inline-block mr-1" />}
                </span>
                <p className='text-white font-bold bg-nepRed absolute top-0 p-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-y-12 duration-700 text-sm -z-10'>Change Theme</p>
            </button>
            <button>
                <span className='peer cursor-pointer'>
                    <PlusSquare size={20} className="inline-block mr-1" />
                    <MinusSquare size={20} className="inline-block mr-1" />
                </span>
                <p className='text-white font-bold bg-nepRed absolute right-10 top-0 p-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-y-12 duration-700 text-sm -z-10'>Change Font Size</p>
            </button>
            <button>
                <Volume2 size={20} className="peer cursor-pointer inline-block mr-1" />
                <p className='text-white font-bold bg-nepRed absolute right-10 top-0 p-1 opacity-0 peer-hover:opacity-100 peer-hover:translate-y-12 duration-700 text-sm -z-10'>Screen Reader</p>
            </button>
        </div>
    </div>
  )
}

export default Accessibility