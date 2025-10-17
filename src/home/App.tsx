  import './App.css'
  import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
  import Home from './pages/home'
  import NotFound from './pages/notFound'
  import Visimisi from './pages/visimisi'
  import Sejarah from './pages/sejarah'
  import SaranaPrasarana from  './pages/sarana-prasarana'
  import StrukturOrganisasi from './pages/strukturOrganisasi'
  import TeachingFactory  from './pages/TeachingFactory'
  import Ekstrakurikuler  from './pages/Ekstrakurikuler'
  import OrganisasiSiswa from './pages/OrganisasiSiswa'
  import Berita from './pages/berita'
  import BeritaDetail from './pages/beritaDetail'
  import ProgramKeahlian from './pages/ProgramKeahlian'
  import ProgramKeahlianHehe from './components/programjurusan/ProgramJurusanContent'
  import PrestasiSiswa from './pages/Prestasi'
  import Footer from './components/home/footer'

  function App() {
    return (
      <Router>
      <main className="min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sejarah" element={<Sejarah />} />
          <Route path="/visi-dan-misi" element={<Visimisi />} />
          <Route path="/sarana-prasarana" element={<SaranaPrasarana />} />
          <Route path="/struktur-organisasi" element={<StrukturOrganisasi />} />
          <Route path="/teaching-factory" element={<TeachingFactory />} />
          <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
          <Route path="/organisasi-siswa" element={<OrganisasiSiswa />} />
          <Route path='/berita' element={<Berita />} />
          <Route path='/berita/:id' element={<BeritaDetail />} />
          <Route path='/program-keahlian/:id' element={<ProgramKeahlian />} />
          <Route path='/program-keahlian/hehe' element={<ProgramKeahlianHehe />} />
          <Route path="/prestasi" element={<PrestasiSiswa /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </main>

    <div className="mt-24">
       <Footer />
      </div>
    </Router>
    )
  }

  export default App
