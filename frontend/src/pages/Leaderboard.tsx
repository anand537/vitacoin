
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { Trophy, Medal, Crown, TrendingUp, Users, Star } from 'lucide-react'

const Leaderboard: React.FC = () => {
  const user = {
    username: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12
  }

  const [timeframe, setTimeframe] = useState('all-time')

  const leaderboardData = [
    {
      rank: 1,
      userId: 'user_002',
      username: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      coinBalance: 3150,
      totalBadges: 15,
      level: 9,
      weeklyEarnings: 425,
      isCurrentUser: false
    },
    {
      rank: 2,
      userId: 'user_001',
      username: 'Alex Chen',
      avatar: user.avatar,
      coinBalance: 2850,
      totalBadges: 12,
      level: 8,
      weeklyEarnings: 380,
      isCurrentUser: true
    },
    {
      rank: 3,
      userId: 'user_003',
      username: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      coinBalance: 1950,
      totalBadges: 8,
      level: 6,
      weeklyEarnings: 220,
      isCurrentUser: false
    },
    {
      rank: 4,
      userId: 'user_004',
      username: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      coinBalance: 1750,
      totalBadges: 10,
      level: 7,
      weeklyEarnings: 195,
      isCurrentUser: false
    },
    {
      rank: 5,
      userId: 'user_005',
      username: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      coinBalance: 1650,
      totalBadges: 9,
      level: 6,
      weeklyEarnings: 180,
      isCurrentUser: false
    }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBackground = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
    }
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  const currentUserRank = leaderboardData.find(u => u.isCurrentUser)?.rank || 0

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
            <p className="text-gray-600">See how you rank against other students</p>
          </motion.div>

          {/* User's Current Position */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Current Position</h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span className="text-lg font-bold">Rank #{currentUserRank}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>{user.coinBalance.toLocaleString()} coins</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-100 mb-1">Gap to #1</p>
                <p className="text-2xl font-bold">
                  {(leaderboardData[0].coinBalance - user.coinBalance).toLocaleString()} coins
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeframe Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Leaderboard Period</h3>
              <div className="flex space-x-2">
                {['all-time', 'monthly', 'weekly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      timeframe === period
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top 3 Podium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Top Performers</h3>
            
            <div className="flex items-end justify-center space-x-4">
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-20 h-16 bg-gray-300 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="mt-4">
                  <img
                    src={leaderboardData[1].avatar}
                    alt={leaderboardData[1].username}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-300"
                  />
                  <p className="font-semibold text-sm">{leaderboardData[1].username}</p>
                  <p className="text-xs text-gray-600">{leaderboardData[1].coinBalance.toLocaleString()} coins</p>
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-yellow-400 rounded-t-lg flex items-end justify-center pb-2">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div className="mt-4">
                  <img
                    src={leaderboardData[0].avatar}
                    alt={leaderboardData[0].username}
                    className="w-20 h-20 rounded-full mx-auto mb-2 border-4 border-yellow-400"
                  />
                  <p className="font-semibold">{leaderboardData[0].username}</p>
                  <p className="text-sm text-gray-600">{leaderboardData[0].coinBalance.toLocaleString()} coins</p>
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="w-20 h-12 bg-orange-400 rounded-t-lg flex items-end justify-center pb-2">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div className="mt-4">
                  <img
                    src={leaderboardData[2].avatar}
                    alt={leaderboardData[2].username}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-orange-400"
                  />
                  <p className="font-semibold text-sm">{leaderboardData[2].username}</p>
                  <p className="text-xs text-gray-600">{leaderboardData[2].coinBalance.toLocaleString()} coins</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Full Rankings</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {leaderboardData.map((student, index) => (
                <motion.div
                  key={student.userId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className={`p-6 border-2 ${getRankBackground(student.rank, student.isCurrentUser)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(student.rank)}
                    </div>
                    
                    <img
                      src={student.avatar}
                      alt={student.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-semibold ${student.isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>
                          {student.username} {student.isCurrentUser && '(You)'}
                        </h4>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-800">
                            {student.coinBalance.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">coins</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span>Level {student.level}</span>
                          <span>•</span>
                          <span>{student.totalBadges} badges</span>
                        </div>
                        <div className="flex items-center space-x-1 text-green-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>+{student.weeklyEarnings} this week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Leaderboard
