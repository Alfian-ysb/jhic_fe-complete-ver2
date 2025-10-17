// import React from 'react'
import Button from "../../components/button"

const homeTitle = ({className} : {className : string}) => {
  return (
    <div className={`font-poppins flex flex-col items-center lg:items-start content-center gap-4 md:gap-8 ${className}`}>
        <div className="w-full flex flex-col gap-3 text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
            <h1 className="font-medium text-center lg:text-start">Selamat Datang di</h1>
            <h1 className="lg:w-fit mx-auto lg:mx-0 text-center text-white font-semibold py-2 px-1 md:py-4 md:px-2 rounded-lg bg-[#0B4CF0]">SMK Negeri 1 Bantul</h1>
        </div>
        <p className="text-sm sm:text-xl lg:text-xl text-center lg:text-start text-neutral-500">Membangun ulang wajah sekolah yang dulu kusam jadi terang dan transparan dengan teknologi dan estetika.</p>
        <Button buttonText="Kunjungi" url="https://maps.google.com?q=SMK+Negeri+1+Bantul" blank />
    </div>
  )
}

export default homeTitle