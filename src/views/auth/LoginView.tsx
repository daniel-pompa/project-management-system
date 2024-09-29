import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { UserLoginCredentials } from '@/types';
import { login } from '@/api';
import { ErrorMessage } from '@/components';
import { toast } from 'react-toastify';

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 p-5 md:p-10 bg-white rounded'
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
        <div className='flex flex-col gap-3'>
          <label htmlFor='password' className='font-bold'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            placeholder='********'
            className='w-full p-2 border-slate-200 border rounded'
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <input
          type='submit'
          value='Iniciar sesión'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
      <nav className='flex flex-col items-center space-y-2 text-sm md:text-lg text-slate-300 mt-10'>
        <p>
          ¿Olvidaste tu contraseña?{' '}
          <Link to={'/auth/reset-password'} className='text-cyan-500'>
            Restablecer
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
