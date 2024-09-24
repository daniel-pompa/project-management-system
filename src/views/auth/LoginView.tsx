import { useForm } from 'react-hook-form';
import { UserLoginCredentials } from '@/types';
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

  const onSubmit = (formData: UserLoginCredentials) => {};

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5 p-5 md:p-10 bg-white rounded'
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label className='md:text-xl'>Correo electrónico</label>
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
          <label className='md:text-xl'>Contraseña</label>
          <input
            type='password'
            placeholder='********'
            className='w-full p-2 border-slate-200 border rounded mb-4'
            {...register('password', {
              required: 'El Password es obligatorio',
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
      <p className='text-center text-white mt-10'>
        ¿Aún no tienes tu cuenta de Daem? Crea tu cuenta
      </p>
    </>
  );
};
