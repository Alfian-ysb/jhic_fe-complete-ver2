// Shared types untuk karya
export interface KaryaCard {
    id: string | number;
    image: string;
    title: string;
    description: string;
    category?: string;
    status?: string;
}

export interface Category {
  id: string;    // slug, unik
  label: string; // yang ditampilkan
}

export interface SmallCardSliderProps {
    cards: KaryaCard[];
    title: string;
    categoryLink?: string;
}

// Dashboard Karya interface
export interface Karya {
  id: string;
  title: string;
  category: string;
  description?: string;
  noteForAdmin?: string;
  
  // ✅ OLD fields (metadata only)
  fileName: string;
  fileSize: number;
  coverName: string;
  coverSize: number;
  
  // ✅ NEW fields (actual file URLs from backend)
  fileUrl: string;      // Backend returns this
  coverUrl: string;     // Backend returns this
  
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: string;
  approvedAt?: string;  // ✅ NEW
  rejectedAt?: string;  // ✅ NEW
  
  approvedBy?: string;  // ✅ NEW (admin ID)
  rejectedBy?: string;  // ✅ NEW (admin ID)
  rejectionReason?: string; // ✅ NEW
}
