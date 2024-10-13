import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-4'>
      <h1 className='text-9xl font-extrabold text-red-600'>404</h1>
      <p className='mt-4 text-lg md:text-3xl font-bold text-slate-600'>
        Oops! La página que busca no existe.
      </p>
      <p className='mt-4 text-sm md:text-lg text-slate-600'>
        Esto podría deberse a una de las siguientes razones:
      </p>
      <ul className='mt-2 list-disc list-inside text-sm md:text-lg text-slate-600'>
        <li>La URL puede estar mal escrita.</li>
        <li>La página puede haber sido movida o eliminada.</li>
        <li>La página no está disponible temporalmente.</li>
      </ul>
      <div className='mt-4'>
        <p className='mb-4 text-sm md:text-lg text-slate-600 text-center'>
          Le recomendamos volver a la sección de{' '}
          <Link to='/' className='text-blue-600 font-semibold hover:underline'>
            proyectos
          </Link>
        </p>
        <p className='text-sm md:text-lg text-slate-600'>
          Si necesita más ayuda, póngase en contacto con nuestro equipo de asistencia:{' '}
          <span className='font-semibold text-blue-600'>support@daem.com</span>
        </p>
      </div>
    </div>
  );
};
