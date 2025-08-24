
import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Progress from './pages/Progress'
import Transactions from './pages/Transactions'
import Leaderboard from './pages/Leaderboard'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { 
            background: '#1f2937', 
            color: '#fff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          },
          success: { 
            style: { 
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff'
            } 
          },
          error: { 
            style: { 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff'
            } 
          }
        }}
      />
      
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/tasks" 
              element={isAuthenticated ? <Tasks /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/progress" 
              element={isAuthenticated ? <Progress /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/transactions" 
              element={isAuthenticated ? <Transactions /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/leaderboard" 
              element={isAuthenticated ? <Leaderboard /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/rewards" 
              element={isAuthenticated ? <Rewards /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/settings" 
              element={isAuthenticated ? <Settings /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
