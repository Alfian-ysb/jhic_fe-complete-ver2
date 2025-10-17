import Navbar from '../components/navbar'
import Titlevisimisi from '../components/visimisi/Titlevisimisi'
import Visimisicontent from '../components/visimisi/visimisicontent'

const Visimisi = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-blue-100/60">
      <Navbar />
      <main className="py-20 px-6 lg:px-20 flex flex-col items-center">
        {/* Judul visi dan misi */}
        <Titlevisimisi className="mb-16" />

        {/* Konten */}
        <div className="w-full max-w-5xl">
          <Visimisicontent />
        </div>
      </main>
    </div>
  )
}

export default Visimisi
