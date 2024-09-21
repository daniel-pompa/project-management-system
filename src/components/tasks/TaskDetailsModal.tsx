import { Fragment, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { toast } from 'react-toastify';
import { getTaskById } from '@/api/task-api';
import { formatDate } from '@/utils/utils';

export const TaskDetailsModal = () => {
  const [redirect, setRedirect] = useState(false);

  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('view-task')!;

  const show = taskId ? true : false;

  const { data, isError, error } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, // Enable the query only if taskId is truthy
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message, { toastId: 'error' });
      setRedirect(true);
    }
  }, [isError, error]);

  if (redirect) {
    return <Navigate to={`/projects/${projectId}`} replace />;
  }

  if (data)
    return (
      <>
        <Transition appear show={show} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-10'
            onClose={() => navigate(location.pathname, { replace: true })}
          >
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black/60' />
            </TransitionChild>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <TransitionChild
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded bg-white text-left align-middle shadow transition-all p-5 md:p-10'>
                    <p className='text-xs md:text-sm text-slate-500 mb-1'>
                      Creada: {formatDate(data.createdAt)}
                    </p>
                    <p className='text-xs md:text-sm text-slate-500'>
                      Última actualización: {formatDate(data.updatedAt)}
                    </p>
                    <DialogTitle as='h3' className='text-xl md:text-2xl font-bold my-5'>
                      {data.name}
                    </DialogTitle>
                    <p className='text-slate-500 mb-2'>{data.description}</p>
                    <div className='my-5 space-y-3'>
                      <label className='font-bold'>Estado actual</label>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
};
