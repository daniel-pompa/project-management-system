import { Link } from 'react-router-dom';
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
    <div className='flex justify-center md:justify-between mt-5 md:mt-0 w-full'>
      <Menu>
        <div className='flex space-x-4'>
          <MenuItem>
            <Link to='/profile' className='block md:text-xl hover:text-cyan-400'>
              Perfil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/' className='block md:text-xl hover:text-cyan-400'>
              Proyectos
            </Link>
          </MenuItem>
        </div>
        <div className='flex space-x-3 ms-4 md:ms-0'>
          <p className='md:text-xl'>Hola, {name}</p>
          <MenuButton className='hover:text-cyan-400'>
            <AiOutlineLogout className='h-5 w-5 md:w-6 md:h-6' onClick={logout} />
          </MenuButton>
        </div>
      </Menu>
    </div>
  );
};
