import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiRequest(`/auth/register`, payload, 'POST');
    if (response.success) {
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    console.log('Fetch register error', e);
    console.error(e);
    return rejectWithValue('Fetch register error');
  }
});

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const response = await apiRequest(`/auth/login`, payload, 'POST');
    if (response.success) {
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    console.log('Fetch login error', e);
    console.error(e);
    return rejectWithValue('Fetch login error');
  }
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/password-reset`, payload, 'POST');
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch forgot password error', e);
      console.error(e);
      return rejectWithValue('Fetch forgot password error');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/password-reset/reset`, payload, 'POST');
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch reset password error', e);
      console.error(e);
      return rejectWithValue('Fetch reset password error');
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (payload, { rejectWithValue }) => {
  try {
    const token = window.localStorage.getItem('refreshToken');
    const response = await apiRequest(`/auth/logout`, { token }, 'POST');
    if (response.success) {
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    console.log('Fetch logout error', e);
    console.error(e);
    return rejectWithValue('Fetch logout error');
  }
});

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (payload, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('refreshToken');
      const response = await apiRequest(`/auth/token`, { token }, 'POST');
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch refreshToken error', e);
      console.error(e);
      return rejectWithValue('Fetch refreshToken error');
    }
  }
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/auth/user`);
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch getUserInfo error', e);
      console.error(e);
      return rejectWithValue('Fetch getUserInfo error');
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiRequest(`/auth/user`, payload, 'PATCH');
      if (response.success) {
        return response;
      } else {
        throw response;
      }
    } catch (e) {
      console.log('Fetch getUserInfo error', e);
      console.error(e);
      return rejectWithValue('Fetch getUserInfo error');
    }
  }
);
