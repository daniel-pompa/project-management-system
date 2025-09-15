import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { findUserByEmail } from '@/api';
import { TeamMemberForm } from '@/types';
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
      <form className='space-y-5' onSubmit={handleSubmit(handleSearchUser)} noValidate>
        <div className='flex flex-col gap-3 mt-6'>
          <label htmlFor='name' className='font-bold'>
            Correo electrónico del usuario
          </label>
          <input
            id='name'
            type='text'
            placeholder='user@example.com'
            className='form-control'
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
        <input type='submit' value='Buscar usuario' className='btn w-full py-2.5' />
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
