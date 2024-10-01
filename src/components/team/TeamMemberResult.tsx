import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TeamMember } from '@/types';
import { addUserToProject } from '@/api';

type TeamMemberResultProps = {
  user: TeamMember;
  reset: () => void;
};

export const TeamMemberResult = ({ user, reset }: TeamMemberResultProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: data => {
      toast.success(data.message);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };
    mutate(data);
  };

  return (
    <>
      <p className='mt-10 font-bold text-center'>Resultado de la búsqueda</p>
      <div className='flex justify-between items-center mt-5 w-full'>
        <p className='pl-6'>{user.name}</p>
        <button
          type='button'
          className='hover:bg-slate-100 px-6 py-1 rounded transition-colors duration-300 ease-in'
          onClick={handleAddUserToProject}
        >
          Añadir
        </button>
      </div>
    </>
  );
};
