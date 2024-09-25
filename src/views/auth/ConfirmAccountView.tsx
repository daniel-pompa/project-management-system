import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { ConfirmToken } from '@/types';

export const ConfirmAccountView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');

  const onValueChange = (token: ConfirmToken['token']) => {
    setToken(token);
  };

  const onComplete = (token: ConfirmToken['token']) => {
    console.log(token);
  };

  return (
    <>
      <h1 className='text-xl md:text-2xl text-white text-center'>Confirma tu Cuenta</h1>
      <p className='text-white text-center mt-5'>
        Ingresa el código que recibiste en tu correo electrónico
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
        <Link to='/auth/new-code' className='text-center text-white'>
          Solicitar un nuevo código
        </Link>
      </nav>
    </>
  );
};
