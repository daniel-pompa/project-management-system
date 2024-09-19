import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskById } from '@/api/task-api';
import { EditTaskModal } from './EditTaskModal';

export const EditTaskData = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('edit-task')!;

  const { data, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, // Enable the query only if taskId is truthy
    retry: false,
  });

  if (isError) return <Navigate to='/404' />;

  if (data) return <EditTaskModal data={data} taskId={taskId} />;
};
