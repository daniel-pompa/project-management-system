import { useDroppable } from '@dnd-kit/core';

type TaskDropZoneProps = {
  status: string;
};

export const TaskDropZone = ({ status }: TaskDropZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: status });

  const style = {
    opacity: isOver ? 0.5 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='text-center text-slate-600 p-6 border-2 border-dashed border-slate-400 rounded-md bg-slate-50 hover:bg-slate-100 my-6 transition-all duration-300 ease-in-out cursor-pointer grid place-content-center'
    >
      <p>Arrastra y suelta una tarea aquí</p>
    </div>
  );
};
