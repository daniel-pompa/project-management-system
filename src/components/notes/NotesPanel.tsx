import { Task } from '@/types';
import { AddNoteForm } from './AddNoteForm';
import { NoteDetail } from './NoteDetail';

type NotesPanelProps = {
  notes: Task['notes'];
};

export const NotesPanel = ({ notes }: NotesPanelProps) => {
  return (
    <>
      <AddNoteForm />
      <div className='mt-10 divide-y-2 divide-slate-100'>
        {notes.length ? (
          <>
            <p className='font-bold mb-4'>Notas</p>
            {notes.map(note => (
              <NoteDetail key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className='bg-slate-100 text-slate-600 text-center p-2 rounded'>
            Aún no hay notas disponibles
          </p>
        )}
      </div>
    </>
  );
};
