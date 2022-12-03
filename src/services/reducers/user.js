import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  refreshToken,
  getUserInfo,
} from '../actions/user';

const initialState = {
  registerRequest: false,
  registerFailed: false,
  user: {},

  loginRequest: false,
  loginFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  isForgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  isResetPasswordSuccess: false,

  logoutRequest: false,
  logoutFailed: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
  isRefreshTokenSuccess: false,

  getUserInfoRequest: false,
  getUserInfoFailed: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetIsForgotPasswordSuccess: (state) => {
      state.isForgotPasswordSuccess = false;
    },
    resetIsResetPasswordSuccess: (state) => {
      state.isResetPasswordSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerRequest = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload.user;

      const token = payload.accessToken.split('Bearer ')[1];
      window.localStorage.setItem('token', token);

      state.registerFailed = false;
      state.registerRequest = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.registerFailed = true;
      state.registerRequest = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loginRequest = true;
      state.isRefreshTokenSuccess = false;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user;

      const token = payload.accessToken.split('Bearer ')[1];
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('refreshToken', payload.refreshToken);

      state.loginFailed = false;
      state.loginRequest = false;
      state.isRefreshTokenSuccess = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginFailed = true;
      state.loginRequest = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.forgotPasswordRequest = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.forgotPasswordFailed = false;
      state.forgotPasswordRequest = false;
      state.isForgotPasswordSuccess = true;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.forgotPasswordFailed = true;
      state.forgotPasswordRequest = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.resetPasswordRequest = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetPasswordFailed = false;
      state.resetPasswordRequest = false;
      state.isResetPasswordSuccess = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.logoutRequest = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutFailed = false;
      state.logoutRequest = false;
      state.user = {};
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutFailed = true;
      state.logoutRequest = false;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.isRefreshTokenSuccess = false;
      state.refreshTokenRequest = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      const token = payload.accessToken.split('Bearer ')[1];
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('refreshToken', payload.refreshToken);

      state.refreshTokenFailed = false;
      state.refreshTokenRequest = false;
      state.isRefreshTokenSuccess = true;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.refreshTokenFailed = true;
      state.refreshTokenRequest = false;
      state.user = {};
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.getUserInfoRequest = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.user = payload.user;

      state.getUserInfoRequest = false;
      state.getUserInfoFailed = false;
    });
    builder.addCase(getUserInfo.rejected, (state) => {
      state.getUserInfoFailed = true;
      state.getUserInfoRequest = false;
      state.user = {};
    });
  },
});

export const { resetIsForgotPasswordSuccess, resetIsResetPasswordSuccess } = userSlice.actions;

export default userSlice.reducer;
