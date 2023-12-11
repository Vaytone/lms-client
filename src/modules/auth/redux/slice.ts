import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types';

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isLinkValid: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
