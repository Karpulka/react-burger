import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../actions/user';

const initialState = {
  registerRequest: false,
  registerFailed: false,
  user: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
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
  },
});

export default userSlice.reducer;
