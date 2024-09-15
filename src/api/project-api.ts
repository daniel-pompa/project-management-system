import api from '@/lib/axios';
import { ProjectFormData } from '@/types';

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    console.error(error);
  }
};
