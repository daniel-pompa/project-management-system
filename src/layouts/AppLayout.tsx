import { Outlet } from 'react-router-dom';
import { Logo, NavMenu } from '@/components';

export const AppLayout = () => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <header className='bg-slate-800 py-2'>
        <div className='text-white max-w-screen-2xl mx-auto p-2 flex flex-col md:flex-row justify-between items-center w-full'>
          <div className='flex justify-center md:w-44'>
            <Logo />
          </div>
          <NavMenu />
        </div>
      </header>
      <main className='max-w-screen-2xl mx-auto my-10 px-3 flex-grow w-full'>
        <Outlet />
      </main>
      <footer className='mb-10'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()} - Daniel Pompa Pareja
        </p>
      </footer>
    </div>
  );
};
