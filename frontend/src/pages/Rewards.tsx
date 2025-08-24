
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { Gift, ShoppingCart, Star, Clock, CheckCircle } from 'lucide-react'

const Rewards: React.FC = () => {
  const user = {
    username: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12
  }

  const [selectedCategory, setSelectedCategory] = useState('all')

  const rewardItems = [
    {
      id: 1,
      name: 'Study Guide Bundle',
      description: 'Comprehensive study materials for all courses',
      cost: 500,
      category: 'academic',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      popular: true,
      available: true
    },
    {
      id: 2,
      name: 'Coffee Shop Voucher',
      description: '$10 voucher for campus coffee shop',
      cost: 200,
      category: 'food',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
      popular: false,
      available: true
    },
    {
      id: 3,
      name: 'Extended Library Access',
      description: '24/7 library access for one month',
      cost: 300,
      category: 'academic',
      image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg',
      popular: false,
      available: true
    },
    {
      id: 4,
      name: 'Premium Tutoring Session',
      description: 'One-on-one tutoring with expert instructors',
      cost: 800,
      category: 'academic',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg',
      popular: true,
      available: true
    },
    {
      id: 5,
      name: 'Campus Merchandise',
      description: 'University branded hoodie or t-shirt',
      cost: 400,
      category: 'merchandise',
      image: 'https://images.pexels.com/photos/1040427/pexels-photo-1040427.jpeg',
      popular: false,
      available: false
    },
    {
      id: 6,
      name: 'Late Assignment Pass',
      description: 'Submit one assignment up to 3 days late without penalty',
      cost: 150,
      category: 'academic',
      image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
      popular: true,
      available: true
    }
  ]

  const categories = [
    { id: 'all', name: 'All Items', count: rewardItems.length },
    { id: 'academic', name: 'Academic', count: rewardItems.filter(r => r.category === 'academic').length },
    { id: 'food', name: 'Food & Drinks', count: rewardItems.filter(r => r.category === 'food').length },
    { id: 'merchandise', name: 'Merchandise', count: rewardItems.filter(r => r.category === 'merchandise').length }
  ]

  const filteredRewards = selectedCategory === 'all' 
    ? rewardItems 
    : rewardItems.filter(item => item.category === selectedCategory)

  const [purchasingItem, setPurchasingItem] = useState<number | null>(null)

  const handlePurchase = async (item: any) => {
    if (user.coinBalance < item.cost) {
      return
    }

    setPurchasingItem(item.id)
    
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setPurchasingItem(null)
    // Here you would normally update the user's coin balance and add the item to their inventory
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Rewards Store</h1>
            <p className="text-gray-600">Spend your Vitacoins on amazing rewards and benefits</p>
          </motion.div>

          {/* Balance Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Balance</h2>
                <div className="flex items-center space-x-2">
                  <Gift className="w-6 h-6" />
                  <span className="text-3xl font-bold">{user.coinBalance.toLocaleString()}</span>
                  <span className="text-green-100">Vitacoins</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-100 mb-1">This Week</p>
                <p className="text-xl font-bold">+425 earned</p>
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${
                  !item.available ? 'opacity-60' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </div>
                  )}
                  {!item.available && (
                    <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Out of Stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gift className="w-5 h-5 text-purple-500" />
                      <span className="text-lg font-bold text-purple-600">{item.cost}</span>
                      <span className="text-sm text-gray-500">coins</span>
                    </div>
                    
                    <motion.button
                      onClick={() => handlePurchase(item)}
                      disabled={!item.available || user.coinBalance < item.cost || purchasingItem === item.id}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        !item.available
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : user.coinBalance < item.cost
                          ? 'bg-red-100 text-red-600 cursor-not-allowed'
                          : purchasingItem === item.id
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-500 text-white hover:bg-purple-600'
                      }`}
                      whileHover={item.available && user.coinBalance >= item.cost ? { scale: 1.05 } : {}}
                      whileTap={item.available && user.coinBalance >= item.cost ? { scale: 0.95 } : {}}
                    >
                      {purchasingItem === item.id ? (
                        <div className="flex items-center space-x-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Processing...</span>
                        </div>
                      ) : !item.available ? (
                        'Out of Stock'
                      ) : user.coinBalance < item.cost ? (
                        'Insufficient Coins'
                      ) : (
                        <div className="flex items-center space-x-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Purchase</span>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRewards.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No rewards found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Rewards
