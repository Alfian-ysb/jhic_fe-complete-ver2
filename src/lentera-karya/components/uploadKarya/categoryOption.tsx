import { useEffect, useState } from "react";
import { getCategories } from "../../api/karyaServices";
import type { Category } from "../../types/karya";

interface CategoryOptionProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Komponen untuk menampilkan dropdown kategori yang diambil dari database
 * Memisahkan logic fetching kategori dari form utama
 */
export default function CategoryOption({
  value,
  onChange,
  disabled = false,
  className = "",
}: CategoryOptionProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      const errorMsg =
        err instanceof Error ? err.message : "Gagal memuat kategori";
      setError(errorMsg);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <select
        disabled
        className={`border p-2 rounded bg-gray-100 ${className}`}
      >
        <option>Memuat kategori...</option>
      </select>
    );
  }

  if (error) {
    return (
      <select
        disabled
        className={`border p-2 rounded border-red-400 ${className}`}
      >
        <option>❌ {error}</option>
      </select>
    );
  }

  return (
    <select
      name="category"
      id="category"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={className}
    >
      <option value=""> - </option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.label}
        </option>
      ))}
    </select>
  );
}
