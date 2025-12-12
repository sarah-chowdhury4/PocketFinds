/**
 * API Service Layer for PocketFinds
 * Centralized API calls with proper error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to set authorization header
const getHeaders = (includeAuth = true) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('pocketfinds_token') : null;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// Helper for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit & { includeAuth?: boolean } = {}
): Promise<T> {
  const { includeAuth = true, ...fetchOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: getHeaders(includeAuth),
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error(`API request failed with status ${response.status}`);
    }
  }

  return response.json();
}

// === AUTH ENDPOINTS ===
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });
  },

  signup: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
    type?: string;
    role?: string;
    avatar?: string | null;
  }) => {
    return apiCall('/user/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      includeAuth: false,
    });
  },

  getCurrentUser: async () => {
    return apiCall('/user/me', {
      method: 'GET',
    });
  },

  updateProfile: async (data: {
    avatar?: string | null;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }) => {
    return apiCall('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};

// === STALL ENDPOINTS ===
export const stallAPI = {
  // Get all stalls with optional filtering
  getAllStalls: async (search?: string, sortBy?: string) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);

    return apiCall(`/stalls?${params.toString()}`, { includeAuth: false });
  },

  // Get single stall by ID
  getStallById: async (id: string) => {
    return apiCall(`/stalls/${id}`, { includeAuth: false });
  },

  // Get current user's stall (requires auth)
  getMyStall: async () => {
    return apiCall('/stalls/owner/my-stall');
  },

  // Create new stall (stall owner only)
  createStall: async (data: {
    stall_name: string;
    stall_location: string;
    discount?: number;
    offer?: string;
  }) => {
    return apiCall('/stalls', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update stall (stall owner only)
  updateStall: async (id: string, data: Record<string, any>) => {
    return apiCall(`/stalls/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete stall (stall owner only)
  deleteStall: async (id: string) => {
    return apiCall(`/stalls/${id}`, {
      method: 'DELETE',
    });
  },
};

// === MENU/ITEM ENDPOINTS ===
export const menuAPI = {
  // Get menu items for a stall
  getStallMenu: async (stallId: string) => {
    return apiCall(`/menu/${stallId}`, { includeAuth: false });
  },

  // Create menu item (stall owner only)
  createItem: async (data: {
    item_name: string;
    item_price: number;
    item_count: number;
    item_category: string;
    stall_id: string;
  }) => {
    return apiCall('/menu', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update menu item (stall owner only)
  updateItem: async (id: string, data: Record<string, any>) => {
    return apiCall(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete menu item (stall owner only)
  deleteItem: async (id: string) => {
    return apiCall(`/menu/${id}`, {
      method: 'DELETE',
    });
  },
};

// === DASHBOARD ENDPOINTS ===
export const dashboardAPI = {
  // Get admin dashboard
  getAdminDashboard: async () => {
    return apiCall('/dashboard/admin');
  },

  // Get customer dashboard
  getCustomerDashboard: async () => {
    return apiCall('/dashboard/customer');
  },

  // Get stall owner dashboard
  getStallOwnerDashboard: async () => {
    return apiCall('/dashboard/stall-owner');
  },

  // Get stall owner analytics
  getAnalytics: async () => {
    return apiCall('/dashboard/analytics');
  },

  // Toggle favorite stall
  toggleFavorite: async (stallId: string) => {
    return apiCall('/dashboard/customer/favorite', {
      method: 'POST',
      body: JSON.stringify({ stallId }),
    });
  },

  // Get customer's favorite stalls
  getCustomerFavorites: async () => {
    return apiCall('/dashboard/customer/favorites');
  },
};

// === ADMIN ENDPOINTS ===
export const adminAPI = {
  // Get all users with filtering
  getAllUsers: async (role?: string, search?: string) => {
    const params = new URLSearchParams();
    if (role) params.append('role', role);
    if (search) params.append('search', search);

    return apiCall(`/dashboard/users?${params.toString()}`);
  },

  // Suspend/unsuspend user
  suspendUser: async (userId: string, suspended: boolean) => {
    return apiCall(`/dashboard/users/${userId}/suspend`, {
      method: 'PUT',
      body: JSON.stringify({ suspended }),
    });
  },

  // Delete user
  deleteUser: async (userId: string) => {
    return apiCall(`/dashboard/users/${userId}`, {
      method: 'DELETE',
    });
  },
};
