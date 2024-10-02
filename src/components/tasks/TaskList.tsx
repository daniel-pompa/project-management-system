import { Task } from '@/types';
import { TaskCard } from '@/components';
import { statusTranslations } from '@/locales/es';

type TaskListProps = {
  tasks: Task[];
};

type GroupedTasks = {
  [key: string]: Task[];
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

export const TaskList = ({ tasks }: TaskListProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialTaskStatusGroups);

  return (
    <>
      <h2 className='text-2xl md:text-3xl font-black mt-10'>Tareas</h2>
      <div className='flex flex-col md:flex-row gap-5 overflow-x-scroll 2xl:overflow-auto pb-20'>
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
            <h3
              className={`border border-slate-200 p-3 my-5 bg-white  border-t-8 ${statusStyles[status]} rounded`}
            >
              {statusTranslations[status]}
            </h3>
            <ul className='space-y-5'>
              {tasks.length === 0 ? (
                <li className='text-slate-500 text-center mt-10 font-bold'>
                  No hay tareas para mostrar
                </li>
              ) : (
                tasks.map(task => <TaskCard key={task._id} task={task} />)
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
