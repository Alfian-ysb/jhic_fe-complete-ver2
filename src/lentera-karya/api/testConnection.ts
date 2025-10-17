// Test API connection
export async function testConnection() {
    const BASE_URL = import.meta.env.MODE === 'development' 
        ? '/api'  
        : (import.meta.env.VITE_API_URL);
    
    try {
        // Test json-server root endpoint
        const response = await fetch(`${BASE_URL}/karya`, {
            method: 'GET',
        });
        
        if (response.ok) {
            return { success: true, message: 'Backend terhubung! JSON Server siap di port 8000' };
        } else {
            return { success: false, message: `Server error: ${response.status}` };
        }
    } catch (error) {
        return { 
            success: false, 
            message: `Tidak dapat terhubung ke backend. Pastikan 'npm run server' sudah dijalankan!`,
            detail: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}
