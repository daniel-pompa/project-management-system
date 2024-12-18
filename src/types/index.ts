import { z } from 'zod';

/** Auth */
export const authSchema = z.object({
  name: z.string(),
  email: z.string(),
  current_password: z.string(),
  password: z.string(),
  confirm_password: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginCredentials = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'confirm_password'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ResetPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordFormType = Pick<Auth, 'password' | 'confirm_password'>;
export type ChangePasswordFormType = Pick<Auth, 'current_password' | 'password' | 'confirm_password'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type CheckUserPasswordFormType = Pick<Auth, 'password'>;

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
export type UserProfileFormData = Pick<User, 'name' | 'email'>;

/** Notes */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

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
  lastStatusChangedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(noteSchema.extend({ createdBy: userSchema })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  name: z.string(),
  client: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
});

export const dashboardProjectsSchema = z.array(
  projectSchema.pick({
    _id: true,
    name: true,
    client: true,
    description: true,
    manager: true,
  })
);

export const editProjectSchema = projectSchema.pick({
  name: true,
  client: true,
  description: true,
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'name' | 'client' | 'description'>;

/** Development Team */
export const teamMemberSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
