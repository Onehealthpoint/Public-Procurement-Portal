'use client'
import React, { useEffect, useState } from 'react'
import { House, Menu } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import AuthContext from '@/lib/firebase/AuthContext'

const Navbar = () => {
  const { user } = AuthContext()
  const [isOpen, setIsOpen] = useState(false)

  //resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    };

    window.addEventListener('resize', handleResize)
  },[])

  return (
    <nav className="w-[99%] bg-nepBlue p-4 mx-auto mt-6 relative">

        {/* Desktop View */}
        <div className="w-2/3 hidden md:flex items-start justify-start gap-20">
            <a
              className="text-white font-bold text-lg hover:text-nepRed"
              href='/'
            >
              <House size={30} />
            </a>
            
            <a 
              className="text-white font-bold text-lg hover:text-nepRed"
              href='/'
            >
              Home
            </a>

            <a 
              className="text-white font-bold text-lg hover:text-nepRed"
              href='/#category'
            >
              Category
            </a>

            <a 
              className="text-white font-bold text-lg hover:text-nepRed cursor-pointer"
              href='/tender'
            >
              All Tenders
            </a>
            { !user &&
              <a 
                className="text-white font-bold text-lg hover:text-nepRed cursor-pointer"
                href='/login'
              >
                Login
              </a>
            }
            { user &&
              <button
                className="text-white font-bold text-lg hover:text-nepRed cursor-pointer"
                onClick={async() => {
                  try{
                    await signOut(auth)
                  } catch (err){
                    alert(err.message || "Sign Out error")
                  }
                }}
              >
                Logout
              </button>
            }
        </div>


        {/* Mobile View */}
        <button 
          className='text-black bg-white rounded-sm font-bold text-lg border border-black md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={30} />
        </button>

        {
          isOpen && (
            <div className="absolute top-16 left-0 w-1/2 rounded-sm bg-nepBlue p-1 flex flex-col items-start gap-1 md:hidden z-50">
              <button
                className="text-white font-bold text-lg hover:text-nepRed hover:bg-white w-full text-left p-2 m-0"
                onClick={() => {
                  if(window.Location.pathname !== '/') {
                    window.location.href = '/';
                  }
                  window.scrollTo({top: 0, behavior: 'smooth'});
                  setIsOpen(false);
              }}>
                <House size={30} />
              </button>

              <button 
                className="text-white font-bold text-lg hover:text-nepRed hover:bg-white w-full text-left p-2 m-0"
                onClick={() => {
                  window.scrollTo({top: 0, behavior: 'smooth'});
                  setIsOpen(false);
              }}>
                Home</button>

              <button 
                className="text-white font-bold text-lg hover:text-nepRed hover:bg-white w-full text-left p-2 m-0"
                onClick={() => {
                  window.scrollTo({
                    top: document.querySelector('#about')?.offsetTop, 
                    behavior: 'smooth'
                  });
                  setIsOpen(false);
              }}>
                About</button>

              <a 
                className="text-white font-bold text-lg hover:text-nepRed hover:bg-white w-full text-left p-2 m-0 cursor-pointer"
                href='/tender'>
                Contact</a>
            </div>
          )
        }

    </nav>
  )
}

export default Navbar