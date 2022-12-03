import { createSlice } from '@reduxjs/toolkit';
import { login, register, forgotPassword, resetPassword } from '../actions/user';

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
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user;

      const token = payload.accessToken.split('Bearer ')[1];
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('refreshToken', payload.refreshToken);

      state.loginFailed = false;
      state.loginRequest = false;
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
    builder.addCase(resetPassword.fulfilled, (state, { payload }) => {
      state.resetPasswordFailed = false;
      state.resetPasswordRequest = false;
      state.isResetPasswordSuccess = true;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.resetPasswordFailed = true;
      state.resetPasswordRequest = false;
    });
  },
});

export const { resetIsForgotPasswordSuccess, resetIsResetPasswordSuccess } = userSlice.actions;

export default userSlice.reducer;
