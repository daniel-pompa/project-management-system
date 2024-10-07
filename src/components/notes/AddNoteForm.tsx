import { useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { NoteFormData } from '@/types';
import { createNote } from '@/api';
import { ErrorMessage } from '@/components';

export const AddNoteForm = () => {
  const params = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get('view-task')!;

  const initialValues: NoteFormData = {
    content: '',
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' noValidate>
      <div className='flex flex-col space-y-3'>
        <label htmlFor='content' className='font-bold'>
          Crear una nota
        </label>
        <input
          id='content'
          type='text'
          placeholder='Contenido de la nota'
          className='w-full p-2 border-slate-200 border rounded'
          {...register('content', {
            required: 'El contenido de la nota es obligatorio',
          })}
        />
        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      </div>
      <input
        type='submit'
        value='Guardar nota'
        className='bg-slate-800 hover:bg-slate-900 text-white px-3 py-2 rounded transition-colors cursor-pointer w-full'
      />
    </form>
  );
};
