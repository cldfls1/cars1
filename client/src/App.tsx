import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import { useWebSocket } from './hooks/useWebSocket'

// Pages
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Dashboard from './pages/Dashboard'
import Deals from './pages/Deals'
import DealChat from './pages/DealChat'
import AdminPanel from './pages/AdminPanel'

// Layout
import Layout from './components/Layout'

function App() {
  const { user, isAuthenticated } = useAuthStore()
  
  // Initialize WebSocket for authenticated users
  useWebSocket()

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
          {isAuthenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/deals/:id" element={<DealChat />} />
              
              {user?.role === 'admin' && (
                <Route path="/admin" element={<AdminPanel />} />
              )}
            </>
          )}
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
