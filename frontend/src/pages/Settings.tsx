
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { User, Bell, Shield, Palette, HelpCircle, LogOut } from 'lucide-react'

const Settings: React.FC = () => {
  const user = {
    username: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12,
    email: 'alex.chen@university.edu'
  }

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    achievementAlerts: true,
    leaderboardUpdates: false,
    weeklyReports: true
  })

  const [theme, setTheme] = useState('light')

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar 
          user={user} 
          notifications={[]}
          onNotificationClick={() => {}}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and settings</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-20 h-20 rounded-full object-cover border-4 border-purple-200"
                  />
                  <div>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF (max 2MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      defaultValue={user.username}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Coins</span>
                  <span className="font-bold text-purple-600">{user.coinBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Badges Earned</span>
                  <span className="font-bold text-purple-600">{user.totalBadges}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-bold text-purple-600">Nov 2024</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {key === 'dailyReminders' && 'Get reminded to claim your daily coins'}
                      {key === 'achievementAlerts' && 'Notifications when you earn new badges'}
                      {key === 'leaderboardUpdates' && 'Updates about your ranking changes'}
                      {key === 'weeklyReports' && 'Weekly summary of your progress'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleNotificationChange(key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Other Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Theme Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Palette className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-800">Appearance</h3>
              </div>
              <div className="space-y-3">
                {['light', 'dark', 'auto'].map((themeOption) => (
                  <label key={themeOption} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={themeOption}
                      checked={theme === themeOption}
                      onChange={(e) => setTheme(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="capitalize">{themeOption} Mode</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-purple-500" />
                <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left py-2 text-gray-700 hover:text-purple-600 transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left py-2 text-gray-700 hover:text-purple-600 transition-colors">
                  Privacy Settings
                </button>
                <button className="w-full text-left py-2 text-gray-700 hover:text-purple-600 transition-colors">
                  Data Export
                </button>
              </div>
            </motion.div>
          </div>

          {/* Help & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="w-6 h-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="text-2xl mb-2">📚</div>
                <div className="font-medium">Help Center</div>
              </button>
              <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="text-2xl mb-2">💬</div>
                <div className="font-medium">Contact Support</div>
              </button>
              <button className="p-4 text-center border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                <div className="text-2xl mb-2">🐛</div>
                <div className="font-medium">Report Bug</div>
              </button>
            </div>
          </motion.div>

          {/* Sign Out */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Settings
