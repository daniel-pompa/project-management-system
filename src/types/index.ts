import { z } from 'zod';

/** Auth */
export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirm_password: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginCredentials = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'confirm_password'
>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ResetPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'confirm_password'>;
export type ConfirmToken = Pick<Auth, 'token'>;

/** Users */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });

export type User = z.infer<typeof userSchema>;

/** Tasks */
export const taskStatusSchema = z.enum([
  'pending',
  'hold',
  'progress',
  'review',
  'completed',
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
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

/** Development Team */
export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});

export type TeamMember = z.infer<typeof teamMemberSchema>;
export  type TeamMemberForm = Pick<TeamMember, 'email'>;
