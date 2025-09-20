const API_BASE_URL = 'https://shanture-backend-4s8t.onrender.com/api/analytics';

const fetchWithAuth = async (url, options = {}, retries = 2) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  console.log('API Request:', { url, headers, options }); // Log request details

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { ...options, headers });
      console.log('API Response:', {
        url,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      }); // Log response status

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          throw new Error('Unauthorized: Please log in again');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Data:', { url, data }); // Log response data
      return data;
    } catch (error) {
      console.error(`API Error (Attempt ${attempt}/${retries}):`, { url, error: error.message }); // Log error
      if (attempt === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
    }
  }
};

export const getRevenue = (startDate, endDate) =>
  fetchWithAuth(`${API_BASE_URL}/revenue?startDate=${startDate}&endDate=${endDate}`);

export const getTopProducts = (startDate, endDate) =>
  fetchWithAuth(`${API_BASE_URL}/top-products?startDate=${startDate}&endDate=${endDate}`);

export const getTopCustomers = (startDate, endDate) =>
  fetchWithAuth(`${API_BASE_URL}/top-customers?startDate=${startDate}&endDate=${endDate}`);

export const getRegionSales = (startDate, endDate) =>
  fetchWithAuth(`${API_BASE_URL}/region-sales?startDate=${startDate}&endDate=${endDate}`);

export const getAverageOrderValue = (startDate, endDate) =>
  fetchWithAuth(`${API_BASE_URL}/average-order-value?startDate=${startDate}&endDate=${endDate}`);