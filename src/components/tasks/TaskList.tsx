import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Project, TaskProject, TaskStatus } from '@/types';
import { TaskCard, TaskDropZone } from '@/components';
import { statusTranslations } from '@/locales/es';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStatus } from '@/api';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

type TaskListProps = {
  tasks: TaskProject[];
  hasEditPermission: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialTaskStatusGroups: GroupedTasks = {
  pending: [],
  hold: [],
  progress: [],
  review: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: 'border-t-slate-500',
  hold: 'border-t-red-500',
  progress: 'border-t-blue-500',
  review: 'border-t-amber-500',
  completed: 'border-t-green-500',
};

export const TaskList = ({ tasks, hasEditPermission }: TaskListProps) => {
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onSuccess: data => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialTaskStatusGroups);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      mutate({ projectId, taskId, status });
      queryClient.setQueryData(['project', projectId], (oldData: Project) => {
        const updatedTasks = oldData.tasks.map(task => {
          if (task._id === taskId) {
            return { ...task, status };
          }
          return task;
        });
        return { ...oldData, tasks: updatedTasks };
      });
    }
  };

  return (
    <>
      <h2 className='text-2xl md:text-3xl font-black mt-10'>Tareas</h2>
      <div className='flex flex-col md:flex-row gap-5 overflow-x-scroll 2xl:overflow-auto pb-20'>
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
              <h3
                className={`border border-slate-200 p-3 my-5 bg-white  border-t-8 ${statusStyles[status]} rounded`}
              >
                {statusTranslations[status]}
              </h3>
              <TaskDropZone status={status} />
              <ul className='space-y-5'>
                {tasks.length === 0 ? (
                  <li className='text-slate-500 text-center mt-10 font-bold'>
                    No hay tareas para mostrar
                  </li>
                ) : (
                  tasks.map(task => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      hasEditPermission={hasEditPermission}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
};
