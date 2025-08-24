import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import OnboardingPopup from '../components/OnboardingPopup'
import DailyClaimButton from '../components/DailyClaimButton'
import NotificationSystem from '../components/NotificationSystem'
import { TrendingUp, Users, Target, Calendar, Coins, Award, ArrowUp, ArrowDown } from 'lucide-react'
import api from '../lib/api'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'reward',
      title: 'Welcome to Vitacoin!',
      message: 'Start earning coins by completing tasks',
      timestamp: new Date(),
      read: false
    }
  ])

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [canClaimDaily, setCanClaimDaily] = useState(true)
  const [nextClaimTime] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000))

  // Recent transactions (will be fetched from API)
  const [recentTransactions, setRecentTransactions] = useState([
    { id: '1', type: 'earn', amount: 100, description: 'Welcome Bonus', time: 'Just now', icon: TrendingUp }
  ])

  // Leaderboard data (will be fetched from API)
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'Loading...', coins: 0, avatar: '', isCurrentUser: false }
  ])

  useEffect(() => {
    fetchUserData()
    fetchLeaderboard()
    fetchTransactions()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      // For demo purposes, we'll use the first user from the API
      const users = await api.users.getAll()
      if (users.length > 0) {
        const userData = users[0]
        setUser({
          userId: userData.userId,
          username: userData.username,
          email: userData.email,
          avatar: userData.avatar,
          coinBalance: userData.coinBalance,
          totalBadges: userData.totalBadges,
          level: userData.level,
          experiencePoints: userData.experiencePoints,
          isNewUser: userData.coinBalance === 0 // Simple heuristic for new user
        })
        setShowOnboarding(userData.coinBalance === 0)
      }
    } catch (err) {
      setError('Failed to load user data')
      console.error('Error fetching user:', err)
      
      // Fallback mock data for demo
      setUser({
        userId: 'user_001',
        username: 'Demo User',
        email: 'demo@university.edu',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        coinBalance: 2850,
        totalBadges: 12,
        level: 8,
        experiencePoints: 3200,
        isNewUser: false
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const users = await api.users.getAll()
      const leaderboardData = users
        .sort((a, b) => b.coinBalance - a.coinBalance)
        .slice(0, 5)
        .map((user, index) => ({
          rank: index + 1,
          name: user.username,
          coins: user.coinBalance,
          avatar: user.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
          isCurrentUser: user.userId === user?.userId
        }))
      
      setLeaderboard(leaderboardData)
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
    }
  }

  const fetchTransactions = async () => {
    try {
      if (user) {
        const transactions = await api.coin.getTransactions(user.userId, 1, 5)
        setRecentTransactions(
          transactions.transactions.map(tx => ({
            id: tx.transactionId,
            type: tx.type,
            amount: tx.amount,
            description: tx.description,
            time: new Date(tx.createdAt || tx.timestamp).toLocaleDateString(),
            icon: tx.type === 'earn' ? TrendingUp : ArrowDown
          }))
        )
      }
    } catch (err) {
      console.error('Error fetching transactions:', err)
    }
  }

  const handleDailyClaim = async () => {
    try {
      if (!user) return { coins: 0, streak: 0 }
      
      const result = await api.coin.addCoins({
        userId: user.userId,
        amount: 50,
        description: 'Daily login bonus',
        category: 'daily_claim'
      })
      
      setCanClaimDaily(false)
      
      // Update user balance
      setUser(prev => prev ? { ...prev, coinBalance: prev.coinBalance + 50 } : null)
      
      // Add notification
      const newNotification = {
        id: Date.now().toString(),
        type: 'reward',
        title: 'Daily Bonus Claimed!',
        message: 'You earned your daily login bonus!',
        amount: 50,
        timestamp: new Date(),
        read: false
      }
      setNotifications(prev => [newNotification, ...prev])
      
      return { coins: 50, streak: 7 }
    } catch (err) {
      console.error('Error claiming daily bonus:', err)
      throw err
    }
  }

  const handleNotificationRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const handleClearNotifications = () => {
    setNotifications([])
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-2xl mb-4">⚠️</div>
          <p className="text-gray-800">{error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 items-center justify-center">
        <div className="text-center">
          <p className="text-gray-800">No user data available</p>
        </div>
      </div>
    )
  }

  // Progress to next level
  const nextLevelXP = user.level * 500
  const progressPercentage = (user.experiencePoints % 500) / 5

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <TopBar 
          user={user} 
          notifications={notifications}
          onNotificationClick={() => {}}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full transform -translate-x-12 translate-y-12" />
              
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user.username}! 🚀</h1>
                <p className="text-purple-100 mb-6">
                  Complete activities, earn Vitacoins, and climb the leaderboard!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <DailyClaimButton
                    canClaim={canClaimDaily}
                    nextClaimTime={nextClaimTime}
                    onClaim={handleDailyClaim}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl font-semibold hover:bg-opacity-30 transition-all"
                  >
                    View Available Quizzes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold text-purple-600">Level {user.level}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress to Level {user.level + 1}</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Coin Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Coin Balance</p>
                  <p className="text-2xl font-bold text-green-600">{user.coinBalance.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <Coins className="w-4 h-4 mr-1" />
                <span>Vitacoins</span>
              </div>
            </motion.div>

            {/* Leaderboard Position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Leaderboard Rank</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    #{leaderboard.findIndex(s => s.isCurrentUser) + 1 || '?'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="text-sm text-yellow-600">
                {leaderboard[0] && (
                  <span>{user.coinBalance - leaderboard[0].coins} coins behind #1</span>
                )}
              </div>
            </motion.div>

            {/* Badges Earned */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Badges Earned</p>
                  <p className="text-2xl font-bold text-orange-600">{user.totalBadges}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="text-sm text-orange-600">
                <span>🏆 Achievements</span>
              </div>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <transaction.icon className={`w-5 h-5 ${
                        transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earn' ? '+' : ''}{transaction.amount}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mini Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Top Students</h3>
                <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  View Full
                </button>
              </div>
              
              <div className="space-y-4">
                {leaderboard.map((student, index) => (
                  <motion.div
                    key={student.rank}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      student.isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                      student.rank === 2 ? 'bg-gray-100 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {student.rank}
                    </div>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${student.isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>
                        {student.name} {student.isCurrentUser && '(You)'}
                      </p>
                      <p className="text-sm text-gray-500">{student.coins.toLocaleString()} coins</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Popups */}
      <OnboardingPopup
        isVisible={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        username={user.username}
        bonusCoins={500}
      />

      <NotificationSystem
        notifications={notifications}
        onMarkAsRead={handleNotificationRead}
        onClearAll={handleClearNotifications}
      />
    </div>
  )
}

export default Dashboard
