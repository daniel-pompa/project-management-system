import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { dashboardProjectsSchema, ProjectFormData } from '@/types';

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getProjects = async () => {
  try {
    const { data } = await api.get('/projects');
    const response = dashboardProjectsSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
