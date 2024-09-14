import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components';

type ProjectFormProps = {
  register: UseFormRegister<{
    name: string;
    client: string;
    description: string;
  }>;
  errors: FieldErrors<{
    name: string;
    client: string;
    description: string;
  }>;
};

export const ProjectForm = ({ register, errors }: ProjectFormProps) => {
  return (
    <>
      <div className='mb-5 space-y-3'>
        <label htmlFor='name' className='font-bold'>
          Proyecto
        </label>
        <input
          id='name'
          className='w-full p-3 border border-gray-200 rounded'
          type='text'
          placeholder='Nombre del proyecto'
          {...register('name', {
            required: 'El Titulo del proyecto es obligatorio',
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className='mb-5 space-y-3'>
        <label htmlFor='client' className='font-bold'>
          Cliente
        </label>
        <input
          id='client'
          className='w-full p-3 border border-gray-200 rounded'
          type='text'
          placeholder='Nombre del cliente'
          {...register('client', {
            required: 'El cliente es obligatorio',
          })}
        />
        {errors.client && <ErrorMessage>{errors.client.message}</ErrorMessage>}
      </div>
      <div className='mb-5 space-y-3'>
        <label htmlFor='description' className='font-bold'>
          Descripción
        </label>
        <textarea
          id='description'
          className='w-full p-3  border border-gray-200 rounded'
          placeholder='Descripción del proyecto'
          {...register('description', {
            required: 'La descripción del proyecto es obligatoria',
          })}
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      </div>
    </>
  );
};
