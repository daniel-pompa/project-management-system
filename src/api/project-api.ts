import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
  dashboardProjectsSchema,
  editProjectSchema,
  Project,
  ProjectFormData,
  projectSchema,
} from '@/types';

export const createProject = async (formData: ProjectFormData) => {
  try {
    const { data } = await api.post('/projects', formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
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
      throw new Error(error.response?.data?.message);
    }
  }
};

export const getProjectById = async (id: Project['_id']) => {
  try {
    const { data } = await api.get(`/projects/${id}`);
    const response = editProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const getFullProject = async (id: Project['_id']) => {
  try {
    const { data } = await api.get(`/projects/${id}`);
    const response = projectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

type ProjectApiType = {
  formData: ProjectFormData;
  projectId: Project['_id'];
};

export const updateProject = async ({ formData, projectId }: ProjectApiType) => {
  try {
    const { data } = await api.put(`/projects/${projectId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export const deleteProject = async (id: Project['_id']) => {
  try {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data?.message);
    }
  }
};
