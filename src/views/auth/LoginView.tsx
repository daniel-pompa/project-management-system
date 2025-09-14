import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserLoginCredentials } from '@/types';
import { login } from '@/api';
import { ErrorMessage } from '@/components';

export const LoginView = () => {
  const initialValues: UserLoginCredentials = {
    email: '',
    password: '',
  };

  /** Sets up form handling with React Hook Form */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: UserLoginCredentials) => mutate(formData);

  return (
    <>
      <h2>Accede a tu cuenta</h2>
      <div className='text-[var(--border-default)] border w-full mt-2 mb-4'></div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
        <div className='flex flex-col gap-3 '>
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
        <div className='flex flex-col gap-3'>
          <label htmlFor='password' className='font-bold'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            placeholder='********'
            className='form-control'
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input type='submit' value='Iniciar sesión' className='btn w-full' />
      </form>
      <nav className='flex flex-col items-center space-y-2 mt-5'>
        <p>
          ¿Olvidaste tu contraseña? <Link to={'/auth/reset-password'}>Restablecer</Link>
        </p>
        <p>
          ¿Aún no tienes tu cuenta de Daem?{' '}
          <Link to={'/auth/register'}>Crea tu cuenta</Link>
        </p>
      </nav>
    </>
  );
};
