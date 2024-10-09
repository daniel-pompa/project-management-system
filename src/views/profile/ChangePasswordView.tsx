import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ChangePasswordFormType } from '@/types';
import { changePassword } from '@/api';
import { ErrorMessage } from '@/components';

export const ChangePasswordView = () => {
  const initialValues: ChangePasswordFormType = {
    current_password: '',
    password: '',
    confirm_password: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: data => {
      toast.success(data.message);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const password = watch('password');

  const onSubmit = (formData: ChangePasswordFormType) => mutate(formData);

  return (
    <>
      <div className='mx-auto max-w-2xl'>
        <div className='space-y-2'>
          <h1 className='text-2xl md:text-3xl font-bold'>Cambiar contraseña</h1>
          <p className='md:text-xl text-slate-600'>
            Completa el siguiente formulario para cambiar tu contraseña.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-10 space-y-5 bg-white shadow-md p-5 md:p-10 rounded'
          noValidate
        >
          <div className='mb-5 space-y-3'>
            <label htmlFor='current_password' className='font-bold'>
              Contraseña actual
            </label>
            <input
              id='current_password'
              type='password'
              placeholder='********'
              className='w-full p-2 border-slate-200 border rounded'
              {...register('current_password', {
                required: 'La contraseña actual es obligatoria',
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>
          <div className='mb-5 space-y-3'>
            <label htmlFor='password' className='font-bold'>
              Nueva contraseña
            </label>
            <input
              id='password'
              type='password'
              placeholder='********'
              className='w-full p-2 border-slate-200 border rounded'
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message:
                    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
                },
              })}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
          <div className='mb-5 space-y-3'>
            <label htmlFor='confirm_password' className='font-bold'>
              Repetir contraseña
            </label>
            <input
              id='confirm_password'
              type='password'
              placeholder='********'
              className='w-full p-3  border border-gray-200'
              {...register('confirm_password', {
                required: 'Este campo es obligatorio',
                validate: value => value === password || 'Las contraseñas no coinciden',
              })}
            />
            {errors.confirm_password && (
              <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
            )}
          </div>
          <input
            type='submit'
            value='Cambiar contraseña'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
          />
        </form>
      </div>
    </>
  );
};
