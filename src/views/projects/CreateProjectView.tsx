import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ProjectFormData } from '@/types';
import { ProjectForm } from '@/components';
import { createProject } from '@/api';

export const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    name: '',
    client: '',
    description: '',
  };

  /** Sets up form handling with React Hook Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  /** Manages project creation with React Query */
  const { mutate } = useMutation({
    mutationFn: createProject,
    onSuccess: data => {
      toast.success(data.message);
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: ProjectFormData) => mutate(formData);

  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1 className='text-2xl md:text-3xl font-bold'>Nuevo proyecto</h1>
            <p className='md:text-xl text-slate-600'>
              Completa el formulario para crear un proyecto
            </p>
          </div>
          <nav className='mt-5 md:mt-3'>
            <Link
              to='/'
              className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors'
            >
              Volver
            </Link>
          </nav>
        </div>

        <form
          className='mt-10 p-5 md:p-10 bg-white shadow-md rounded'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type='submit'
            value='Crear proyecto'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
          />
        </form>
      </div>
    </>
  );
};
