import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { TeamMemberForm } from '@/types';
import { findUserByEmail } from '@/api';
import { ErrorMessage, Spinner, TeamMemberResult } from '@/components';

export const AddTeamMemberForm = () => {
  const initialValues: TeamMemberForm = {
    email: '',
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = {
      projectId,
      formData,
    };
    mutation.mutate(data);
  };

  const resetData = () => {
    reset();
    mutation.reset();
  };

  return (
    <>
      <form
        className='mt-10 space-y-5'
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label htmlFor='name' className='font-bold'>
            Correo electrónico del usuario
          </label>
          <input
            id='name'
            type='text'
            placeholder='user@example.com'
            className='w-full p-2 border border-slate-200 rounded'
            {...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Correo electrónico invalido',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <input
          type='submit'
          value='Buscar usuario'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
      {mutation.isPending && <Spinner />}
      {mutation.error && (
        <p className='text-center mt-5 px-3 py-2 bg-red-100 text-red-800 rounded'>
          {mutation.error.message}
        </p>
      )}
      {mutation.data && <TeamMemberResult user={mutation.data} reset={resetData} />}
    </>
  );
};
