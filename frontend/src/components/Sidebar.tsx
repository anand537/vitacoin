
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  TrendingUp, 
  CreditCard, 
  Trophy, 
  Gift, 
  Settings,
  Coins,
  CheckSquare
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'text-blue-500' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks', color: 'text-indigo-500' },
    { path: '/progress', icon: TrendingUp, label: 'My Progress', color: 'text-green-500' },
    { path: '/transactions', icon: CreditCard, label: 'Transactions', color: 'text-purple-500' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard', color: 'text-yellow-500' },
    { path: '/rewards', icon: Gift, label: 'Rewards', color: 'text-pink-500' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'text-gray-500' }
  ]

  return (
    <div className="w-64 bg-white shadow-xl border-r border-gray-100 h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Vitacoin
            </h1>
            <p className="text-xs text-gray-500">Student Rewards</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon 
                className={`w-5 h-5 ${
                  isActive ? 'text-white' : item.color
                } group-hover:scale-110 transition-transform`} 
              />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🎯</div>
          <p className="text-sm font-medium text-gray-700">Keep Learning!</p>
          <p className="text-xs text-gray-500 mt-1">Earn more coins daily</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
