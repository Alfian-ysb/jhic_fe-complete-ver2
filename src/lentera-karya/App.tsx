import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LenteraKarya from './pages/lenteraKarya'
import NotFound from './pages/notFound'
import Dashboard from './pages/dashboard'
import UploadKarya from './pages/uploadKarya'
import Detail from './pages/detail'
import Admin from './pages/admin/adminDashboard'
import AddCategory from './pages/admin/components/CategoryManagement'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LenteraKarya />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadKarya />} />  
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/categories/add" element={<AddCategory />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App
