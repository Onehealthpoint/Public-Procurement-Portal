import React from 'react'

const Hero = () => {
  return (
    <div className='w-[99%] relative mx-auto mt-0 overflow-clip'>
      <img src="/images/Digital_Nepal.jpg" alt="Hero" className='w-full h-[60vh] object-cover' />
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50'></div>
      <div className='absolute top-1/2 right-2/4 transform -translate-y-1/2 text-white font-mono text-left p-4'>
        <h1 className='text-xl md:text-4xl font-bold'>Welcome to the Public eTender and Contract Portal</h1>
        <p className='md:text-lg mt-4'>Help to shape the future by your own hands.</p>
        <p className='text-xl md:text-4xl font-semibold mt-6'>Building a better Nepal together.</p>
      </div>
    </div>
  )
}

export default Hero