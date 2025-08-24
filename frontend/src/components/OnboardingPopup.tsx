
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coins, Sparkles, X, Gift } from 'lucide-react'

interface OnboardingPopupProps {
  isVisible: boolean
  onClose: () => void
  username: string
  bonusCoins: number
}

const OnboardingPopup: React.FC<OnboardingPopupProps> = ({ 
  isVisible, 
  onClose, 
  username, 
  bonusCoins 
}) => {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer1 = setTimeout(() => setAnimationStep(1), 500)
      const timer2 = setTimeout(() => setAnimationStep(2), 1500)
      const timer3 = setTimeout(() => setAnimationStep(3), 2500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isVisible])

  const floatingCoins = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={animationStep >= 2 ? {
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 1, 0.8],
        x: Math.cos((i * 45) * Math.PI / 180) * 100,
        y: Math.sin((i * 45) * Math.PI / 180) * 100,
        rotate: [0, 360]
      } : {}}
      transition={{ 
        duration: 1.5, 
        delay: i * 0.1,
        ease: "easeOut"
      }}
      style={{
        left: '50%',
        top: '50%'
      }}
    >
      <Coins className="w-6 h-6 text-yellow-500" />
    </motion.div>
  ))

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
          >
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200 to-orange-200 rounded-full opacity-30 transform translate-x-16 -translate-y-16" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Welcome Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome to Vitacoin! 🎉
                </h2>
                <p className="text-gray-600">
                  Hey {username}, you're all set to start earning!
                </p>
              </motion.div>

              {/* Coin Animation Area */}
              <div className="relative h-32 mb-6 flex items-center justify-center">
                {/* Central Coin */}
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={animationStep >= 1 ? { 
                    scale: [0, 1.3, 1], 
                    rotate: [0, 180, 360] 
                  } : {}}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Coins className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Floating Coins */}
                {floatingCoins}

                {/* Sparkle Effects */}
                {animationStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        animate={{
                          scale: [0, 1, 0],
                          rotate: [0, 180],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                        style={{
                          left: `${50 + Math.cos((i * 30) * Math.PI / 180) * 60}%`,
                          top: `${50 + Math.sin((i * 30) * Math.PI / 180) * 60}%`
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Bonus Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={animationStep >= 3 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 mb-6"
              >
                <div className="text-2xl font-bold text-green-700 mb-1">
                  +{bonusCoins} Vitacoins! 🎁
                </div>
                <p className="text-sm text-green-600">
                  Registration bonus credited to your account
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={animationStep >= 3 ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                whileTap={{ scale: 0.95 }}
              >
                Start Earning More! 🚀
              </motion.button>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={animationStep >= 3 ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="mt-4 text-xs text-gray-500"
              >
                💡 Complete quizzes, participate in forums, and claim daily bonuses to earn more coins!
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OnboardingPopup
