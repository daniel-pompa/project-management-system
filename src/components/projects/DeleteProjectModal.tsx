import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckUserPasswordFormType } from '@/types';
import { ErrorMessage } from '@/components';
import { checkUserPassword, deleteProject } from '@/api';
import { toast } from 'react-toastify';

export const DeleteProjectModal = () => {
  const initialValues: CheckUserPasswordFormType = {
    password: '',
  };

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('delete-project')!;
  const show = deleteProjectId ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  /** Mutations for deleting projects */
  const checkUserPasswordMutation = useMutation({
    mutationFn: checkUserPassword,
    onError: error => {
      toast.error(error.message);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate(location.pathname, { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (formData: CheckUserPasswordFormType) => {
    await checkUserPasswordMutation.mutateAsync(formData);
    await deleteProjectMutation.mutateAsync(deleteProjectId);
  };

  return (
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
              <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded bg-white text-left align-middle shadow-md transition-all p-5 md:p-10'>
                <DialogTitle as='h2' className='text-2xl md:text-3xl font-bold my-2'>
                  Eliminar proyecto
                </DialogTitle>
                <p className='md:text-xl text-slate-600'>
                  Para confirmar la eliminación del proyecto, introduce tu contraseña.
                </p>
                <form
                  className='mt-10 space-y-3'
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className='flex flex-col gap-3'>
                    <label htmlFor='password' className='font-bold'>
                      Contraseña
                    </label>
                    <input
                      id='password'
                      type='password'
                      placeholder='Contraseña del usuario'
                      className='w-full p-2 mb-2 border border-slate-200 rounded'
                      {...register('password', {
                        required: 'La contraseña es obligatoria',
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>
                  <input
                    type='submit'
                    value='Eliminar proyecto'
                    className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
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
