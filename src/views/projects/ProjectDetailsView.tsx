import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  AddTaskModal,
  EditTaskData,
  Spinner,
  TaskDetailsModal,
  TaskList,
} from '@/components';
import { getProjectById } from '@/api';

export const ProjectDetailsView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to='/404' />;
  if (data)
    return (
      <>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1 className='text-2xl md:text-3xl font-bold'>{data.name}</h1>
            <p className='md:text-xl text-slate-600'>{data.description}</p>
          </div>
          <nav className='mt-5 md:mt-0'>
            <button
              type='button'
              className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded transition-colors'
              onClick={() => navigate(`${location.pathname}?new-task=true`)}
            >
              Crear tarea
            </button>
            <Link
              to={'team'}
              className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded transition-colors ml-2 md:ml-0 lg:ml-2 md:mt-2 inline-block'
            >
              Colaboradores
            </Link>
          </nav>
        </div>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskDetailsModal />
      </>
    );
};
