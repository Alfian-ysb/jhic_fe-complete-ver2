import { memo } from 'react';

interface FileInfoProps {
  fileName?: string;
  coverName?: string;
}

/**
 * File Information Component
 * Displays file names in a styled box
 */
const FileInfo = memo(({ fileName, coverName }: FileInfoProps) => {
  // Don't render if no file info
  if (!fileName && !coverName) {
    return null;
  }

  return (
    <>
      <hr className="border-gray-200" />
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Informasi File
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {fileName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">File Karya:</span>
              <span className="text-gray-900 font-medium">{fileName}</span>
            </div>
          )}
          {coverName && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cover:</span>
              <span className="text-gray-900 font-medium">{coverName}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

FileInfo.displayName = "FileInfo";

export default FileInfo;
