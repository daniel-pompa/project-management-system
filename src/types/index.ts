import { z } from 'zod';

/** Tasks */
export const taskStatusSchema = z.enum([
  'pending',
  'hold',
  'progress',
  'review',
  'completed',
]);

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string(),
});

export const dashboardProjectsSchema = z.array(
  projectSchema.pick({ _id: true, name: true, client: true, description: true })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'name' | 'client' | 'description'>;
