
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import TaskCard from '../components/TaskCard'
import NotificationSystem from '../components/NotificationSystem'
import { 
  Filter, 
  Search, 
  Grid3X3, 
  List, 
  Trophy, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Target,
  Award
} from 'lucide-react'
import toast from 'react-hot-toast'

const Tasks: React.FC = () => {
  // Mock user data
  const [user] = useState({
    userId: 'user_001',
    username: 'Alex Chen',
    email: 'alex.chen@university.edu',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12,
    level: 8
  })

  // Task data
  const [allTasks] = useState([
    {
      taskId: 'task_001',
      title: 'Complete React Basics Quiz',
      description: 'Test your knowledge of React fundamentals including components, props, and state management.',
      coinReward: 150,
      status: 'available' as const,
      deadline: '2025-01-25T23:59:59.000Z',
      category: 'quiz' as const,
      difficulty: 'easy' as const,
      estimatedTime: 30,
      progress: 0
    },
    {
      taskId: 'task_002',
      title: 'Submit JavaScript Project',
      description: 'Create a dynamic web application using vanilla JavaScript with DOM manipulation and event handling.',
      coinReward: 300,
      status: 'available' as const,
      deadline: '2025-01-30T23:59:59.000Z',
      category: 'project' as const,
      difficulty: 'hard' as const,
      estimatedTime: 180,
      progress: 0
    },
    {
      taskId: 'task_003',
      title: 'Write Forum Post: Best Practices',
      description: 'Share your insights about coding best practices in the community forum. Must receive at least 3 upvotes.',
      coinReward: 100,
      status: 'in_progress' as const,
      deadline: '2025-01-22T23:59:59.000Z',
      category: 'forum' as const,
      difficulty: 'medium' as const,
      estimatedTime: 45,
      progress: 60
    },
    {
      taskId: 'task_004',
      title: 'Watch Node.js Tutorial Series',
      description: 'Complete the 5-part Node.js tutorial series and submit reflection notes.',
      coinReward: 200,
      status: 'completed' as const,
      deadline: '2025-01-20T23:59:59.000Z',
      category: 'video' as const,
      difficulty: 'medium' as const,
      estimatedTime: 120,
      progress: 100
    },
    {
      taskId: 'task_005',
      title: 'Database Design Assignment',
      description: 'Design a normalized database schema for an e-commerce platform with proper relationships.',
      coinReward: 250,
      status: 'expired' as const,
      deadline: '2025-01-15T23:59:59.000Z',
      category: 'assignment' as const,
      difficulty: 'hard' as const,
      estimatedTime: 90,
      progress: 30
    }
  ])

  // User task status
  const [userTasks] = useState({
    task_003: { status: 'in_progress' as const, progress: 60 },
    task_004: { status: 'completed' as const, progress: 100 },
    task_005: { status: 'expired' as const, progress: 30 }
  })

  // State management
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'in_progress' | 'completed' | 'expired'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [notifications, setNotifications] = useState<any[]>([])

  // Filter tasks based on active tab and filters
  const filteredTasks = allTasks.filter(task => {
    const userTask = userTasks[task.taskId as keyof typeof userTasks]
    const taskStatus = userTask?.status || task.status

    // Tab filtering
    if (activeTab !== 'all' && taskStatus !== activeTab) return false
    
    // Search filtering
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchTerm.toLowerCase())) return false
    
    // Category filtering
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false
    
    // Difficulty filtering
    if (selectedDifficulty !== 'all' && task.difficulty !== selectedDifficulty) return false
    
    return true
  })

  // Tab counts
  const tabCounts = {
    all: allTasks.length,
    available: allTasks.filter(t => !(userTasks[t.taskId as keyof typeof userTasks]) && t.status === 'available').length,
    in_progress: allTasks.filter(t => userTasks[t.taskId as keyof typeof userTasks]?.status === 'in_progress').length,
    completed: allTasks.filter(t => userTasks[t.taskId as keyof typeof userTasks]?.status === 'completed').length,
    expired: allTasks.filter(t => userTasks[t.taskId as keyof typeof userTasks]?.status === 'expired' || t.status === 'expired').length
  }

  // Task statistics
  const taskStats = {
    totalCompleted: tabCounts.completed,
    totalCoinsEarned: allTasks
      .filter(t => userTasks[t.taskId as keyof typeof userTasks]?.status === 'completed')
      .reduce((sum, t) => sum + t.coinReward, 0),
    averageCompletion: tabCounts.completed > 0 ? 
      Math.round(allTasks
        .filter(t => userTasks[t.taskId as keyof typeof userTasks]?.status === 'completed')
        .reduce((sum, t) => sum + (userTasks[t.taskId as keyof typeof userTasks]?.progress || 0), 0) / tabCounts.completed) : 0,
    inProgressCount: tabCounts.in_progress
  }

  const handleAcceptTask = async (taskId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Task accepted successfully!')
      
      // Add notification
      const newNotification = {
        id: Date.now().toString(),
        type: 'achievement' as const,
        title: 'Task Accepted!',
        message: 'You have successfully accepted a new task. Good luck!',
        timestamp: new Date(),
        read: false
      }
      setNotifications(prev => [newNotification, ...prev])
      
    } catch (error) {
      toast.error('Failed to accept task')
    }
  }

  const handleCompleteTask = async (taskId: string) => {
    try {
      const task = allTasks.find(t => t.taskId === taskId)
      if (!task) return

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(`Task completed! +${task.coinReward} coins earned!`)
      
      // Add reward notification with animation
      const newNotification = {
        id: Date.now().toString(),
        type: 'reward' as const,
        title: 'Task Completed! 🎉',
        message: `Great job completing "${task.title}"!`,
        amount: task.coinReward,
        timestamp: new Date(),
        read: false
      }
      setNotifications(prev => [newNotification, ...prev])
      
    } catch (error) {
      toast.error('Failed to complete task')
    }
  }

  const handleNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const tabs = [
    { id: 'all', label: 'All Tasks', icon: Grid3X3, count: tabCounts.all },
    { id: 'available', label: 'Available', icon: Target, count: tabCounts.available },
    { id: 'in_progress', label: 'In Progress', icon: Clock, count: tabCounts.in_progress },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: tabCounts.completed },
    { id: 'expired', label: 'Expired', icon: XCircle, count: tabCounts.expired }
  ]

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
          {/* Header Section */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full transform -translate-x-12 translate-y-12" />
              
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-2">Task Center 📚</h1>
                <p className="text-indigo-100 mb-6">
                  Complete tasks, earn coins, and level up your skills!
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-5 h-5" />
                      <div>
                        <p className="text-sm opacity-80">Completed</p>
                        <p className="text-xl font-bold">{taskStats.totalCompleted}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <div>
                        <p className="text-sm opacity-80">Coins Earned</p>
                        <p className="text-xl font-bold">{taskStats.totalCoinsEarned}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <div>
                        <p className="text-sm opacity-80">In Progress</p>
                        <p className="text-xl font-bold">{taskStats.inProgressCount}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <div>
                        <p className="text-sm opacity-80">Success Rate</p>
                        <p className="text-xl font-bold">{taskStats.averageCompletion}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters & Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
          >
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-white'
                    }`}>
                      {tab.count}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Categories</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                  <option value="forum">Forum</option>
                  <option value="project">Project</option>
                  <option value="video">Video</option>
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tasks Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => {
                  const userTask = userTasks[task.taskId as keyof typeof userTasks]
                  return (
                    <motion.div
                      key={task.taskId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TaskCard
                        task={task}
                        userStatus={userTask?.status}
                        userProgress={userTask?.progress}
                        onAccept={handleAcceptTask}
                        onComplete={handleCompleteTask}
                        onViewDetails={(taskId) => console.log('View details:', taskId)}
                      />
                    </motion.div>
                  )
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <NotificationSystem
        notifications={notifications}
        onMarkAsRead={handleNotificationRead}
        onClearAll={() => setNotifications([])}
      />
    </div>
  )
}

export default Tasks
