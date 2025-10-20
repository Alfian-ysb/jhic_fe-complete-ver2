import { Routes, Route, Navigate } from 'react-router-dom'
import { DefaultSEO } from './components/SEO'
import './index.css'

// Home imports
import Home from './home/pages/home'
import Visimisi from './home/pages/visimisi'
import Sejarah from './home/pages/sejarah'
import SaranaPrasarana from './home/pages/sarana-prasarana'
import StrukturOrganisasi from './home/pages/strukturOrganisasi'
import TeachingFactory from './home/pages/TeachingFactory'
import Ekstrakurikuler from './home/pages/Ekstrakurikuler'
import OrganisasiSiswa from './home/pages/OrganisasiSiswa'
import Berita from './home/pages/berita'
import BeritaDetail from './home/pages/beritaDetail'
import ProgramKeahlian from './home/pages/ProgramKeahlian'
import ProgramKeahlianHehe from './home/components/programjurusan/ProgramJurusanContent'
import PrestasiSiswa from './home/pages/Prestasi'
import Footer from './home/components/home/footer'
import HomeNotFound from './home/pages/notFound'

// Auth imports
import { AuthProvider } from './auth/components/authContext'
import ProtectedRoute from './auth/components/ProtectedRoute'
import Login from './auth/pages/login'
import Signup from './auth/pages/signup'
import Dashboard from './auth/pages/dashboard'

// Lentera Karya imports
import LenteraKarya from './lentera-karya/pages/lenteraKarya'
import LenteraDashboard from './lentera-karya/pages/dashboard'
import UploadKarya from './lentera-karya/pages/uploadKarya'
import Detail from './lentera-karya/pages/detail'
import Admin from './lentera-karya/pages/admin/adminDashboard'
import AddCategory from './lentera-karya/pages/admin/components/CategoryManagement'
import LenteraNotFound from './lentera-karya/pages/notFound'

// SabaQuiz imports
import SabaQuiz from './sabaquiz/pages/SabaQuiz'
import MiniGame from './sabaquiz/pages/MiniGame'
import LeaderBoard from './sabaquiz/pages/LeaderBoard'
import Profile from './sabaquiz/pages/Profile'
import CreateQuiz from './sabaquiz/pages/CreateQuiz'
import LeagueOverview from './sabaquiz/pages/League'
import SabaNotFound from './sabaquiz/pages/notFound'

function App() {
  return (
    <AuthProvider>
      <DefaultSEO />
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

        {/* Lentera Karya Routes */}
        <Route path="/lentera-karya" element={<LenteraKarya />} />
        <Route path="/lentera-karya/dashboard" element={<LenteraDashboard />} />
        <Route path="/lentera-karya/upload" element={<UploadKarya />} />
        <Route path="/lentera-karya/detail/:id" element={<Detail />} />
        <Route path="/lentera-karya/admin" element={<Admin />} />
        <Route path="/lentera-karya/admin/categories/add" element={<AddCategory />} />

        {/* SabaQuiz Routes */}
        <Route path="/sabaquiz" element={<SabaQuiz />} />
        <Route path="/sabaquiz/minigame" element={<MiniGame />} />
        <Route path="/sabaquiz/leaderboard" element={<LeaderBoard />} />
        <Route path="/sabaquiz/profile" element={<Profile />} />
        <Route path="/sabaquiz/create-quiz" element={<CreateQuiz />} />
        <Route path="/sabaquiz/league" element={<LeagueOverview />} />

        {/* Home Routes */}
        <Route path="/" element={
          <>
            <main className="min-h-screen pb-20">
              <Home />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/sejarah" element={
          <>
            <main className="min-h-screen pb-20">
              <Sejarah />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/visi-dan-misi" element={
          <>
            <main className="min-h-screen pb-20">
              <Visimisi />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/sarana-prasarana" element={
          <>
            <main className="min-h-screen pb-20">
              <SaranaPrasarana />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/struktur-organisasi" element={
          <>
            <main className="min-h-screen pb-20">
              <StrukturOrganisasi />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/teaching-factory" element={
          <>
            <main className="min-h-screen pb-20">
              <TeachingFactory />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/ekstrakurikuler" element={
          <>
            <main className="min-h-screen pb-20">
              <Ekstrakurikuler />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/organisasi-siswa" element={
          <>
            <main className="min-h-screen pb-20">
              <OrganisasiSiswa />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/berita" element={
          <>
            <main className="min-h-screen pb-20">
              <Berita />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/berita/:id" element={
          <>
            <main className="min-h-screen pb-20">
              <BeritaDetail />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/program-keahlian/:id" element={
          <>
            <main className="min-h-screen pb-20">
              <ProgramKeahlian />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/program-keahlian/hehe" element={
          <>
            <main className="min-h-screen pb-20">
              <ProgramKeahlianHehe />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />
        <Route path="/prestasi" element={
          <>
            <main className="min-h-screen pb-20">
              <PrestasiSiswa />
            </main>
            <div className="mt-24">
              <Footer />
            </div>
          </>
        } />

        {/* 404 Routes */}
        <Route path="*" element={<HomeNotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
