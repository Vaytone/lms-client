import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refresh, register, validateRegisterLink } from '@modules/auth/redux/thunks';
import { AuthState } from '../types/auth.types';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isLinkValid: true,
  isLinkLoading: true,
  registration_data: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateRegisterLink.pending, (state) => {
        state.isLinkLoading = true;
      })
      .addCase(validateRegisterLink.rejected, (state) => {
        state.isLinkLoading = false;
        state.isLinkValid = false;
      })
      .addCase(validateRegisterLink.fulfilled, (state, { payload }) => {
        state.isLinkLoading = false;
        state.registration_data = payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
