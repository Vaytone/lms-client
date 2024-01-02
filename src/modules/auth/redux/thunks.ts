import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInForm, SignUpForm, ValidateLinkResponse } from '@modules/auth/types/auth.types';
import { axiosPublic } from '@shared/api/api';
import { AUTH_ROUTES } from '@modules/auth/constants/routes';
import { User } from '@type/user.types';
import { getSignUpFormData } from '@modules/auth/helper/register';

const MODULE_NAME = 'auth';

export const login = createAsyncThunk(
  `${MODULE_NAME}/login`,
  async (values: SignInForm, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post<User>(AUTH_ROUTES.login, values);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const validateRegisterLink = createAsyncThunk(
  `${MODULE_NAME}/validateLink`,
  async (code: string, { rejectWithValue }): Promise<ValidateLinkResponse | any> => {
    try {
      const response = await axiosPublic.get<ValidateLinkResponse>(`${AUTH_ROUTES.validateLink}/${code}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const register = createAsyncThunk(
  `${MODULE_NAME}/register`,
  async ({ code, values }: {code: string, values: SignUpForm}, { rejectWithValue }): Promise<ValidateLinkResponse | any> => {
    try {
      const formData = getSignUpFormData(values, code);
      
      const response = await axiosPublic.postForm(AUTH_ROUTES.register, formData);
      
      console.log(response);
      
      // const response = await axiosPublic.post<User>(AUTH_ROUTES.register, { ...values, code });
      // return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const refresh = createAsyncThunk(
  `${MODULE_NAME}/refresh`,
  async (_, { rejectWithValue }): Promise<ValidateLinkResponse | any> => {
    try {
      const response = await axiosPublic.get<User>(AUTH_ROUTES.refresh);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const logout = createAsyncThunk(
  `${MODULE_NAME}/logout`,
  async (_, { rejectWithValue }): Promise<ValidateLinkResponse | any> => {
    try {
      const response = await axiosPublic.get<User>(AUTH_ROUTES.logout);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
