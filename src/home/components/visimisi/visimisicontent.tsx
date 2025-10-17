import React from 'react'

const Visimisicontent: React.FC = () => {
  return (
    <div className="space-y-10 w-full">
      {/* Visi */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
          <span className="w-12 h-[2px] bg-gray-400" />
          Visi
          <span className="w-12 h-[2px] bg-gray-400" />
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Terwujudnya sekolah berkualitas, berkarakter dan berwawasan lingkungan
        </p>
      </div>

      {/* Misi */}
      <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-4">
          <span className="w-12 h-[2px] bg-gray-400" />
          Misi
          <span className="w-12 h-[2px] bg-gray-400" />
        </h2>

        <ul className="space-y-4 text-gray-800 text-base leading-relaxed list-disc list-inside">
          <li>Menyiapkan sarana prasarana dan SDM yang memenuhi SNP (Standar Nasional Pendidikan)</li>
          <li>Melaksanakan pembelajaran yang berbasis sains dan teknologi</li>
          <li>Mengimplementasikan iman, takwa dan nilai-nilai karakter bangsa dalam kehidupan sehari-hari</li>
          <li>Melaksanakan pembelajaran berbasis lingkungan serta mengaplikasikannya dalam kehidupan sehari-hari</li>
          <li>Menyiapkan tamatan yang mampu mengisi dan menciptakan lapangan kerja serta mengembangkan profesionalitas di bidang bisnis.</li>
        </ul>
      </div>
    </div>
  )
}

export default Visimisicontent
