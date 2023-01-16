import { apiRequest } from '../../utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IProfile,
  IUserActionsFields,
  ILoginResponse,
  IGetUserResponse,
  IMessageResponse,
  IRefreshTokenResponse,
} from '../../utils/types';

export const register = createAsyncThunk<ILoginResponse, IProfile>(
  'user/register',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/auth/register`, payload, 'POST')) as ILoginResponse;
    } catch (e) {
      console.log('Fetch register error', e);
      console.error(e);
      return rejectWithValue('Fetch register error');
    }
  }
);

export const login = createAsyncThunk<ILoginResponse, IUserActionsFields>(
  'user/login',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/auth/login`, payload, 'POST')) as ILoginResponse;
    } catch (e) {
      console.log('Fetch login error', e);
      console.error(e);
      return rejectWithValue('Fetch login error');
    }
  }
);

export const forgotPassword = createAsyncThunk<IMessageResponse, IUserActionsFields>(
  'user/forgotPassword',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/password-reset`, payload, 'POST')) as IMessageResponse;
    } catch (e) {
      console.log('Fetch forgot password error', e);
      console.error(e);
      return rejectWithValue('Fetch forgot password error');
    }
  }
);

export const resetPassword = createAsyncThunk<IMessageResponse, IUserActionsFields>(
  'user/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/password-reset/reset`, payload, 'POST')) as IMessageResponse;
    } catch (e) {
      console.log('Fetch reset password error', e);
      console.error(e);
      return rejectWithValue('Fetch reset password error');
    }
  }
);

export const logout = createAsyncThunk<IMessageResponse, undefined>(
  'user/logout',
  async (payload, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('refreshToken');
      return (await apiRequest(`/auth/logout`, { token }, 'POST')) as IMessageResponse;
    } catch (e) {
      console.log('Fetch logout error', e);
      console.error(e);
      return rejectWithValue('Fetch logout error');
    }
  }
);

export const refreshToken = createAsyncThunk<IRefreshTokenResponse, undefined>(
  'user/refreshToken',
  async (payload, { rejectWithValue }) => {
    try {
      const token = window.localStorage.getItem('refreshToken');
      return (await apiRequest(`/auth/token`, { token }, 'POST')) as IRefreshTokenResponse;
    } catch (e) {
      console.log('Fetch refreshToken error', e);
      console.error(e);
      return rejectWithValue('Fetch refreshToken error');
    }
  }
);

export const getUserInfo = createAsyncThunk<IGetUserResponse, undefined>(
  'user/getUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/auth/user`)) as IGetUserResponse;
    } catch (e) {
      console.log('Fetch getUserInfo error', e);
      console.error(e);
      return rejectWithValue('Fetch getUserInfo error');
    }
  }
);

export const updateUserInfo = createAsyncThunk<IGetUserResponse, { [key: string]: string }>(
  'user/updateUserInfo',
  async (payload, { rejectWithValue }) => {
    try {
      return (await apiRequest(`/auth/user`, payload, 'PATCH')) as IGetUserResponse;
    } catch (e) {
      console.log('Fetch getUserInfo error', e);
      console.error(e);
      return rejectWithValue('Fetch getUserInfo error');
    }
  }
);
