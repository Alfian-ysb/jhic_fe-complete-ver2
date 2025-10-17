// import React from 'react'
import Navbar from '../components/navbar'
import HeroShowcase from '../components/heroShowcase'
import DynamicKaryaCategories from '../components/DynamicKaryaCategories'

const lenteraKarya = () => {
  return (
    <div className='py-30 flex flex-col gap-16'>
        <Navbar position="fixed" />
        <h1 className='text-2xl md:text-3xl font-metropolis w-full text-center py-1 md:py-7'>Ekspresikan dirimu melalui sastra dan seni</h1>
        <HeroShowcase />
        <DynamicKaryaCategories />
    </div>
  )
}

export default lenteraKarya