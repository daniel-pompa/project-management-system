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
import { updateTask } from '@/api';
import { Task, TaskFormData } from '@/types';
import { TaskForm } from '@/components';

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
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
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
                <DialogTitle as='h2' className='my-2'>
                  Editar tarea
                </DialogTitle>

                <p className='text-slate-600'>
                  Completa el formulario para editar la tarea.
                </p>

                <form
                  className='mt-6 space-y-3'
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <TaskForm errors={errors} register={register} />
                  <input
                    type='submit'
                    className='btn w-full py-2.5'
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
