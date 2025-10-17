import React from 'react'
import Navbar from '../components/navbar'
import dataSaranaPrasarana from '../data/saranaPrasarana.json'
import Title from "../components/tiltle"


const Saranaprasarana: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Title text="Sarana Prasarana" />
      <main className="py-15 lg:py-20 px-8 sm:px-14">
        <div className="w-full flex flex-col gap-12 items-start sm:px-10 md:px-15 lg:px-20 font-metropolis">
          {dataSaranaPrasarana.map((section, index) => (
            <div key={index} className="flex flex-col lg:flex-row w-full h-fit lg:h-[300px] rounded-2xl overflow-hidden shadow-lg">
              <img src={section.images} alt={section.title} className="min-w-2/5 h-full mb-4 object-cover" />
              <div className="flex-1 p-4">
                <h2 className="text-2xl font-medium mb-6">{section.title}</h2>
                <p className="text-lg text-gray-700">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Saranaprasarana