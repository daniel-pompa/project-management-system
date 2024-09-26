import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { RequestConfirmationCodeForm } from '@/types';
import { ErrorMessage } from '@/components';
import { requestConfirmationCode } from '@/api';

export const RequestNewCodeView = () => {
  const initialValues: RequestConfirmationCodeForm = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onSuccess: data => {
      toast.success(data.message);
      reset();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: RequestConfirmationCodeForm) => mutate(formData);

  return (
    <>
      <h1 className='text-xl md:text-2xl text-slate-300 text-center'>
        Solicitar código de confirmación
      </h1>
      <p className='text-slate-300 text-center mt-5'>
        Ingresa tu correo electrónico para solicitar un nuevo código.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 p-5 md:p-10 bg-white mt-10 rounded'
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
            className='w-full p-3 border border-slate-200 rounded'
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
          value='Enviar código'
          className='bg-slate-800 hover:bg-slate-900 text-slate-300 px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
      <nav className='mt-10 flex flex-col items-center gap-2 text-sm md:text-lg text-slate-300'>
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to='/auth/login' className='text-cyan-500'>
            Iniciar sesión
          </Link>
        </p>
        <p>
          ¿Olvidaste tu contraseña?{' '}
          <Link to='/auth/forgot-password' className='text-cyan-500'>
            Restablecer
          </Link>
        </p>
      </nav>
    </>
  );
};
