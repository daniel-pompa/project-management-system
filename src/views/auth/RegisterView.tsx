import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createAccount } from '@/api';
import { UserRegistrationForm } from '@/types';
import { ErrorMessage } from '@/components';

export const RegisterView = () => {
  const initialValues: UserRegistrationForm = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: data => {
      toast.success(data.message);
      reset();
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  // Watch for the password field value to compare with the confirmation password
  const password = watch('password');

  const onSubmit = (formData: UserRegistrationForm) => mutate(formData);

  return (
    <>
      <h2>Crea tu cuenta</h2>
      <div className='text-[var(--border-default)] border w-full mt-2 mb-4'></div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5' noValidate>
        <div className='flex flex-col gap-3'>
          <label htmlFor='name' className='font-bold'>
            Nombre
          </label>
          <input
            id='name'
            type='name'
            placeholder='Nombre de usuario'
            className='form-control'
            {...register('name', {
              required: 'El nombre de usuario es obligatorio',
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
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
              minLength: {
                value: 8,
                message:
                  'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial',
              },
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor='confirm_password' className='font-bold'>
            Repetir contraseña
          </label>
          <input
            id='confirm_password'
            type='password'
            placeholder='Repetir contraseña'
            className='form-control'
            {...register('confirm_password', {
              required: 'La repetición de la contraseña es obligatoria',
              validate: value => value === password || 'La contraseña no coincide',
            })}
          />
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
        </div>
        <input type='submit' value='Crear cuenta' className='btn w-full' />
      </form>
      <nav className='flex flex-col items-center space-y-2 mt-5'>
        <p>
          ¿Ya tienes una cuenta? <Link to={'/auth/login'}>Inicia sesión</Link>
        </p>
      </nav>
    </>
  );
};
