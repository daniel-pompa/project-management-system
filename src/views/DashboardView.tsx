import { Link } from 'react-router-dom';

export const DashboardView = () => {
  return (
    <div className='flex flex-col md:flex-row md:justify-between'>
      <div className='space-y-2'>
        <h1 className='text-xl md:text-3xl font-bold'>Proyectos</h1>
        <p className='md:text-xl text-slate-600'>Gestiona y administra tus proyectos</p>
      </div>
      <nav className='mt-5 md:mt-3'>
        <Link
          to='/projects/create'
          className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors'
        >
          Nuevo proyecto
        </Link>
      </nav>
    </div>
  );
};
