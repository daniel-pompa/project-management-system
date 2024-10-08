import { ChangeEvent } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { name: 'Mi cuenta', href: '/profile', icon: FaUser },
  { name: 'Cambiar contraseña', href: '/profile/change-password', icon: FaLock },
];

/** Classnames helper function for Tailwind CSS */
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const Tabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href;

  return (
    <div className='mb-10'>
      {/* Mobile View */}
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Seleccione una pestaña
        </label>
        <select
          id='tabs'
          name='tabs'
          className='block w-full rounded border-slate-300 focus:border-slate-800 focus:ring-slate-800'
          onChange={(e: ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
          value={currentTab}
        >
          {tabs.map(tab => (
            <option value={tab.href} key={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      {/* Desktop View */}
      <div className='hidden sm:block'>
        <div className='border-b border-slate-200'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {tabs.map(tab => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? 'border-slate-800 text-slate-800'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
                  'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href
                      ? 'text-slate-800'
                      : 'text-gray-400 group-hover:text-slate-500',
                    '-ml-0.5 mr-2 h-4 w-4 transition-colors duration-300 ease-in-out'
                  )}
                  aria-hidden='true'
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
