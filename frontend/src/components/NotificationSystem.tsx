
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, AlertTriangle, Trophy, X, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'

interface Notification {
  id: string
  type: 'reward' | 'penalty' | 'achievement' | 'leaderboard'
  title: string
  message: string
  amount?: number
  timestamp: Date
  read: boolean
}

interface NotificationSystemProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onClearAll: () => void
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([])

  // Show new notifications as popups
  useEffect(() => {
    const newNotifications = notifications.filter(n => !n.read)
    
    newNotifications.forEach(notification => {
      // Show toast notification
      const toastContent = (
        <div className="flex items-center space-x-3">
          {getNotificationIcon(notification.type)}
          <div>
            <div className="font-semibold">{notification.title}</div>
            <div className="text-sm opacity-75">{notification.message}</div>
            {notification.amount && (
              <div className={`text-sm font-bold ${
                notification.type === 'penalty' ? 'text-red-300' : 'text-green-300'
              }`}>
                {notification.type === 'penalty' ? '-' : '+'}{notification.amount} coins
              </div>
            )}
          </div>
        </div>
      )

      if (notification.type === 'penalty') {
        toast.error(toastContent, { duration: 5000 })
      } else {
        toast.success(toastContent, { duration: 4000 })
      }

      // Show popup for important notifications
      if (notification.type === 'achievement' || (notification.amount && notification.amount >= 100)) {
        setVisibleNotifications(prev => [...prev, notification])
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
          setVisibleNotifications(prev => prev.filter(n => n.id !== notification.id))
          onMarkAsRead(notification.id)
        }, 4000)
      } else {
        // Mark as read immediately for minor notifications
        setTimeout(() => onMarkAsRead(notification.id), 1000)
      }
    })
  }, [notifications, onMarkAsRead])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Coins className="w-5 h-5 text-yellow-500" />
      case 'penalty':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'achievement':
        return <Trophy className="w-5 h-5 text-purple-500" />
      case 'leaderboard':
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      default:
        return <Coins className="w-5 h-5 text-gray-500" />
    }
  }

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'reward':
        return 'from-green-500 to-emerald-500'
      case 'penalty':
        return 'from-red-500 to-rose-500'
      case 'achievement':
        return 'from-purple-500 to-pink-500'
      case 'leaderboard':
        return 'from-blue-500 to-cyan-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const handleDismiss = (id: string) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id))
    onMarkAsRead(id)
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`bg-gradient-to-r ${getNotificationColors(notification.type)} rounded-xl shadow-lg overflow-hidden`}
          >
            <div className="bg-white bg-opacity-95 backdrop-blur-sm p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {notification.title}
                    </h4>
                    <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                    {notification.amount && (
                      <div className={`text-sm font-bold mt-2 ${
                        notification.type === 'penalty' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {notification.type === 'penalty' ? '-' : '+'}{notification.amount} Vitacoins
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDismiss(notification.id)}
                  className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Progress bar for auto-dismiss */}
              <motion.div
                className="h-1 bg-gray-200 rounded-full mt-3 overflow-hidden"
                initial={{ width: "100%" }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${getNotificationColors(notification.type)}`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Celebration particles for achievements */}
            {notification.type === 'achievement' && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 8 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ 
                      opacity: 0,
                      scale: 0,
                      x: "50%",
                      y: "50%"
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: `${50 + Math.cos((i * 45) * Math.PI / 180) * 100}%`,
                      y: `${50 + Math.sin((i * 45) * Math.PI / 180) * 100}%`
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationSystem
