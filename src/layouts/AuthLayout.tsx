import { Logo } from '@/components';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const AuthLayout = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen bg-slate-800 py-5'>
        <div className='w-full max-w-xl mx-auto'>
          <div className='flex flex-col items-center'>
            <Logo />
            <p className='text-2xl md:text-3xl text-cyan-500 font-bold mt-5'>
              Daem Gestión de Proyectos
            </p>
          </div>
          <div className='mt-10 px-3 md:px-0'>
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        toastClassName='text-sm'
      />
    </>
  );
};
