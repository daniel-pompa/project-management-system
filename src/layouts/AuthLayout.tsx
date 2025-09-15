import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthLayout = () => {
  return (
    <div className='flex h-screen w-full'>
      {/* Branding */}
      <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-slate-950 to-slate-800 items-center justify-center'>
        <h1 className='text-6xl lg:text-7xl text-white font-sans font-extrabold tracking-tight'>
          Daem Tech Solutions
        </h1>
      </div>

      {/* Forms */}
      <div className='flex w-full lg:w-1/2 items-center justify-center px-4'>
        <div className='bg-white rounded-xl shadow-xl w-full max-w-[500px] p-6 sm:p-8'>
          <Outlet />
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        toastClassName='text-sm'
      />
    </div>
  );
};
