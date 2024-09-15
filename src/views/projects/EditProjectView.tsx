import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { EditProjectForm, Spinner } from '@/components';
import { getProjectById } from '@/api';

export const EditProjectView = () => {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to='/404-not-found' />;
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
};
