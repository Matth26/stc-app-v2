import axios from 'axios';
import { UserRegisterData, UserLoginData } from './authSlice';

const API_URL: string = '/api/users';

// Register user
const register = async (userData: UserRegisterData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData: UserLoginData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  login,
  logout,
};

export default authService;
