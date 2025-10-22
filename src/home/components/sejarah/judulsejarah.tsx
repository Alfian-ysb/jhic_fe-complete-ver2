// import React from 'react'
import schoolImg from '../../assets/img/outsideOfSchool.png'


const JudulSejarah = ({className}: {className: string}) => {
    return (
    <div className={`w-full flex h-full flex-col items-end lg:border-r-4 border-gray-800 pr-8 ${className}`}>    
        <h1 className="w-full flex flex-col text-[2rem] md:text-[3rem] lg:text-[4rem] font-tt-norms font-medium text-center lg:text-right lg:leading-20">
          <span>Perjalanan</span>
          <span>Panjang</span>
          <span>SMKN 1 Bantul</span>
        </h1>
        <div className='w-7/10 mt-8 rounded-2xl overflow-hidden hidden lg:block shadow-[4px_4px_27px_rgba(0,0,0,0.25)]'>
          <img className="w-full aspect-1/1 object-cover h-auto" src={schoolImg} alt="Sekolah" />
        </div>
     </div>
    
  )
}
export default JudulSejarah