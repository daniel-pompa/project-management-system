import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { ConfirmToken } from '@/types';
import { confirmAccount } from '@/api';

export const ConfirmAccountView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: data => {
      toast.success(data.message);
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onValueChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const onComplete = (token: ConfirmToken['token']) => mutate({ token });

  return (
    <>
      <h1 className='text-xl md:text-2xl text-slate-300 text-center'>
        Confirma tu Cuenta
      </h1>
      <p className='text-slate-300 text-center mt-5'>
        Ingresa el código que te enviamos a tu correo electronico
      </p>
      <form className='space-y-5 p-5 md:p-10 bg-white mt-10 rounded'>
        <label className='md:text-xl text-center block'>Código de 6 dígitos</label>
        <div className='flex justify-center gap-4'>
          <PinInput value={token} onChange={onValueChange} onComplete={onComplete}>
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
            <PinInputField className='w-10 h-10 rounded-md border border-slate-300 placeholder-white text-center' />
          </PinInput>
        </div>
      </form>

      <nav className='mt-10 flex flex-col space-y-4'>
        <Link to='/auth/request-code' className='text-slate-300 text-center'>
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
};
