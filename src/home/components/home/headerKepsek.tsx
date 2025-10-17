// import React from "react";

import ShortLine from "./shortLine"
import LongLine from "./longLine"


const headerKepalaSekolah = () => {
  return (
    <div className='flex items-start justify-center p-10'>
            <div className='relative'>
              <LongLine color="black" className="-top-2 right-0 "/>
              <ShortLine  color="black" className="-top-2 right-36"/>
              
              <h1 className="text-5xl md:text-[4rem] font-semibold text-[#0f4a56] leading-none">Kepala Sekolah</h1>
              
              <LongLine color="black" className="-bottom-3.5 left-0"/>

              <ShortLine color="black" className="-bottom-3.5 left-40"/>
            </div>
          </div>
  )
}

export default headerKepalaSekolah