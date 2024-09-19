import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, Task, TaskFormData } from '@/types';

type TaskApi = {
  formData: TaskFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
};

export const createTask = async ({
  formData,
  projectId,
}: Pick<TaskApi, 'formData' | 'projectId'>) => {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getTaskById = async ({
  projectId,
  taskId,
}: Pick<TaskApi, 'projectId' | 'taskId'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const updateTask = async ({
  formData,
  projectId,
  taskId,
}: Pick<TaskApi, 'projectId' | 'taskId' | 'formData'>) => {
  try {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
