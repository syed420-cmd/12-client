import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Function to set the Authorization header
const setAuthorizationHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Set initial token from local storage
const token = localStorage.getItem('token');
if (token) {
  setAuthorizationHeader(token);
}

export { api, setAuthorizationHeader };

export default api;
