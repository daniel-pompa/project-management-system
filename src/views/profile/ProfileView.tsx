import { useAuth } from '@/hooks/useAuth';
import { ProfileForm, Spinner } from '@/components';

export const ProfileView = () => {
  const { data, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (data) return <ProfileForm data={data} />;
};
