import axios from 'axios';

// Định nghĩa base URL cho API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/users';

// Tạo axios instance để dùng chung
const api = axios.create({
  baseURL: API_URL
});

// Interceptor để tự động thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('ielts_auth'))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Đăng ký người dùng mới
export const register = async (username, email, password) => {
  try {
    const response = await api.post('/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Đăng ký thất bại';
  }
};

// Đăng nhập
export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    if (response.data) {
      localStorage.setItem('ielts_auth', JSON.stringify({
        username: response.data.username,
        token: response.data.token,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Đăng nhập thất bại';
  }
};

// Đăng xuất
export const logout = () => {
  localStorage.removeItem('ielts_auth');
};

// Lấy thông tin người dùng
export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Không thể lấy thông tin người dùng';
  }
};

// Kiểm tra trạng thái đăng nhập
export const isAuthenticated = () => {
  const auth = JSON.parse(localStorage.getItem('ielts_auth'));
  if (!auth) return false;
  
  // Kiểm tra nếu đã quá 24 giờ
  const loginTime = new Date(auth.loginTime);
  const now = new Date();
  const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);
  
  return auth.isLoggedIn && hoursSinceLogin < 24;
};