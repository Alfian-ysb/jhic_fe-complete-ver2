// import React from 'react'
import Navbar from '../components/navbar'
import JudulSejarah from '../components/sejarah/judulsejarah'
import ContentSejarah from '../components/sejarah/contentsejarah'

const Sejarah = () => {
  return (
    <div>
      <Navbar />

      <main className="py-10 lg:py-16 px-6 lg:px-16">
        <div className="flex items-stretch flex-col lg:flex-row gap-12 justify-between">
          <JudulSejarah className='lg:w-[35%]' />
          <ContentSejarah className='lg:w-[65%]' />
        </div>
      </main>
    </div>
  )
}

export default Sejarah
