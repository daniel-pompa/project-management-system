import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { requestConfirmationCode } from '@/api';
import { RequestConfirmationCodeForm } from '@/types';
import { ErrorMessage } from '@/components';

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
      <h2>Solicitar código de confirmación</h2>
      <p className='mt-4'>
        Ingresa tu correo electrónico para solicitar un nuevo código.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
        <div className='flex flex-col gap-3 mt-6'>
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
        <input type='submit' value='Enviar código' className='btn w-full' />
      </form>
      <nav className='flex flex-col items-center space-y-2 mt-5'>
        <p>
          ¿Ya tienes cuenta? <Link to='/auth/login'>Iniciar sesión</Link>
        </p>
        <p>
          ¿Olvidaste tu contraseña? <Link to='/auth/forgot-password'>Restablecer</Link>
        </p>
      </nav>
    </>
  );
};
