import { Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/api';
import { DeleteProjectModal, Spinner } from '@/components';
import { useAuth } from '../hooks/useAuth';
import { isManager } from '@/utils/policies';

export const DashboardView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: user, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  if (isLoading && authLoading) return <Spinner />;

  if (data && user)
    return (
      <>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1>Proyectos</h1>
            <p className='md:text-lg'>Gestiona y administra tus proyectos.</p>
          </div>
          <nav className='mt-5 md:mt-3'>
            <Link to='/projects/create' className='btn inline-block'>
              Nuevo proyecto
            </Link>
          </nav>
        </div>
        {/* Project list */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {data.length ? (
            data.map(project => (
              <div
                key={project._id}
                className='flex justify-between items-center bg-white p-4 rounded shadow-md relative'
              >
                <div className='space-y-2 w-full h-full'>
                  {/* Project info */}
                  <div className='mb-2'>
                    {/* Verify if user is project manager */}
                    {isManager(project.manager, user._id) ? (
                      <p className='bg-indigo-50 text-indigo-500 border border-indigo-200 px-6 py-1 rounded text-sm font-bold inline-block'>
                        Manager
                      </p>
                    ) : (
                      <p className='bg-teal-50 text-teal-500 border border-teal-200 px-6 py-1 rounded text-sm font-bold inline-block'>
                        Colaborador
                      </p>
                    )}
                  </div>
                  <Link
                    to={`/projects/${project._id}`}
                    className='text-xl text-[var(--color-primary)] font-bold'
                  >
                    {project.name}
                  </Link>
                  <p className='text-slate-500 font-bold'>Cliente: {project.client}</p>
                  <p className='text-slate-500'>{project.description}</p>
                </div>
                {/* Menu buttons container */}
                <Menu as='div' className='absolute top-4 right-4'>
                  <MenuButton>
                    <BiDotsVerticalRounded className='h-6 w-6' />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <MenuItems className='absolute top-4 right-0 z-10 mt-2 w-56 rounded bg-white py-2 shadow-md ring-2 ring-slate-900/5'>
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}`}
                          className='block px-3 py-1 text-sm text-[var(--color-text-primary)]'
                        >
                          Ver proyecto
                        </Link>
                      </MenuItem>
                      {/* Verify if user is project manager */}
                      {isManager(project.manager, user._id) && (
                        <>
                          <MenuItem>
                            <Link
                              to={`/projects/${project._id}/edit`}
                              className='block px-3 py-1 text-sm text-[var(--color-text-primary)]'
                            >
                              Editar proyecto
                            </Link>
                          </MenuItem>
                          <MenuItem>
                            <button
                              type='button'
                              className='block px-3 py-1 text-sm text-red-600'
                              onClick={() =>
                                navigate(
                                  `${location.pathname}?delete-project=${project._id}`
                                )
                              }
                            >
                              Eliminar proyecto
                            </button>
                          </MenuItem>
                        </>
                      )}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            ))
          ) : (
            <p>
              Actualmente no hay proyectos.{' '}
              <Link to='/projects/create' className='font-semibold hover:underline'>
                Haz clic aquí para crear uno.
              </Link>
            </p>
          )}
        </div>
        <DeleteProjectModal />
      </>
    );
};
