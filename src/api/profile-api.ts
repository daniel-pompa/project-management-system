import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { ChangePasswordFormType, UserProfileFormData } from '@/types';

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

export const changePassword = async (formData: ChangePasswordFormType) => {
  try {
    const { data } = await api.post('/auth/update-password', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorMessage =
        error.response.data.message ||
        error.response.data.errors?.[0]?.msg ||
        'Error al cambiar la contraseña';
      throw new Error(errorMessage);
    } else {
      throw new Error('Error de red o servidor');
    }
  }
};
