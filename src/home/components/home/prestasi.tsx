import React from 'react'
import type PrestasiItem from './prestasi';


export interface PrestasiItem {
  id: number
  image: string
  title: string
  description: string
}


interface PrestasiProps {
  items: PrestasiItem[]
  grid?: boolean          // if true, kalo make grid, else pakai carousel
}


const Prestasi: React.FC<PrestasiProps> = ({ items, grid = true }) => {
  return (
    <div className={  grid ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-transparent' : 'flex gap-4 overflow-visible bg-transparent justify-center items-center px-2'}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`bg-white rounded-2xl h-full shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-4${
            !grid ? 'flex-shrink-0 w-80' : ''
          }`}
        >
          <div className="w-full h-full bg-gray-300 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover aspect-square items-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = ''
              }}
            />
          </div>
          <div className="p-6 text-center h-full">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Prestasi;
