import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { BiLogOutCircle } from 'react-icons/bi';
export const NavMenu = () => {
  return (
    <div className='flex justify-center md:justify-between mt-5 md:mt-0 w-full'>
      <Menu>
        <div className='flex space-x-4'>
          <MenuItem>
            <Link to='/profile' className='block hover:text-cyan-300'>
              Perfil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to='/' className='block hover:text-cyan-300'>
              Proyectos
            </Link>
          </MenuItem>
        </div>
        <div className='flex space-x-3 ms-4 md:ms-0'>
          <p>Hola, Daniel</p>
          <MenuButton className='hover:text-cyan-300'>
            <BiLogOutCircle className='h-6 w-6' />
          </MenuButton>
        </div>
      </Menu>
    </div>
  );
};
