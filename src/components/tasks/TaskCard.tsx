import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { useDraggable } from '@dnd-kit/core';
import { toast } from 'react-toastify';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { TaskProject } from '@/types';
import { deleteTask } from '@/api';

type TaskCardProps = {
  task: TaskProject;
  hasEditPermission: boolean;
};

export const TaskCard = ({ task, hasEditPermission }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const navigate = useNavigate();
  /** Get the project ID from the URL */
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['task'] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li className='p-5 bg-white border border-slate-200 rounded flex justify-between'>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className='min-w-0 flex flex-col gap-y-2 w-full cursor-move'
      >
        <p className='text-slate-600 font-bold text-left truncate'>{task.name}</p>
        <p className='text-slate-500 truncate'>{task.description}</p>
      </div>
      <div className='flex shrink-0 gap-x-6'>
        <Menu as='div' className='relative'>
          <MenuButton className='-m-2.5 block p-2.5 text-slate-500 hover:text-slate-900'>
            <span className='sr-only'>opciones</span>
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
            <MenuItems className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none'>
              <MenuItem>
                <button
                  type='button'
                  className='block px-3 py-1 text-sm leading-6 text-slate-900'
                  onClick={() => navigate(`${location.pathname}?view-task=${task._id}`)}
                >
                  Ver Tarea
                </button>
              </MenuItem>
              {hasEditPermission && (
                <>
                  <MenuItem>
                    <button
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 text-slate-900'
                      onClick={() =>
                        navigate(`${location.pathname}?edit-task=${task._id}`)
                      }
                    >
                      Editar Tarea
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type='button'
                      className='block px-3 py-1 text-sm leading-6 text-red-600'
                      onClick={() => mutate({ projectId, taskId: task._id })}
                    >
                      Eliminar Tarea
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};
