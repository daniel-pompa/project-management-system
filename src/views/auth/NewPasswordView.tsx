import { useState } from 'react';
import { NewPasswordForm, NewPasswordToken } from '@/components';
import { ConfirmToken } from '@/types';

export const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken['token']>('');
  const [isTokenValid, setTokenValid] = useState(false);

  return (
    <>
      {!isTokenValid ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setTokenValid={setTokenValid}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
};
