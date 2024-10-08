import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { Note } from '@/types';
import { deleteNote } from '@/api';
import { formatDate } from '@/utils/utils';
import { useAuth } from '@/hooks/useAuth';
import { Spinner } from '@/components';

type NoteDetailProps = {
  note: Note;
};

export const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();

  const canUserDeleteNote = useMemo(() => data?._id === note.createdBy._id, [data, note]);

  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get('view-task')!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className='flex justify-between items-center p-2 gap-2'>
      <div className='space-y-1'>
        <p className='font-bold'>Creada por {note.createdBy.name}</p>
        <p className='text-slate-600'>{note.content}</p>
        <p className='text-sm text-slate-500'>{formatDate(note.createdAt)}</p>
      </div>
      {canUserDeleteNote && (
        <button
          type='button'
          className='text-red-500 hover:text-red-600 transition-colors'
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};
