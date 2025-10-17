import type { Karya, Category } from '../types/karya';

export interface karyaData {
  title: string;
  category: string;
  description: string;
  noteForAdmin: string;
  karya: File;
  karyaUrl?: string;
  cover: File;
  coverUrl?: string;
}

// ✅ Use centralized API configuration
const API_BASE_URL = import.meta.env.VITE_LENTERA_KARYA_API_URL || 'http://localhost/api/lentera';

export const BASE_URL = API_BASE_URL; // For backward compatibility

// ✅ Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// ✅ STEP 2.1: Update submitKarya untuk handle file uploads
export const submitKarya = async (
  karyaData: {
    title: string;
    category: string;
    description?: string;
    noteForAdmin?: string;
    karya: File;        // ✅ File object, bukan string
    cover: File;        // ✅ File object, bukan string
  }
): Promise<Karya> => {
  try {
    // ✅ Buat FormData untuk multipart/form-data
    const formData = new FormData();
    
    // ✅ Append text fields
    formData.append('title', karyaData.title);
    formData.append('category', karyaData.category);
    if (karyaData.description) {
      formData.append('description', karyaData.description);
    }
    if (karyaData.noteForAdmin) {
      formData.append('noteForAdmin', karyaData.noteForAdmin);
    }
    
    // ✅ Append file fields (CRITICAL: field names harus sama dengan backend)
    formData.append('karya', karyaData.karya);
    formData.append('cover', karyaData.cover);

    // ✅ Send request
    const response = await fetch(`${API_BASE_URL}/karya`, {
      method: 'POST',
      // ❌ JANGAN set Content-Type! Browser auto-set dengan boundary
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit karya');
    }

    const result = await response.json();
    return result.data; // Backend return { success, message, data }
  } catch (error) {
    console.error('Error submitting karya:', error);
    throw error;
  }
};

// ✅ STEP 2.2: Update getKarya
export const getAllKarya = async (filters?: {
  status?: 'pending' | 'approved' | 'rejected';
  category?: string;
  limit?: number;
  offset?: number;
}): Promise<Karya[]> => {
  try {
    // Build query string
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const queryString = params.toString();
    const url = `${API_BASE_URL}/karya${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch karya');
    }

    const result = await response.json();
    return result.data; // Backend return { success, total, data }
  } catch (error) {
    console.error('Error fetching karya:', error);
    throw error;
  }
};

// ✅ STEP 2.3: Add getKaryaById
export const getKaryaById = async (id: string): Promise<Karya> => {
  try {
    const response = await fetch(`${API_BASE_URL}/karya/${id}`);
    
    if (!response.ok) {
      throw new Error('Karya not found');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching karya by ID:', error);
    throw error;
  }
};

// ✅ STEP 2.4: Add approveKarya (Admin only)
export const approveKarya = async (
  id: string,
  adminId: string,
  note?: string
): Promise<Karya> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/karya/${id}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        approvedBy: adminId,
        note,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to approve karya');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error approving karya:', error);
    throw error;
  }
};

// ✅ STEP 2.5: Add rejectKarya (Admin only)
export const rejectKarya = async (
  id: string,
  adminId: string,
  reason: string
): Promise<Karya> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/karya/${id}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({
        rejectedBy: adminId,
        reason,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to reject karya');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error rejecting karya:', error);
    throw error;
  }
};

// ✅ STEP 2.6: Add deleteKarya (Admin/User can delete own)
export const deleteKarya = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/karya/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete karya');
    }
  } catch (error) {
    console.error('Error deleting karya:', error);
    throw error;
  }
};

// ✅ Helper functions tetap sama
export const getApprovedKarya = async (): Promise<Karya[]> => {
  return getAllKarya({ status: 'approved' });
};

// Alias for compatibility
export const getKaryaApproved = getApprovedKarya;

export const getApprovedKaryaByCategory = async (category: string): Promise<Karya[]> => {
  return getAllKarya({ status: 'approved', category });
};

// ✅ STEP 2.7: Get Categories (returns Category objects, not strings)
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const result = await response.json();
    return result.data; // Backend return { success, data: [{ id: "sastra", label: "Sastra" }, ...] }
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to default categories
    return [
      { id: 'sastra', label: 'Sastra' },
      { id: 'visual', label: 'Visual' },
      { id: 'animasi', label: 'Animasi' }
    ];
  }
};

// ✅ STEP 2.8: Create Category (Admin only)
export const createCategory = async (category: {
  id: string;
  label: string;
}): Promise<Category> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create category');
    }

    const result = await response.json();
    return result.data; // Backend return { success, message, data: Category }
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// ✅ STEP 2.9: Delete Category (Admin only)
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete category');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
