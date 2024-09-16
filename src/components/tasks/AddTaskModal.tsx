import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { TaskFormData } from '@/types';
import { TaskForm } from '@/components';

export const AddTaskModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get('new-task');
  const show = modalTask ? true : false;

  const initialValues: TaskFormData = {
    name: '',
    description: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({ defaultValues: initialValues });

  const onSubmit = (formData: TaskFormData) => {
    console.log(formData);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10 '
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
                <DialogPanel className='lg:w-1/3 transform overflow-hidden rounded bg-white text-left align-middle shadow-md transition-all p-5 md:p-10'>
                  <DialogTitle as='h2' className='text-xl md:text-3xl font-bold my-2'>
                    Nueva Tarea
                  </DialogTitle>
                  <p className='md:text-xl text-slate-600'>
                    Completa el formulario para crear una tarea.
                  </p>
                  {/* Task Form */}
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mt-10 space-y-3'
                    noValidate
                  >
                    <TaskForm errors={errors} register={register} />
                    <input
                      type='submit'
                      value='Guardar tarea'
                      className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
                    />
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
