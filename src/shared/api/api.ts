import axios from 'axios';
import { BASE_URI } from '@shared/constants/core';
import { store } from '@src/store';
import { refresh } from '@modules/auth/redux/thunks';

export const axiosPublic = axios.create({
  baseURL: `${BASE_URI}/api`,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: `${BASE_URI}/api`,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const user = store.getState().auth.user;
    if (user) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.data?.message === 'NOT_AUTHORIZED' && !prevRequest?.sent) {
      prevRequest.sent = true;
      await store.dispatch(refresh());
      return axiosPrivate(prevRequest, { withCredentials: true });
    }
    return Promise.reject(error);
  },
);
