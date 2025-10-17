import React from 'react'
import HeaderKepalaSekolah from './headerKepsek'
import LongLine from './longLine'
import ShortLine from './shortLine'

type KepalaSekolahProps = {
  imageSrc: string
  name: string
  children?: React.ReactNode
  className?: string
}

const KepalaSekolah: React.FC<KepalaSekolahProps> = ({ imageSrc, name, children, className }) => {
  return (
    <div className={className ?? 'justify-center items-center flex flex-col w-full gap-y-12 md:gap-y-28 py-12 md:py-16 lg:py-20'}>
      <HeaderKepalaSekolah/>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] grid-rows-[auto_auto] md:grid-rows-[1fr_10fr] gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-0 items-start min-h-[auto] md:h-[90vh] px-4 sm:px-6 md:px-[5%]'>
        {/* Image occupies left column spanning both rows */}
        <div className='order-1 md:order-none md:col-start-1 md:row-start-1 md:row-span-2'>
          <img src={imageSrc} alt={`Foto ${name}`} className='w-full md:w-6xl h-auto rounded-md' loading='lazy' />
        </div>

        {/* Name (top-right) */}
        <div className='order-2 md:order-none md:col-start-2 md:row-start-1'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 font-metropolis'>{name}</h2>
          <LongLine color='#0093DD' className='w-32 sm:w-36 md:w-44'/>
          <ShortLine color='#0093DD' className='ml-32 sm:ml-36 md:ml-48'/>
        </div>

        {/* Body (bottom-right) */}
        <div className='order-3 md:order-none md:col-start-2 md:row-start-2 text-left items-start pl-0 md:pl-7'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default KepalaSekolah
