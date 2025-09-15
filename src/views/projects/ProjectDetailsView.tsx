import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFullProject } from '@/api';
import { useAuth } from '@/hooks/useAuth';
import { isManager } from '@/utils/policies';
import {
  AddTaskModal,
  EditTaskData,
  Spinner,
  TaskDetailsModal,
  TaskList,
} from '@/components';

export const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });

  // Check if user is project manager and has edit permission
  const hasEditPermission = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return <Spinner />;
  if (isError) return <Navigate to='/404' />;

  if (data && user)
    return (
      <>
        <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
          {/* Project information container */}
          <div className='flex-1'>
            <h1 className='mb-2'>{data.name}</h1>
            <p className='md:text-lg text-balance break-words'>{data.description}</p>
          </div>

          {/* Button container */}
          {isManager(data.manager, user._id) && (
            <nav className='flex md:flex-col lg:flex-row gap-2 shrink-0 md:items-start'>
              <button
                type='button'
                className='btn w-36'
                onClick={() => navigate(`${location.pathname}?new-task=true`)}
              >
                Crear tarea
              </button>
              <Link to={'team'} className='btn md:ml-0 w-36 text-center'>
                Colaboradores
              </Link>
            </nav>
          )}
        </div>
        <TaskList tasks={data.tasks} hasEditPermission={hasEditPermission} />
        <AddTaskModal />
        <EditTaskData />
        <TaskDetailsModal />
      </>
    );
};
