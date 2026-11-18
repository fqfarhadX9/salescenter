import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop'
import OwnerGate from './components/auth/OwnerGate'
import OwnerBar from './components/auth/OwnerBar'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import NotFoundPage from './pages/NotFoundPage'
import OwnerLoginPage from './pages/OwnerLoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Homepage: owner only (also enforced on the server by api/auth/home-gate.php) */}
        <Route
          path="/"
          element={
            <OwnerGate>
              <OwnerBar />
              <HomePage />
            </OwnerGate>
          }
        />
        <Route path="/owner-login" element={<OwnerLoginPage />} />
        <Route path="/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
