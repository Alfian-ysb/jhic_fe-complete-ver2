// import React from 'react'
import image1 from '../../assets/img/image1.png'
import image2 from '../../assets/img/image2.png'
import image3 from '../../assets/img/image3.png'

const hero = () => {
    return (
        <div className="">
            <div className="grid grid-cols-2 gap-3 auto-rows-[18vh] sm:auto-rows-[24vh] md:auto-rows-[30vh] lg:auto-rows-[14vh]">
              {/* Kiri besar */}
              <div className="row-span-2 lg:row-span-3 xl:row-start-2 overflow-hidden rounded-2xl">
                <img src={image1} className="w-full h-full object-cover" />
              </div>

              {/* Kanan atas */}
              <div className="row-span-1 lg:row-span-2 xl:row-span-3 overflow-hidden rounded-2xl">
                <img src={image2} className="w-full h-full object-cover" />
              </div>

              {/* Kanan bawah */}
              <div className="row-span-1 lg:row-span-1 xl:row-span-2 overflow-hidden rounded-2xl">
                <img src={image3} className="w-full h-full object-cover" />
              </div>
            </div>
        </div>
    )
}

export default hero