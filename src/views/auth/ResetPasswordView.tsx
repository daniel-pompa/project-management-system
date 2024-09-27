import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { resetPassword } from '@/api';
import { ResetPasswordForm } from '@/types';
import { ErrorMessage } from '@/components';

export const ResetPasswordView = () => {
  const initialValues: ResetPasswordForm = {
    email: '',
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: data => {
      toast.success(data.message);
      reset();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: ResetPasswordForm) => mutate(formData);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 p-5 md:p-10 bg-white mt-5 rounded'
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label htmlFor='email' className='font-bold'>
            Correo electrónico
          </label>
          <input
            id='email'
            type='email'
            placeholder='user@example.com'
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
          value='Enviar instrucciones'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
      <nav className='flex flex-col items-center space-y-2 text-sm md:text-lg text-slate-300 mt-10'>
        <p>
          ¿Ya tienes una cuenta en Daem?{' '}
          <Link to={'/auth/login'} className='text-cyan-500'>
            Inicia sesión
          </Link>
        </p>
        <p>
          ¿Aún no tienes tu cuenta de Daem?{' '}
          <Link to={'/auth/register'} className='text-cyan-500'>
            Crea tu cuenta
          </Link>
        </p>
      </nav>
    </>
  );
};
