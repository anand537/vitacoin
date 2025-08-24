
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Clock, Sparkles, Coins } from 'lucide-react'

interface DailyClaimButtonProps {
  canClaim: boolean
  nextClaimTime?: Date
  onClaim: () => Promise<{ coins: number; streak: number }>
}

const DailyClaimButton: React.FC<DailyClaimButtonProps> = ({ 
  canClaim, 
  nextClaimTime, 
  onClaim 
}) => {
  const [claiming, setClaiming] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [rewardData, setRewardData] = useState<{ coins: number; streak: number } | null>(null)
  const [timeLeft, setTimeLeft] = useState('')

  // Countdown timer
  useEffect(() => {
    if (!canClaim && nextClaimTime) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const target = nextClaimTime.getTime()
        const difference = target - now

        if (difference > 0) {
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          
          setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        } else {
          setTimeLeft('')
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [canClaim, nextClaimTime])

  const handleClaim = async () => {
    if (!canClaim || claiming) return

    setClaiming(true)
    try {
      const result = await onClaim()
      setRewardData(result)
      setShowReward(true)
      
      // Hide reward popup after 3 seconds
      setTimeout(() => {
        setShowReward(false)
        setRewardData(null)
      }, 3000)
    } catch (error) {
      console.error('Failed to claim daily bonus:', error)
    } finally {
      setClaiming(false)
    }
  }

  return (
    <>
      <div className="relative">
        <motion.button
          onClick={handleClaim}
          disabled={!canClaim || claiming}
          className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
            canClaim 
              ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={canClaim ? { scale: 1.05 } : {}}
          whileTap={canClaim ? { scale: 0.95 } : {}}
        >
          {/* Glowing Effect */}
          {canClaim && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-75"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ borderRadius: 'inherit' }}
            />
          )}

          {/* Sparkle Animation */}
          {canClaim && (
            <div className="absolute inset-0">
              {Array.from({ length: 6 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  style={{
                    left: `${20 + (i * 12)}%`,
                    top: `${20 + (i % 2) * 60}%`
                  }}
                >
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Button Content */}
          <div className="relative z-10 flex items-center space-x-3">
            {claiming ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Coins className="w-6 h-6" />
                </motion.div>
                <span>Claiming...</span>
              </>
            ) : canClaim ? (
              <>
                <Gift className="w-6 h-6" />
                <span>Claim Daily Coins</span>
              </>
            ) : (
              <>
                <Clock className="w-6 h-6" />
                <div className="text-center">
                  <div>Next Claim In</div>
                  <div className="text-sm font-mono">{timeLeft}</div>
                </div>
              </>
            )}
          </div>
        </motion.button>
      </div>

      {/* Reward Popup */}
      <AnimatePresence>
        {showReward && rewardData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-100 text-center min-w-[280px]">
              {/* Celebration Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Coins className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Daily Bonus Claimed! 🎉
              </h3>
              
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                +{rewardData.coins} Coins
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {rewardData.streak > 1 && `${rewardData.streak} day streak! 🔥`}
              </p>

              {/* Floating Coins Animation */}
              <div className="relative h-8">
                {Array.from({ length: 5 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ opacity: 1, y: 0, x: 0 }}
                    animate={{
                      opacity: [1, 0],
                      y: [-20, -60],
                      x: [(i - 2) * 10, (i - 2) * 20]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                    style={{ left: '50%' }}
                  >
                    <Coins className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DailyClaimButton
