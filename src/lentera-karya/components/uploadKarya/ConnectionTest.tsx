interface ConnectionTestProps {
  connectionStatus: string;
  onTest: () => void;
}

/**
 * Komponen untuk menampilkan status koneksi ke backend dan tombol test
 * Dipisahkan dari form utama untuk reusability
 */
export default function ConnectionTest({
  connectionStatus,
  onTest,
}: ConnectionTestProps) {
  return (
    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">Status Koneksi Backend</p>
          {connectionStatus && (
            <p className="text-sm mt-1">{connectionStatus}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onTest}
          className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
        >
          Test Koneksi
        </button>
      </div>
    </div>
  );
}
