import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateProject } from '@/api';
import { Project, ProjectFormData } from '@/types';
import { ProjectForm } from './ProjectForm';

type EditProjectFormProps = {
  data: ProjectFormData;
  projectId: Project['_id'];
};

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps) => {
  const navigate = useNavigate();

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

  const { mutate, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
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
      <div className='max-w-xl mx-auto'>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1>Editar proyecto</h1>
            <p className='md:text-lg'>Completa el formulario para editar el proyecto</p>
          </div>
          <nav className='mt-5 md:mt-2'>
            <Link to='/' className='btn inline-block'>
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

          {/* Botón deshabilitado durante la carga */}
          <input
            type='submit'
            value={isPending ? 'Guardando...' : 'Guardar cambios'}
            className='btn w-full disabled:opacity-50 disabled:cursor-not-allowed py-2.5'
            disabled={isPending}
          />
        </form>
      </div>
    </>
  );
};
