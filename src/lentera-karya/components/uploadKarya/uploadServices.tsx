import { useState } from "react";
import { submitKarya } from "../../api/karyaServices";
import { testConnection } from "../../api/testConnection";

/**
 * Custom hook untuk mengelola logika upload karya
 * Memisahkan business logic dari presentational component
 */

export function useUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  // ✅ STEP 4: Update file size limits sesuai production
  const MAX_KARYA_SIZE = 50 * 1024 * 1024; // 50MB untuk karya
  const MAX_COVER_SIZE = 5 * 1024 * 1024;  // 5MB untuk cover

  const handleTestConnection = async () => {
    setConnectionStatus("Testing...");
    const result = await testConnection();
    setConnectionStatus(
      result.success ? "✅ " + result.message : "❌ " + result.message
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      // ✅ Validate file size untuk KARYA (50MB)
      if (selectedFile.size > MAX_KARYA_SIZE) {
        setError(
          `File karya terlalu besar. Maksimal ${MAX_KARYA_SIZE / (1024 * 1024)}MB`
        );
        setFile(null);
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      // ✅ Validate file size untuk COVER (5MB)
      if (selectedFile.size > MAX_COVER_SIZE) {
        setError(
          `File cover terlalu besar. Maksimal ${MAX_COVER_SIZE / (1024 * 1024)}MB`
        );
        setCover(null);
        return;
      }
    }
    setError("");
    setCover(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ STEP 4: Validation - pastikan file dan cover ada
    if (!file) {
      setError("Silakan pilih file karya terlebih dahulu");
      return;
    }

    if (!cover) {
      setError("Silakan pilih file cover terlebih dahulu");
      return;
    }

    if (!title.trim()) {
      setError("Judul harus diisi");
      return;
    }

    if (!desc.trim()) {
      setError("Deskripsi harus diisi");
      return;
    }

    if (!category) {
      setError("Pilih kategori");
      return;
    }

    // ✅ Double-check file sizes (client-side validation)
    if (file.size > MAX_KARYA_SIZE) {
      setError(`Ukuran file karya terlalu besar (maksimal ${MAX_KARYA_SIZE / (1024 * 1024)}MB)`);
      return;
    }

    if (cover.size > MAX_COVER_SIZE) {
      setError(`Ukuran file cover terlalu besar (maksimal ${MAX_COVER_SIZE / (1024 * 1024)}MB)`);
      return;
    }

    setIsUploading(true);
    setStatus("Mengupload...");
    setError("");

    try {
      // ✅ Send actual File objects (bukan metadata)
      await submitKarya({
        title,
        description: desc,
        noteForAdmin: adminNote,
        category: category,
        karya: file,   // ✅ File object
        cover: cover,  // ✅ File object
      });

      // ✅ Success handling
      setStatus("✅ Karya berhasil diupload! Menunggu approval dari admin.");

      // ✅ Reset form after successful upload
      setTimeout(() => {
        setFile(null);
        setCover(null);
        setTitle("");
        setDesc("");
        setAdminNote("");
        setCategory("");
        setStatus("");
        
        // Reset file input elements
        const fileInput = document.getElementById("file") as HTMLInputElement;
        const coverInput = document.getElementById("cover") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        if (coverInput) coverInput.value = "";
      }, 3000); // 3 seconds delay
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Gagal upload";
      setError("❌ " + errorMsg);
      setStatus("");
    } finally {
      setIsUploading(false);
    }
  };

  // Return semua state dan handlers yang dibutuhkan oleh komponen
  return {
    // States
    file,
    cover,
    title,
    desc,
    category,
    adminNote,
    status,
    isUploading,
    error,
    connectionStatus,
    
    // Handlers
    handleTestConnection,
    handleFileChange,
    handleCoverChange,
    handleSubmit,
    
    // Setters untuk controlled inputs
    setTitle,
    setDesc,
    setCategory,
    setAdminNote,
  };
}