// src/pages/uploadKarya.tsx
import Navbar from "../components/navbar";
import { useUploadForm } from "../components/uploadKarya/uploadServices";
import ConnectionTest from "../components/uploadKarya/ConnectionTest";
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
    <div className="w-full px-20 pt-20">
      <Navbar position="fixed" />
      
      <h2 className="text-3xl py-10 w-full text-center font-bold">
        Upload Karya
      </h2>

      {/* Connection Status Section */}
      <ConnectionTest
        connectionStatus={connectionStatus}
        onTest={handleTestConnection}
      />

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 w-full mx-auto grid grid-cols-2 grid-rows-1 gap-16"
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
