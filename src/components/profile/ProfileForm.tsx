import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateProfile } from '@/api';
import { User, UserProfileFormData } from '@/types';
import { ErrorMessage } from '../ErrorMessage';

type ProfileFormProps = {
  data: User;
};

export const ProfileForm = ({ data }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormData>({ defaultValues: data });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: UserProfileFormData) => mutate(formData);

  return (
    <>
      <div className='mx-auto max-w-2xl'>
        <div className='space-y-2'>
          <h1 className='text-2xl md:text-3xl font-bold'>Mi perfil</h1>
          <p className='md:text-xl text-slate-600'>
            Actualiza tu información completando el siguiente formulario.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-10 space-y-5 bg-white shadow-md p-5 md:p-10 rounded'
          noValidate
        >
          <div className='mb-5 space-y-3'>
            <label htmlFor='name' className='font-bold'>
              Nombre
            </label>
            <input
              id='name'
              type='text'
              placeholder='Tu nombre'
              className='w-full p-2 border-slate-200 border rounded'
              {...register('name', {
                required: 'Nombre de usuario es obligatoro',
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className='mb-5 space-y-3'>
            <label htmlFor='password' className='font-bold'>
              Correo electrónico
            </label>
            <input
              id='text'
              type='email'
              placeholder='Tu correo electrónico'
              className='w-full p-2 border-slate-200 border rounded'
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
            value='Guardar cambios'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
          />
        </form>
      </div>
    </>
  );
};
