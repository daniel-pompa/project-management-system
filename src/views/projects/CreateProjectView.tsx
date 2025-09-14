import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createProject } from '@/api';
import { ProjectFormData } from '@/types';
import { ProjectForm } from '@/components';

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
  const { mutate, isPending } = useMutation({
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
      <div className='max-w-xl mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1>Nuevo proyecto</h1>
            <p className='md:text-xl'>Completa el formulario para crear un proyecto</p>
          </div>
          <nav className='mt-5 md:mt-3'>
            <Link to='/' className='btn'>
              Volver
            </Link>
          </nav>
        </div>

        <form
          className='mt-10 p-5 md:p-10 bg-white shadow-lg rounded-xl'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type='submit'
            value={isPending ? 'Creando proyecto...' : 'Crear proyecto'}
            className='btn w-full disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isPending}
          />
        </form>
      </div>
    </>
  );
};
