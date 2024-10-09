import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { UserProfileFormData } from '@/types';

export const updateProfile = async (formData: UserProfileFormData) => {
  try {
    const { data } = await api.put('/auth/profile', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};
