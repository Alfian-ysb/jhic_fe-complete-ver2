import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "../../../api/karyaServices";
import type { Category } from "../../../types/karya";

/**
 * Category Management Component
 * Allows admin to add, view, and delete categories
 */
export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Form state
  const [newCategoryId, setNewCategoryId] = useState("");
  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat kategori");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    // Validasi
    if (!newCategoryId || !newCategoryLabel) {
      setSubmitMessage({
        type: "error",
        text: "ID dan Label kategori harus diisi!",
      });
      return;
    }

    // Validasi ID format (lowercase, no spaces)
    if (!/^[a-z0-9-]+$/.test(newCategoryId)) {
      setSubmitMessage({
        type: "error",
        text: "ID kategori hanya boleh huruf kecil, angka, dan dash (-)",
      });
      return;
    }

    // Check duplicate
    if (categories.some((cat) => cat.id === newCategoryId)) {
      setSubmitMessage({
        type: "error",
        text: "ID kategori sudah ada!",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createCategory({
        id: newCategoryId,
        label: newCategoryLabel,
      });

      setSubmitMessage({
        type: "success",
        text: "Kategori berhasil ditambahkan!",
      });

      // Reset form
      setNewCategoryId("");
      setNewCategoryLabel("");

      // Refresh list
      await fetchCategories();
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menambahkan kategori",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm(`Yakin ingin menghapus kategori "${id}"?`)) {
      return;
    }

    try {
      await deleteCategory(id);
      setSubmitMessage({
        type: "success",
        text: "Kategori berhasil dihapus!",
      });
      await fetchCategories();
    } catch (err) {
      setSubmitMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menghapus kategori",
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Memuat kategori...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manajemen Kategori</h2>

      {/* Submit Message */}
      {submitMessage && (
        <div
          className={`mb-4 p-4 rounded ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      {/* Add Category Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Tambah Kategori Baru</h3>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium mb-2">
              ID Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="categoryId"
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value.toLowerCase())}
              placeholder="visual, sastra, animasi, dll"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Hanya huruf kecil, angka, dan dash (-). Contoh: visual, sastra-puisi
            </p>
          </div>

          <div>
            <label htmlFor="categoryLabel" className="block text-sm font-medium mb-2">
              Label Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="categoryLabel"
              value={newCategoryLabel}
              onChange={(e) => setNewCategoryLabel(e.target.value)}
              placeholder="Karya Visual, Sastra, Animasi, dll"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Nama yang akan ditampilkan ke user
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Menambahkan..." : "Tambah Kategori"}
          </button>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold">Daftar Kategori</h3>
          <p className="text-sm text-gray-600 mt-1">
            Total: {categories.length} kategori
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Label
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {category.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Belum ada kategori. Tambahkan kategori pertama Anda!
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">📝 Catatan:</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>ID kategori akan digunakan dalam URL dan database</li>
          <li>Label kategori akan ditampilkan ke user di dropdown</li>
          <li>Kategori yang sudah digunakan pada karya tidak bisa dihapus</li>
          <li>Perubahan kategori akan langsung terlihat di form upload</li>
        </ul>
      </div>
    </div>
  );
}
