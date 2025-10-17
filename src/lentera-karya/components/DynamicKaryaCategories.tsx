import { memo, useState, useEffect } from "react";
import DynamicKaryaSection from "./DynamicKaryaSection";
import { BASE_URL } from "../api/karyaServices";

interface Category {
  id: string;
  label: string;
}

interface CategoryWithCount extends Category {
  count: number;
  displayType: "large" | "small";
}

/**
 * Dynamic Karya Categories Component
 * Automatically fetches and displays only categories with approved karya
 * Adapts to new categories added in the database
 */
const DynamicKaryaCategories = memo(() => {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategoriesWithKarya = async () => {
      try {
        setLoading(true);

        // Fetch all categories
        const categoriesResponse = await fetch(`${BASE_URL}/categories`);
        const categoriesResult = await categoriesResponse.json();
        const allCategories: Category[] = categoriesResult.data || categoriesResult; // Handle both formats

        // Fetch all approved karya
        const karyaResponse = await fetch(`${BASE_URL}/karya?status=approved`);
        const karyaResult = await karyaResponse.json();
        const approvedKarya = karyaResult.data || karyaResult; // Handle both formats

        // Count karya per category and filter out empty ones
        const categoriesWithCount: CategoryWithCount[] = allCategories
          .map((category) => {
            const count = approvedKarya.filter(
              (karya: any) => karya.category === category.id
            ).length;
            return {
              ...category,
              count,
              // Alternate between large and small display types
              displayType: (count % 2 === 0 ? "large" : "small") as
                | "large"
                | "small",
            };
          })
          .filter((category) => category.count > 0); // Only include categories with karya

        // Sort by count (most karya first) to prioritize popular categories
        categoriesWithCount.sort((a, b) => b.count - a.count);

        setCategories(categoriesWithCount);
        console.log("📂 Categories with karya:", categoriesWithCount);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithKarya();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Memuat kategori karya...</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Belum ada karya yang tersedia.</p>
      </div>
    );
  }

  return (
    <>
      {categories.map((category) => (
        <DynamicKaryaSection
          key={category.id}
          categoryId={category.id}
          categoryLabel={category.label}
          displayType="card"
        />
      ))}
    </>
  );
});

DynamicKaryaCategories.displayName = "DynamicKaryaCategories";

export default DynamicKaryaCategories;
