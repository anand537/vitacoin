// Mock data for development when backend is not available

// Mock users data
const mockUsers = [
  {
    userId: 'user_001',
    username: 'Demo User',
    email: 'demo@university.edu',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    coinBalance: 2850,
    totalBadges: 12,
    level: 8,
    experiencePoints: 3200,
  },
  {
    userId: 'user_002',
    username: 'Jane Smith',
    email: 'jane@university.edu',
    avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
    coinBalance: 4200,
    totalBadges: 15,
    level: 10,
    experiencePoints: 4800,
  },
  {
    userId: 'user_003',
    username: 'John Doe',
    email: 'john@university.edu',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    coinBalance: 3500,
    totalBadges: 8,
    level: 7,
    experiencePoints: 2800,
  }
];

// Mock tasks data
const mockTasks = [
  {
    taskId: 'task_001',
    title: 'Complete Math Quiz',
    description: 'Solve 10 math problems to earn coins',
    coinReward: 100,
    status: 'available',
    deadline: '2024-12-31',
    category: 'quiz'
  },
  {
    taskId: 'task_002',
    title: 'Write Essay',
    description: 'Write a 500-word essay on climate change',
    coinReward: 200,
    status: 'available',
    deadline: '2024-12-25',
    category: 'assignment'
  },
  {
    taskId: 'task_003',
    title: 'Participate in Forum',
    description: 'Engage in class discussion forum',
    coinReward: 50,
    status: 'available',
    deadline: '2024-12-20',
    category: 'forum'
  }
];

// Mock transactions data
const generateMockTransactions = (userId: string) => [
  {
    transactionId: 'tx_001',
    userId,
    type: 'earn',
    amount: 100,
    category: 'quiz',
    description: 'Math Quiz Completion',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    transactionId: 'tx_002',
    userId,
    type: 'earn',
    amount: 200,
    category: 'assignment',
    description: 'Essay Submission',
    timestamp: new Date(Date.now() - 172800000).toISOString()
  },
  {
    transactionId: 'tx_003',
    userId,
    type: 'earn',
    amount: 50,
    category: 'forum',
    description: 'Forum Participation',
    timestamp: new Date(Date.now() - 259200000).toISOString()
  }
];

// Mock API functions
export const mockAuthApi = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    return {
      message: 'Login successful',
      token: 'mock_jwt_token',
      user: mockUsers[0]
    };
  },

  register: async (userData: { username: string; email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      message: 'User registered successfully',
      token: 'mock_jwt_token',
      user: {
        userId: `user_${Date.now()}`,
        ...userData,
        coinBalance: 0,
        totalBadges: 0,
        level: 1,
        experiencePoints: 0
      }
    };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers[0];
  }
};

export const mockUsersApi = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers;
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = mockUsers.find(u => u.userId === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  create: async (userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...userData,
      userId: `user_${Date.now()}`,
      coinBalance: 0,
      totalBadges: 0,
      level: 1,
      experiencePoints: 0
    };
  },

  update: async (id: string, userData: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...userData, userId: id };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { message: 'User deleted' };
  }
};

export const mockTasksApi = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTasks;
  },

  getById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const task = mockTasks.find(t => t.taskId === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  create: async (taskData: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      ...taskData,
      taskId: `task_${Date.now()}`
    };
  },

  update: async (id: string, taskData: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...taskData, taskId: id };
  },

  delete: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { message: 'Task deleted' };
  }
};

export const mockCoinApi = {
  getBalance: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = mockUsers.find(u => u.userId === userId);
    if (!user) throw new Error('User not found');
    return {
      userId: user.userId,
      coinBalance: user.coinBalance,
      username: user.username
    };
  },

  addCoins: async (data: { userId: string; amount: number; description?: string; category?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = mockUsers.find(u => u.userId === data.userId);
    if (!user) throw new Error('User not found');
    
    user.coinBalance += data.amount;
    
    return {
      message: 'Coins added successfully',
      newBalance: user.coinBalance,
      transactionId: `tx_${Date.now()}`
    };
  },

  getTransactions: async (userId: string, page?: number, limit?: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const transactions = generateMockTransactions(userId);
    return {
      transactions,
      totalPages: 1,
      currentPage: page || 1,
      totalTransactions: transactions.length
    };
  }
};

export const mockApi = {
  auth: mockAuthApi,
  users: mockUsersApi,
  tasks: mockTasksApi,
  coin: mockCoinApi
};

export default mockApi;
