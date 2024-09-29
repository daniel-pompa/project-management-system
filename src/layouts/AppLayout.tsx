import { Link, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logo, NavMenu, Spinner } from '@/components';
import { useAuth } from '@/hooks/useAuth';

export const AppLayout = () => {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to='/auth/login' />;

  if (data)
    return (
      <div className='flex flex-col min-h-screen w-full'>
        <header className='bg-slate-800 py-2'>
          <div className='text-white max-w-screen-2xl mx-auto p-2 flex flex-col md:flex-row justify-between items-center w-full'>
            <div className='flex justify-center md:me-6'>
              <Link to='/'>
                <Logo />
              </Link>
            </div>
            <NavMenu name={data.name} />
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
        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          toastClassName='text-sm'
        />
      </div>
    );
};
