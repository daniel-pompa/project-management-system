import { useForm } from 'react-hook-form';
import { NoteFormData } from '@/types';
import { ErrorMessage } from '@/components';

export const AddNoteForm = () => {
  const initialValues: NoteFormData = {
    content: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const onSubmit = (formData: NoteFormData) => {
    console.log(formData);
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
