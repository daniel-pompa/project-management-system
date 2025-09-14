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
      <h2>Restablecer contraseña</h2>
      <div className='text-[var(--border-default)] border w-full mt-2 mb-4'></div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
        <div className='flex flex-col gap-3'>
          <label htmlFor='email' className='font-bold'>
            Correo electrónico
          </label>
          <input
            id='email'
            type='email'
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
        <input type='submit' value='Enviar instrucciones' className='btn w-full' />
      </form>
      <nav className='flex flex-col items-center space-y-2 mt-5'>
        <p>
          ¿Ya tienes una cuenta en Daem? <Link to={'/auth/login'}>Inicia sesión</Link>
        </p>
        <p>
          ¿Aún no tienes tu cuenta de Daem?{' '}
          <Link to={'/auth/register'}>Crea tu cuenta</Link>
        </p>
      </nav>
    </>
  );
};
