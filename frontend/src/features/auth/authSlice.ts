import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

interface AuthState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

let item = localStorage.getItem('user');
const user = item ? JSON.parse(item) : null;

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

interface APIRegisterData {
  //_id: user._id,
  name: string;
  email: string;
  token: string;
}

export const register = createAsyncThunk<
  APIRegisterData, // return type of the payload creator
  UserRegisterData, // first argument to the payload creator
  { rejectValue: string }
>('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk<
  APIRegisterData, // return type of the payload creator
  UserLoginData, // first argument to the payload creator
  { rejectValue: string }
>('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error: any) {
    const message: string =
      error?.response?.data.message || error.message || error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
        state.user = null;
      })

      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) state.message = action.payload;
        else if (action.error.message) state.message = action.error.message;
        state.user = null;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
