import { NavLink } from 'react-router-dom';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { AiOutlineLogout } from 'react-icons/ai';
import { User } from '@/types';

type NavMenuProps = {
  name: User['name'];
};

export const NavMenu = ({ name }: NavMenuProps) => {
  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return (
    <div className='flex justify-center md:justify-between w-full'>
      <Menu>
        <div className='flex space-x-4'>
          <MenuItem>
            <NavLink
              to='/profile'
              className={({ isActive }) =>
                `block md:text-xl ${
                  isActive ? 'text-slate-400' : 'text-slate-100'
                } hover:text-slate-400`
              }
            >
              Perfil
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `block md:text-xl ${
                  isActive ? 'text-slate-400' : 'text-slate-100'
                } hover:text-slate-400`
              }
            >
              Proyectos
            </NavLink>
          </MenuItem>
        </div>
        <div className='flex space-x-3 ms-4 md:ms-0'>
          <p className='md:text-xl text-slate-100'>Hola, {name}</p>
          <MenuButton className='text-slate-100 hover:text-slate-400'>
            <AiOutlineLogout className='h-4 w-4 md:w-6 md:h-6' onClick={logout} />
          </MenuButton>
        </div>
      </Menu>
    </div>
  );
};
