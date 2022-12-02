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
    console.log('Fetch ingredients error', e);
    console.error(e);
    return rejectWithValue('Fetch ingredients error');
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
    console.log('Fetch ingredients error', e);
    console.error(e);
    return rejectWithValue('Fetch ingredients error');
  }
});
