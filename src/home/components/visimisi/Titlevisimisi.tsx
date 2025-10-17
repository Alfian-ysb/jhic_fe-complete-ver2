import React from 'react'

interface TitlevisimisiProps {
  className?: string
}

const Titlevisimisi: React.FC<TitlevisimisiProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="text-center space-y-4">
        <p className="text-gray-400 text-xl">Visi & Misi</p>
        <h1 className="text-5xl lg:text-6xl font-bold text-blue-900">
          SMKN 1 Bantul
        </h1>
      </div>
    </div>
  )
}
export default Titlevisimisi