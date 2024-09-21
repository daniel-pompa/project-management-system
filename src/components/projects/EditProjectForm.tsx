import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Project, ProjectFormData } from '@/types';
import { updateProject } from '@/api';
import { ProjectForm } from './ProjectForm';

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project['_id'];
};

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {
  const navigate = useNavigate();

  /** Sets up form handling using React Hook Form with initial values */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.name,
      client: data.client,
      description: data.description,
    },
  });

  const queryClient = useQueryClient();

  /** Handles project update with React Query's useMutation  */
  const { mutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: data => {
      // Invalidate the 'projects' query to refresh the list of projects
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      // Invalidate the specific project query to refresh the edited project's data
      queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
      toast.success(data?.message);
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: ProjectFormData) => {
    const updatedData = { formData, projectId };
    mutate(updatedData);
  };

  return (
    <>
      <div className='max-w-2xl mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1 className='text-xl md:text-3xl font-bold'>Editar proyecto</h1>
            <p className='md:text-xl text-slate-600'>
              Completa el formulario para editar el proyecto
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
          className='mt-10 p-5 md:p-10 bg-white shadow-md rounded'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type='submit'
            value='Guardar cambios'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
          />
        </form>
      </div>
    </>
  );
};
