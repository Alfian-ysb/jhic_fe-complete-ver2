import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Lazy load apps
const HomeApp = React.lazy(() => import('./home/App'))
const AuthApp = React.lazy(() => import('./auth/App'))
const LenteraApp = React.lazy(() => import('./lentera-karya/App'))
const SabaQuizApp = React.lazy(() => import('./sabaquiz/App'))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/*" element={<AuthApp />} />
          <Route path="/lentera-karya/*" element={<LenteraApp />} />
          <Route path="/sabaquiz/*" element={<SabaQuizApp />} />
          <Route path="/*" element={<HomeApp />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
