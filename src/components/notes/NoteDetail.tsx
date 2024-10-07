import { Note } from '@/types';
import { formatDate } from '@/utils/utils';

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  return (
    <div className='flex justify-between items-center p-2'>
      <div className='space-y-1'>
        <p className='font-bold'>Creada por {note.createdBy.name}</p>
        <p className='text-slate-600'>{note.content}</p>
        <p className='text-sm text-slate-500'>{formatDate(note.createdAt)}</p>
      </div>
    </div>
  );
};
