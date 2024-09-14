import { ReactNode } from 'react';

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className='text-red-800 font-bold text-xs md:text-sm'>
      {children}
    </div>
  );
};
