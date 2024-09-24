import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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

  // Watch for the password field value to compare with the confirmation password
  const password = watch('password');

  const onSubmit = (formData: UserRegistrationForm) => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 p-5 md:p-10 bg-white mt-5 rounded'
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label htmlFor='name' className='font-bold'>
            Nombre
          </label>
          <input
            id='name'
            type='name'
            placeholder='Nombre de usuario'
            className='w-full p-2 border-slate-200 border rounded'
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
            className='w-full p-2 border-slate-200 border rounded'
            {...register('confirm_password', {
              required: 'La repetición de la contraseña es obligatoria',
              validate: value => value === password || 'La contraseña no coincide',
            })}
          />
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
        </div>
        <input
          type='submit'
          value='Crear cuenta'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
      <nav className='text-center text-slate-300 mt-10'>
        ¿Ya tienes una cuenta en Daem?{' '}
        <Link to={'/auth/login'} className='text-cyan-500'>
          Inicia sesión
        </Link>
      </nav>
    </>
  );
};
