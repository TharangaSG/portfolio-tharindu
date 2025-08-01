import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PortfolioProvider } from './contexts/PortfolioContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Research from './pages/Research'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout>
              <About />
            </Layout>
          } />
          <Route path="/projects" element={
            <Layout>
              <Projects />
            </Layout>
          } />
          <Route path="/research" element={
            <Layout>
              <Research />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
        </PortfolioProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App