import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './Layout'

// Lazy load pages for better performance
const Landing = lazy(() => import('../pages/Landing'))
const Room = lazy(() => import('../pages/Room'))
const Settings = lazy(() => import('../pages/Settings'))
const Leave = lazy(() => import('../pages/Leave'))

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomName" element={<Room />} />
            <Route path="/room/:roomName/settings" element={<Settings />} />
            <Route path="/leave" element={<Leave />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
