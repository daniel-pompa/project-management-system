import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
  ConfirmToken,
  RequestConfirmationCodeForm,
  UserLoginCredentials,
  UserRegistrationForm,
} from '@/types';

export const createAccount = async (formData: UserRegistrationForm) => {
  try {
    const url = '/auth/create-account';
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const confirmAccount = async (formData: ConfirmToken) => {
  try {
    const url = `/auth/confirm-account`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const requestConfirmationCode = async (formData: RequestConfirmationCodeForm) => {
  try {
    const url = `/auth/request-code`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const login = async (formData: UserLoginCredentials) => {
  try {
    const url = '/auth/login';
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};
