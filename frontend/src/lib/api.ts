const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    // Error handling will be implemented in components
    throw error;
  }
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (userData: { username: string; email: string; password: string }) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getProfile: () =>
    apiRequest('/auth/profile', {
      method: 'GET',
    }),
};

// Users API
export const usersApi = {
  getAll: () => apiRequest('/users'),
  getById: (id: string) => apiRequest(`/users/${id}`),
  create: (userData: any) =>
    apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  update: (id: string, userData: any) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
  delete: (id: string) =>
    apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),
};

// Tasks API
export const tasksApi = {
  getAll: () => apiRequest('/tasks'),
  getById: (id: string) => apiRequest(`/tasks/${id}`),
  create: (taskData: any) =>
    apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    }),
  update: (id: string, taskData: any) =>
    apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    }),
  delete: (id: string) =>
    apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    }),
};

// UserTasks API
export const userTasksApi = {
  getAll: () => apiRequest('/userTasks'),
  getByUserAndTask: (userId: string, taskId: string) =>
    apiRequest(`/userTasks/${userId}/${taskId}`),
  create: (userTaskData: any) =>
    apiRequest('/userTasks', {
      method: 'POST',
      body: JSON.stringify(userTaskData),
    }),
  update: (userId: string, taskId: string, userTaskData: any) =>
    apiRequest(`/userTasks/${userId}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(userTaskData),
    }),
  delete: (userId: string, taskId: string) =>
    apiRequest(`/userTasks/${userId}/${taskId}`, {
      method: 'DELETE',
    }),
};

// Transactions API
export const transactionsApi = {
  getAll: () => apiRequest('/transactions'),
  getById: (id: string) => apiRequest(`/transactions/${id}`),
  create: (transactionData: any) =>
    apiRequest('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    }),
  update: (id: string, transactionData: any) =>
    apiRequest(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transactionData),
    }),
  delete: (id: string) =>
    apiRequest(`/transactions/${id}`, {
      method: 'DELETE',
    }),
};

// Coin API
export const coinApi = {
  getBalance: (userId: string) => apiRequest(`/coin/balance/${userId}`),
  addCoins: (data: { userId: string; amount: number; description?: string; category?: string }) =>
    apiRequest('/coin/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  deductCoins: (data: { userId: string; amount: number; description?: string; category?: string }) =>
    apiRequest('/coin/deduct', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getTransactions: (userId: string, page?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (limit) params.append('limit', limit.toString());
    
    return apiRequest(`/coin/transactions/${userId}?${params.toString()}`);
  },
  transferCoins: (data: { fromUserId: string; toUserId: string; amount: number; description?: string }) =>
    apiRequest('/coin/transfer', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default {
  auth: authApi,
  users: usersApi,
  tasks: tasksApi,
  userTasks: userTasksApi,
  transactions: transactionsApi,
  coin: coinApi,
};
