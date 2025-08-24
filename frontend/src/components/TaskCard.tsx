
import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Coins, 
  CheckCircle, 
  PlayCircle, 
  AlertCircle, 
  XCircle,
  BookOpen,
  Code,
  MessageSquare,
  FolderOpen,
  Video,
  FileText,
  Star
} from 'lucide-react'

interface TaskCardProps {
  task: {
    taskId: string
    title: string
    description: string
    coinReward: number
    status: 'available' | 'in_progress' | 'completed' | 'expired'
    deadline: string
    category: 'quiz' | 'assignment' | 'forum' | 'project' | 'reading' | 'video'
    difficulty: 'easy' | 'medium' | 'hard'
    estimatedTime: number
    progress?: number
  }
  userStatus?: 'accepted' | 'in_progress' | 'completed' | 'expired'
  userProgress?: number
  onAccept?: (taskId: string) => void
  onComplete?: (taskId: string) => void
  onViewDetails?: (taskId: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  userStatus, 
  userProgress = 0, 
  onAccept, 
  onComplete, 
  onViewDetails 
}) => {
  const getCategoryIcon = (category: string) => {
    const iconMap = {
      quiz: BookOpen,
      assignment: FileText,
      forum: MessageSquare,
      project: FolderOpen,
      reading: BookOpen,
      video: Video
    }
    const Icon = iconMap[category as keyof typeof iconMap] || BookOpen
    return <Icon className="w-5 h-5" />
  }

  const getDifficultyColor = (difficulty: string) => {
    const colorMap = {
      easy: 'text-green-600 bg-green-100',
      medium: 'text-yellow-600 bg-yellow-100',
      hard: 'text-red-600 bg-red-100'
    }
    return colorMap[difficulty as keyof typeof colorMap] || 'text-gray-600 bg-gray-100'
  }

  const getStatusConfig = () => {
    const status = userStatus || task.status
    const configs = {
      available: {
        badge: 'Available',
        color: 'text-blue-600 bg-blue-100',
        icon: PlayCircle,
        actionText: 'Accept Task'
      },
      accepted: {
        badge: 'Accepted',
        color: 'text-purple-600 bg-purple-100',
        icon: Clock,
        actionText: 'Continue'
      },
      in_progress: {
        badge: 'In Progress',
        color: 'text-orange-600 bg-orange-100',
        icon: Clock,
        actionText: 'Continue'
      },
      completed: {
        badge: 'Completed',
        color: 'text-green-600 bg-green-100',
        icon: CheckCircle,
        actionText: 'View Details'
      },
      expired: {
        badge: 'Expired',
        color: 'text-red-600 bg-red-100',
        icon: XCircle,
        actionText: 'View Details'
      }
    }
    return configs[status as keyof typeof configs] || configs.available
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon
  const isDeadlineSoon = new Date(task.deadline) < new Date(Date.now() + 24 * 60 * 60 * 1000)
  const isExpired = new Date(task.deadline) < new Date()
  const currentProgress = userProgress || task.progress || 0

  const handleAction = () => {
    if (userStatus === 'completed' || userStatus === 'expired' || task.status === 'expired') {
      onViewDetails?.(task.taskId)
    } else if (userStatus === 'in_progress' || userStatus === 'accepted') {
      onViewDetails?.(task.taskId)
    } else {
      onAccept?.(task.taskId)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 ${
        isExpired ? 'border-red-200 opacity-75' : 
        userStatus === 'completed' ? 'border-green-200' :
        userStatus === 'in_progress' ? 'border-orange-200' :
        'border-gray-100 hover:border-purple-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${getDifficultyColor(task.difficulty).split(' ')[1]}`}>
            {getCategoryIcon(task.category)}
          </div>
          <div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}>
              {statusConfig.badge}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full"
          >
            <Coins className="w-4 h-4 text-yellow-600" />
            <span className="font-bold text-yellow-700">{task.coinReward}</span>
          </motion.div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {task.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Progress Bar (for in-progress tasks) */}
      {(userStatus === 'in_progress' || userStatus === 'accepted') && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-semibold text-orange-600">{currentProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      )}

      {/* Task Details */}
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{task.estimatedTime}min</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
            <Star className="w-3 h-3 inline mr-1" />
            {task.difficulty}
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div className={`flex items-center space-x-2 mb-4 text-sm ${
        isDeadlineSoon && !isExpired ? 'text-orange-600' : 
        isExpired ? 'text-red-600' : 'text-gray-500'
      }`}>
        {isDeadlineSoon && !isExpired && <AlertCircle className="w-4 h-4" />}
        {isExpired && <XCircle className="w-4 h-4" />}
        <Clock className="w-4 h-4" />
        <span>
          Due: {new Date(task.deadline).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
        {isDeadlineSoon && !isExpired && <span className="font-semibold">(Soon!)</span>}
      </div>

      {/* Action Button */}
      <motion.button
        onClick={handleAction}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isExpired && userStatus !== 'completed'}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
          userStatus === 'completed' 
            ? 'bg-green-500 text-white hover:bg-green-600'
            : userStatus === 'in_progress' || userStatus === 'accepted'
            ? 'bg-orange-500 text-white hover:bg-orange-600'
            : isExpired
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
        }`}
      >
        <StatusIcon className="w-5 h-5" />
        <span>{statusConfig.actionText}</span>
      </motion.button>
    </motion.div>
  )
}

export default TaskCard
