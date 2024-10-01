import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TaskFormData } from '@/types';
import { ErrorMessage } from '@/components';

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>;
  register: UseFormRegister<TaskFormData>;
};

export const TaskForm = ({ errors, register }: TaskFormProps) => {
  return (
    <>
      <div className='space-y-3'>
        <label htmlFor='name' className='font-bold'>
          Nombre de la tarea
        </label>
        <input
          id='name'
          type='text'
          placeholder='Nombre de la tarea'
          className='w-full p-2 border-slate-200 border rounded'
          {...register('name', {
            required: 'El nombre de la tarea es obligatorio',
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className='space-y-3'>
        <label htmlFor='description' className='font-bold'>
          Descripción de la tarea
        </label>
        <textarea
          id='description'
          placeholder='Descripción de la tarea'
          className='w-full p-2 border-slate-200 border rounded'
          {...register('description', {
            required: 'La descripción de la tarea es obligatoria',
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>
    </>
  );
};
