import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { resetPasswordWithToken } from '@/api';
import { ConfirmToken, NewPasswordFormType } from '@/types';
import { ErrorMessage } from '@/components';

type NewPasswordFormProps = {
  token: ConfirmToken['token'];
};

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const navigate = useNavigate();
  const initialValues: NewPasswordFormType = {
    password: '',
    confirm_password: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: resetPasswordWithToken,
    onSuccess: data => {
      toast.success(data.message);
      reset();
      navigate('/auth/login');
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const handleNewPassword = (formData: NewPasswordFormType) => {
    const data = {
      formData,
      token,
    };
    mutate(data);
  };

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className='space-y-5 p-5 md:p-10 bg-white mt-5 rounded'
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label htmlFor='password' className='font-bold'>
            Password
          </label>
          <input
            type='password'
            placeholder='Nueva contraseña'
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
        <div className='flex flex-col gap-5'>
          <label htmlFor='confirm_password' className='font-bold'>
            Repetir Password
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
          value='Cambiar contraseña'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
        />
      </form>
    </>
  );
};
