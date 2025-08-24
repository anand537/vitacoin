import api from './api';
import mockApi from './mockApi';

// Check if backend is available
const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:5000/api/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });
    return response.ok;
  } catch (error) {
    console.log('Backend not available, using mock data');
    return false;
  }
};

// Smart API wrapper that falls back to mock data
const createSmartApi = () => {
  let backendAvailable: boolean | null = null;

  const getApi = async () => {
    if (backendAvailable === null) {
      backendAvailable = await isBackendAvailable();
    }
    return backendAvailable ? api : mockApi;
  };

  return {
    auth: {
      login: async (email: string, password: string) => {
        const currentApi = await getApi();
        return currentApi.auth.login(email, password);
      },
      register: async (userData: { username: string; email: string; password: string }) => {
        const currentApi = await getApi();
        return currentApi.auth.register(userData);
      },
      getProfile: async () => {
        const currentApi = await getApi();
        return currentApi.auth.getProfile();
      },
    },
    users: {
      getAll: async () => {
        const currentApi = await getApi();
        return currentApi.users.getAll();
      },
      getById: async (id: string) => {
        const currentApi = await getApi();
        return currentApi.users.getById(id);
      },
      create: async (userData: any) => {
        const currentApi = await getApi();
        return currentApi.users.create(userData);
      },
      update: async (id: string, userData: any) => {
        const currentApi = await getApi();
        return currentApi.users.update(id, userData);
      },
      delete: async (id: string) => {
        const currentApi = await getApi();
        return currentApi.users.delete(id);
      },
    },
    tasks: {
      getAll: async () => {
        const currentApi = await getApi();
        return currentApi.tasks.getAll();
      },
      getById: async (id: string) => {
        const currentApi = await getApi();
        return currentApi.tasks.getById(id);
      },
      create: async (taskData: any) => {
        const currentApi = await getApi();
        return currentApi.tasks.create(taskData);
      },
      update: async (id: string, taskData: any) => {
        const currentApi = await getApi();
        return currentApi.tasks.update(id, taskData);
      },
      delete: async (id: string) => {
        const currentApi = await getApi();
        return currentApi.tasks.delete(id);
      },
    },
    coin: {
      getBalance: async (userId: string) => {
        const currentApi = await getApi();
        return currentApi.coin.getBalance(userId);
      },
      addCoins: async (data: { userId: string; amount: number; description?: string; category?: string }) => {
        const currentApi = await getApi();
        return currentApi.coin.addCoins(data);
      },
      getTransactions: async (userId: string, page?: number, limit?: number) => {
        const currentApi = await getApi();
        return currentApi.coin.getTransactions(userId, page, limit);
      },
    },
  };
};

export const smartApi = createSmartApi();
export default smartApi;
