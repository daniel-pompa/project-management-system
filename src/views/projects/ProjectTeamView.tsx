import { AddTeamMemberModal } from '@/components';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const ProjectTeamView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between'>
        <div className='space-y-2'>
          <h1 className='text-xl md:text-3xl font-bold'>
            Gestión del equipo de proyecto
          </h1>
          <p className='md:text-xl text-slate-600'>
            Administra los miembros del equipo de trabajo para este proyecto.
          </p>
        </div>
        <nav className='mt-5 md:mt-3'>
          <button
            type='button'
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded transition-colors'
            onClick={() => navigate(`${location.pathname}?add-member=true`)}
          >
            Añadir colaborador
          </button>
          <Link
            to={`/projects/${projectId}`}
            className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded transition-colors ml-3 md:mt-2 inline-block'
          >
            Proyecto
          </Link>
        </nav>
      </div>
      <AddTeamMemberModal />
    </>
  );
};
