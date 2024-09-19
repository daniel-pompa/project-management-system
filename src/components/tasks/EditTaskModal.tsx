import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Task, TaskFormData } from '@/types';
import { TaskForm } from '@/components';
import { updateTask } from '@/api/task-api';

type EditTaskModalProps = {
  data: Task;
  taskId: Task['_id'];
};

export const EditTaskModal = ({ data, taskId }: EditTaskModalProps) => {
  const navigate = useNavigate();

  /** Gets project id from URL */
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    defaultValues: { name: data.name, description: data.description },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success(data.message);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: TaskFormData) => {
    const data = { projectId, taskId, formData };
    mutate(data);
  };

  return (
    <Transition appear show={true} as={Fragment}>
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
              <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded bg-white text-left align-middle shadow-md transition-all p-5 md:p-10'>
                <DialogTitle as='h3' className='text-xl md:text-3xl font-bold my-2'>
                  Editar Tarea
                </DialogTitle>

                <p className='md:text-xl text-slate-600'>
                  Completa el formulario para editar la tarea.
                </p>

                <form
                  className='mt-10 space-y-3'
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <TaskForm errors={errors} register={register} />
                  <input
                    type='submit'
                    className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
                    value='Guardar cambios'
                  />
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
