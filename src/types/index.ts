import { z } from 'zod';

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
