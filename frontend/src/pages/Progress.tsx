
import React from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { Target, Award, TrendingUp, Calendar, Star, CheckCircle } from 'lucide-react'

const Progress: React.FC = () => {
  const user = {
    username: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12,
    level: 8,
    experiencePoints: 3200
  }

  const badges = [
    { id: 1, name: 'First Steps', description: 'Complete your first quiz', icon: '🎯', earned: true, earnedDate: '2024-11-15' },
    { id: 2, name: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🧠', earned: true, earnedDate: '2024-12-01' },
    { id: 3, name: 'Forum Helper', description: 'Get 50 upvotes on forum posts', icon: '🤝', earned: true, earnedDate: '2024-12-15' },
    { id: 4, name: 'Streak Warrior', description: 'Login for 30 consecutive days', icon: '🔥', earned: false, progress: 23 },
    { id: 5, name: 'Knowledge Seeker', description: 'Complete 25 quizzes', icon: '📚', earned: false, progress: 18 },
    { id: 6, name: 'Top Performer', description: 'Reach top 10 on leaderboard', icon: '🏆', earned: false, progress: 0 }
  ]

  const milestones = [
    { level: 5, title: 'Beginner Graduate', completed: true, reward: '100 coins' },
    { level: 10, title: 'Intermediate Scholar', completed: false, reward: '250 coins + Special Badge' },
    { level: 15, title: 'Advanced Learner', completed: false, reward: '500 coins + Premium Features' },
    { level: 20, title: 'Expert Student', completed: false, reward: '1000 coins + Exclusive Content' }
  ]

  const progressPercentage = (user.experiencePoints % 500) / 5
  const nextLevelXP = user.level * 500

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Progress</h1>
            <p className="text-gray-600">Track your learning journey and achievements</p>
          </motion.div>

          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Level Progress</h2>
              <div className="flex items-center space-x-2 text-purple-600">
                <Target className="w-5 h-5" />
                <span className="font-medium">Level {user.level}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{user.level}</span>
                </div>
                <p className="text-sm text-gray-600">Current Level</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">XP Progress</span>
                    <span className="font-medium">{user.experiencePoints % 500} / 500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {500 - (user.experiencePoints % 500)} XP to Level {user.level + 1}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-300">
                  <span className="text-xl font-bold text-gray-400">{user.level + 1}</span>
                </div>
                <p className="text-sm text-gray-600">Next Level</p>
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Badges & Achievements</h2>
              <div className="text-sm text-gray-600">
                {badges.filter(b => b.earned).length} of {badges.length} earned
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    badge.earned 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-3xl ${badge.earned ? '' : 'grayscale opacity-50'}`}>
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${badge.earned ? 'text-green-700' : 'text-gray-600'}`}>
                        {badge.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      
                      {badge.earned ? (
                        <div className="flex items-center text-xs text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>Earned {new Date(badge.earnedDate!).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {badge.progress !== undefined && (
                            <>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-medium">{badge.progress}/30</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${(badge.progress / 30) * 100}%` }}
                                />
                              </div>
                            </>
                          )}
                          <span className="text-xs text-gray-500">Not earned yet</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Level Milestones</h2>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.level}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl ${
                    milestone.completed ? 'bg-green-50 border border-green-200' : 
                    user.level >= milestone.level ? 'bg-blue-50 border border-blue-200' : 
                    'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    milestone.completed ? 'bg-green-500 text-white' :
                    user.level >= milestone.level ? 'bg-blue-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {milestone.level}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      milestone.completed ? 'text-green-700' : 
                      user.level >= milestone.level ? 'text-blue-700' : 
                      'text-gray-600'
                    }`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600">Reward: {milestone.reward}</p>
                  </div>
                  <div>
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : user.level >= milestone.level ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium"
                      >
                        Claim Reward
                      </motion.button>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Level {milestone.level - user.level} more
                      </div>
                    )}
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

export default Progress
