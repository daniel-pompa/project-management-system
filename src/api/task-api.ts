import { isAxiosError } from 'axios';
import api from '@/lib/axios';
import { Project, TaskFormData } from '@/types';

type TaskApi = {
  formData: TaskFormData;
  projectId: Project['_id'];
};

export const createTask = async ({
  formData,
  projectId,
}: Pick<TaskApi, 'formData' | 'projectId'>) => {
  try {
    const url = `http://localhost:4000/api/projects/${projectId}/tasks`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
