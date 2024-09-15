import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ProjectFormData } from '@/types';
import { ProjectForm } from '@/components/projects';
import { createProject } from '@/api';

export const NewProjectView = () => {
  const initialValues: ProjectFormData = {
    name: '',
    client: '',
    description: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = (data: ProjectFormData) => {
    createProject(data);
  };

  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1 className='text-xl md:text-3xl font-bold'>Nuevo proyecto</h1>
            <p className='md:text-xl text-slate-600'>
              Completa el formulario para crear un proyecto
            </p>
          </div>
          <nav className='my-5'>
            <Link
              to='/'
              className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors'
            >
              Volver
            </Link>
          </nav>
        </div>

        <form
          className='mt-10 p-10 bg-white shadow-md rounded'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type='submit'
            value='Crear proyecto'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer'
          />
        </form>
      </div>
    </>
  );
};
