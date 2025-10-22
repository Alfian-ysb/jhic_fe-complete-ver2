// src/pages/uploadKarya.tsx
import Navbar from "../components/navbar";
import { useUploadForm } from "../components/uploadKarya/uploadServices";
// import ConnectionTest from "../components/uploadKarya/ConnectionTest";
import UploadFormLeft from "../components/uploadKarya/UploadFormLeft";
import UploadFormRight from "../components/uploadKarya/UploadFormRight";

/**
 * Halaman Upload Karya - Main Page Component
 * Menggunakan composition pattern dengan komponen-komponen kecil
 */
export default function UploadForm() {
  // Gunakan custom hook untuk semua logika
  const {
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
    handleTestConnection,
    handleFileChange,
    handleCoverChange,
    handleSubmit,
    setTitle,
    setDesc,
    setCategory,
    setAdminNote,
  } = useUploadForm();

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-24 md:pt-28">
      <Navbar position="fixed" />
      
      <h2 className="text-2xl sm:text-3xl md:text-4xl py-6 md:py-10 w-full text-center font-bold">
        Upload Karya
      </h2>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-5 lg:gap-16 p-0 sm:p-6"
      >
        {/* Left Side - Text Inputs */}
        <UploadFormLeft
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          desc={desc}
          setDesc={setDesc}
          adminNote={adminNote}
          setAdminNote={setAdminNote}
          isUploading={isUploading}
        />

        {/* Right Side - File Uploads & Submit */}
        <UploadFormRight
          file={file}
          cover={cover}
          handleFileChange={handleFileChange}
          handleCoverChange={handleCoverChange}
          error={error}
          status={status}
          isUploading={isUploading}
        />
      </form>
    </div>
  );
}
