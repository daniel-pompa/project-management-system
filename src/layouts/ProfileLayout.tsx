import { Tabs } from '@/components';
import { Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
};
