
import React, { useState } from 'react'
import { Bell, Coins, Award, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TopBarProps {
  user: {
    username: string
    avatar: string
    coinBalance: number
    totalBadges: number
  }
  notifications: Array<{
    id: string
    type: 'reward' | 'penalty' | 'achievement'
    message: string
    timestamp: string
    read: boolean
  }>
  onNotificationClick: () => void
}

const TopBar: React.FC<TopBarProps> = ({ user, notifications, onNotificationClick }) => {
  const [showProfile, setShowProfile] = useState(false)
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, {user.username}! 👋
          </h2>
          <p className="text-sm text-gray-500">Ready to earn some coins today?</p>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center space-x-6">
          {/* Coin Balance */}
          <motion.div 
            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Coins className="w-5 h-5 text-yellow-600" />
            </motion.div>
            <span className="font-bold text-yellow-700">{user.coinBalance.toLocaleString()}</span>
            <span className="text-xs text-yellow-600">coins</span>
          </motion.div>

          {/* Badge Counter */}
          <motion.div 
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-bold text-purple-700">{user.totalBadges}</span>
            <span className="text-xs text-purple-600">badges</span>
          </motion.div>

          {/* Notifications */}
          <motion.button
            onClick={onNotificationClick}
            className="relative p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.div>
            )}
          </motion.button>

          {/* User Profile */}
          <div className="relative">
            <motion.button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover border-2 border-purple-200"
              />
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-800">{user.username}</p>
                    <p className="text-sm text-gray-500">Level 8 Student</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    View Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Account Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
