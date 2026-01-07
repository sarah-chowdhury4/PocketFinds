// API configuration and helper functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Generic fetch wrapper
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchAPI('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  signup: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    role?: 'customer' | 'stall owner';
  }) => {
    return fetchAPI('/user/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Menu/Items API
export const menuAPI = {
  getMenuByStall: async (stallId: string) => {
    return fetchAPI(`/menu/${stallId}`);
  },

  createItem: async (itemData: {
    item_name: string;
    item_price: number;
    item_count: number;
    item_category: string;
    stall_id: string;
  }) => {
    return fetchAPI('/menu', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  updateItem: async (itemId: string, updates: any) => {
    return fetchAPI(`/menu/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  deleteItem: async (itemId: string) => {
    return fetchAPI(`/menu/${itemId}`, {
      method: 'DELETE',
    });
  },
};

// Stalls API (placeholder for future implementation)
export const stallsAPI = {
  getAll: async () => {
    // TODO: Implement when backend route is available
    return [];
  },

  getById: async (stallId: string) => {
    // TODO: Implement when backend route is available
    return null;
  },
};

export default fetchAPI;
