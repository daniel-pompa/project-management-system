import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteProject, getProjects } from '@/api';
import { Spinner } from '@/components';
import { toast } from 'react-toastify';

export const DashboardView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <Spinner />;

  if (data)
    return (
      <>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1 className='text-xl md:text-3xl font-bold'>Proyectos</h1>
            <p className='md:text-xl text-slate-600'>
              Gestiona y administra tus proyectos
            </p>
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
        {/* Project list */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {data.length ? (
            data.map(project => (
              <div
                key={project._id}
                className='flex justify-between items-center bg-white p-4 rounded shadow-md '
              >
                <div className='space-y-2 w-full h-full'>
                  <Link to={`/projects/${project._id}`} className='text-xl font-bold'>
                    {project.name}
                  </Link>
                  <p className='text-slate-500 font-bold'>Cliente: {project.client}</p>
                  <p className='text-slate-500'>{project.description}</p>
                </div>
                {/* Menu buttons container */}
                <Menu as='div' className='relative'>
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
                    <MenuItems className='absolute top-4 right-0 z-10 mt-2 w-56 rounded bg-white py-2 shadow-md ring-1 ring-gray-900/5 focus:outline-none'>
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}`}
                          className='block px-3 py-1 text-sm leading-6'
                        >
                          Ver proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to={`/projects/${project._id}/edit`}
                          className='block px-3 py-1 text-sm leading-6'
                        >
                          Editar proyecto
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 text-red-600'
                          onClick={() => mutate(project._id)}
                        >
                          Eliminar proyecto
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            ))
          ) : (
            <p>
              Actualmente no hay proyectos.{' '}
              <Link
                to='/projects/create'
                className='text-cyan-600 font-semibold hover:text-cyan-800 transition-colors duration-300'
              >
                Haz clic aquí para crear uno.
              </Link>
            </p>
          )}
        </div>
      </>
    );
};
