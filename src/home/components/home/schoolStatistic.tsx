// import React from 'react'

const schoolStatistic = ({className} : {className : string}) => {
  return (
    <div className={`font-red-hat w-4/5 sm:w-3/4 lg:w-2/3 xl:w-1/2 bg-primary-blue rounded-2xl px-0 md:px-14 drop-shadow-[0_7px_13px_rgba(8,50,71,0.3)] ${className}`}>
        <ol className='grid grid-cols-2 grid-rows-2 gap-y-6 sm:flex sm:justify-between text-secondary-white [&>li]:flex [&>li]:flex-col [&>li]:items-center [&>li]:gap-0 md:[&>li]:gap-2 px-8 py-4 text-sm md:text-base lg:text-lg'>
            <li>
                <span className=" font-bold text-xl md:text-3xl">1,700+</span>
                <span>Peserta Didik</span>
            </li>
            <li>
                <span className="font-bold text-xl md:text-3xl">170+</span>
                <span>Guru</span>
            </li>
            <li>
                <span className="font-bold text-xl md:text-3xl">8</span>
                <span>Jurusan</span>
            </li>
            <li>
                <span className="font-bold text-xl md:text-3xl">20</span>
                <span>Laboratorium</span>
            </li>
        </ol>
    </div>
  )
}

export default schoolStatistic