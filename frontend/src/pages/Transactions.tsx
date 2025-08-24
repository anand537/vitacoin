
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import { 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Calendar,
  Coins,
  Trophy,
  MessageSquare,
  AlertTriangle,
  Gift,
  Search
} from 'lucide-react'

const Transactions: React.FC = () => {
  const user = {
    username: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12
  }

  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const transactions = [
    {
      id: 'txn_001',
      type: 'earn',
      category: 'daily_claim',
      amount: 50,
      description: 'Daily login bonus',
      timestamp: '2025-01-16T08:00:00.000Z',
      metadata: { streak: 7 }
    },
    {
      id: 'txn_002',
      type: 'earn',
      category: 'quiz',
      amount: 100,
      description: 'JavaScript Fundamentals Quiz - Perfect Score!',
      timestamp: '2025-01-15T14:30:00.000Z',
      metadata: { score: 100, perfectScore: true }
    },
    {
      id: 'txn_003',
      type: 'penalty',
      category: 'penalty',
      amount: -25,
      description: 'Late assignment submission',
      timestamp: '2025-01-14T16:45:00.000Z',
      metadata: { daysLate: 2 }
    },
    {
      id: 'txn_004',
      type: 'earn',
      category: 'forum',
      amount: 75,
      description: 'Helpful forum post received 5 upvotes',
      timestamp: '2025-01-14T10:15:00.000Z',
      metadata: { upvotes: 5 }
    },
    {
      id: 'txn_005',
      type: 'earn',
      category: 'achievement',
      amount: 200,
      description: 'Quiz Master badge earned',
      timestamp: '2025-01-13T09:20:00.000Z',
      metadata: { badgeName: 'Quiz Master' }
    },
    {
      id: 'txn_006',
      type: 'spend',
      category: 'reward_purchase',
      amount: -150,
      description: 'Purchased study guide PDF',
      timestamp: '2025-01-12T11:30:00.000Z',
      metadata: { itemName: 'Advanced JavaScript Guide' }
    }
  ]

  const getTransactionIcon = (category: string, type: string) => {
    switch (category) {
      case 'quiz':
        return <Trophy className="w-5 h-5" />
      case 'forum':
        return <MessageSquare className="w-5 h-5" />
      case 'daily_claim':
        return <Calendar className="w-5 h-5" />
      case 'achievement':
        return <Trophy className="w-5 h-5" />
      case 'penalty':
        return <AlertTriangle className="w-5 h-5" />
      case 'reward_purchase':
        return <Gift className="w-5 h-5" />
      default:
        return <Coins className="w-5 h-5" />
    }
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earn':
        return 'text-green-600 bg-green-100'
      case 'penalty':
        return 'text-red-600 bg-red-100'
      case 'spend':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalEarned = transactions.filter(t => t.type === 'earn').reduce((sum, t) => sum + t.amount, 0)
  const totalSpent = Math.abs(transactions.filter(t => t.type === 'spend' || t.type === 'penalty').reduce((sum, t) => sum + t.amount, 0))

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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Transaction History</h1>
            <p className="text-gray-600">Track all your Vitacoin earnings and spending</p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earned</p>
                  <p className="text-2xl font-bold text-green-600">+{totalEarned}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-red-600">-{totalSpent}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Net Balance</p>
                  <p className="text-2xl font-bold text-purple-600">+{totalEarned - totalSpent}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Transactions</option>
                  <option value="earn">Earnings Only</option>
                  <option value="spend">Spending Only</option>
                  <option value="penalty">Penalties Only</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Transaction List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.category, transaction.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{transaction.description}</h3>
                        <div className={`text-lg font-bold ${
                          transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'earn' ? '+' : ''}{transaction.amount}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="capitalize">{transaction.category.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{new Date(transaction.timestamp).toLocaleTimeString()}</span>
                        </div>
                        
                        {/* Metadata badges */}
                        <div className="flex items-center space-x-2">
                          {transaction.metadata?.perfectScore && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                              Perfect Score
                            </span>
                          )}
                          {transaction.metadata?.streak && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                              {transaction.metadata.streak} day streak
                            </span>
                          )}
                          {transaction.metadata?.upvotes && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {transaction.metadata.upvotes} upvotes
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No transactions found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Transactions
