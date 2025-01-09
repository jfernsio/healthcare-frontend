// export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
//   try {
//     const response = await fetch(`${API_URL}${endpoint}`, {
//       ...options,
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });

//     // If unauthorized, redirect to login
//     if (response.status === 401) {
//       window.location.href = '/login';
//       throw new Error('Please login to continue');
//     }

//     if (!response.ok) {
//       const errorData = await response.json().catch(() => null);
//       throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// };
