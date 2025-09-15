import { Fragment } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { getProjectTeam, removeUserFromProject } from '@/api';
import { AddTeamMemberModal, Spinner } from '@/components';

export const ProjectTeamView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeUserFromProject,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['projectTeam', projectId] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to={'/404'} />;

  if (data)
    return (
      <>
        <div className='flex flex-col md:flex-row md:justify-between'>
          <div className='space-y-2'>
            <h1>Gestión del equipo de proyecto</h1>
            <p className='md:text-lg'>
              Administra los miembros del equipo de trabajo para este proyecto.
            </p>
          </div>
          <nav className='mt-5 md:mt-3'>
            <button
              type='button'
              className='btn min-w-36'
              onClick={() => navigate(`${location.pathname}?add-member=true`)}
            >
              Añadir colaborador
            </button>
            <Link
              to={`/projects/${projectId}`}
              className='btn min-w-36 ml-3 md:mt-2 text-center inline-block'
            >
              Proyecto
            </Link>
          </nav>
        </div>
        {/* Current team members */}
        <h2 className='mt-8'>Miembros actuales</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
          {data.length ? (
            data.map(member => (
              <div
                key={member._id}
                className='flex justify-between items-center bg-white p-4 rounded shadow-md'
              >
                <div className='min-w-0 flex-auto space-y-2'>
                  <p className='md:text-xl text-slate-600 font-bold'>{member.name}</p>
                  <p className='text-sm text-slate-500'>{member.email}</p>
                </div>
                {/* Menu buttons container */}
                <Menu as='div' className='relative'>
                  <MenuButton className='-m-2.5 block p-2.5 text-slate-500 hover:text-slate-900'>
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
                    <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white py-2 shadow-md ring-1 ring-slate-900/5 focus:outline-none'>
                      <MenuItem>
                        <button
                          type='button'
                          className='block px-3 py-1 text-sm text-red-600'
                          onClick={() => mutate({ projectId, userId: member._id })}
                        >
                          Eliminar del proyecto
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            ))
          ) : (
            <p className='font-bold'>No hay miembros en este equipo</p>
          )}
        </div>
        <AddTeamMemberModal />
      </>
    );
};
