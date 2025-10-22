interface UploadFormRightProps {
  file: File | null;
  cover: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  status: string;
  isUploading: boolean;
}

/**
 * Komponen form bagian kanan - File uploads & Submit
 * Berisi: File Karya, File Cover, Error/Success messages, Submit button
 */
export default function UploadFormRight({
  file,
  cover,
  handleFileChange,
  handleCoverChange,
  error,
  status,
  isUploading,
}: UploadFormRightProps) {
  return (
    <div className="w-full h-full flex-1 flex flex-col gap-10">
      {/* File Karya */}
      <div className="flex flex-col gap-2">
        <label htmlFor="file" className="font-semibold">
          File Karya *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:scale-102 hover:shadow-[3px_3px_15px_rgba(0,0,0,0.2)]  hover:border-blue-400 transition-all duration-150 bg-gray-50">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg,.pdf"
          />
          <label 
            htmlFor="file" 
            className="cursor-pointer inline-flex flex-col items-center gap-2"
          >
            <span className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              {file ? "Ganti File" : "Pilih File"}
            </span>
            {file ? (
              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">{file.name}</span> 
                <span className="text-gray-500"> ({(file.size / 1024).toFixed(2)} KB)</span>
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                PNG, JPG, PDF (Max. 50MB)
              </p>
            )}
          </label>
        </div>
      </div>

      {/* File Cover */}
      <div className="flex flex-col gap-2">
        <label htmlFor="cover" className="font-semibold">
          Cover / Thumbnail *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:scale-102 hover:shadow-[3px_3px_15px_rgba(0,0,0,0.2)]  hover:border-blue-400 transition-all duration-150 bg-gray-50">
          <input
            type="file"
            id="cover"
            onChange={handleCoverChange}
            disabled={isUploading}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
          />
          <label 
            htmlFor="cover" 
            className="cursor-pointer inline-flex flex-col items-center gap-2"
          >
            <span className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              {cover ? "Ganti Cover" : "Pilih Cover"}
            </span>
            {cover ? (
              <p className="text-sm text-gray-700 mt-2">
                ✅ <span className="font-semibold">{cover.name}</span> 
                <span className="text-gray-500"> ({(cover.size / 1024).toFixed(2)} KB)</span>
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                PNG, JPEG, JPG (Max. 5MB)
              </p>
            )}
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {status && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {status}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isUploading}
        className="bg-blue-500 text-white p-3 rounded font-semibold hover:scale-101 hover:shadow-[3px_3px_15px_rgba(0,0,0,0.2)] hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-150"
      >
        {isUploading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Mengupload...
          </span>
        ) : (
          "Upload Karya"
        )}
      </button>
    </div>
  );
}
