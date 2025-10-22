import CategoryOption from "./categoryOption";

interface UploadFormLeftProps {
  title: string;
  setTitle: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  desc: string;
  setDesc: (value: string) => void;
  adminNote: string;
  setAdminNote: (value: string) => void;
  isUploading: boolean;
}

/**
 * Komponen form bagian kiri - Text inputs
 * Berisi: Judul, Kategori, Deskripsi, Catatan Admin
 */
export default function UploadFormLeft({
  title,
  setTitle,
  category,
  setCategory,
  desc,
  setDesc,
  adminNote,
  setAdminNote,
  isUploading,
}: UploadFormLeftProps) {
  return (
    <div className="w-full flex-1 flex col-start-1 flex-col justify-between gap-4">
      {/* Judul */}
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold">
          Judul *
        </label>
        <input
          type="text"
          id="title"
          placeholder="Judul karya"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {/* Kategori */}
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="font-semibold">
          Kategori *
        </label>
        <CategoryOption
          value={category}
          onChange={setCategory}
          disabled={isUploading}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {/* Deskripsi */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="font-semibold">
          Deskripsi *
        </label>
        <textarea
          id="description"
          placeholder="Deskripsi karya"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          disabled={isUploading}
          rows={4}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>

      {/* Catatan untuk Admin */}
      <div className="flex flex-col gap-2">
        <label htmlFor="adminNote" className="font-semibold">
          Catatan untuk admin
        </label>
        <textarea
          id="adminNote"
          placeholder="Catatan untuk admin"
          value={adminNote}
          onChange={(e) => setAdminNote(e.target.value)}
          disabled={isUploading}
          rows={4}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />
      </div>
    </div>
  );
}
