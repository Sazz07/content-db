import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const editArticleSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(10000, 'Content must be less than 10,000 characters'),
  status: z.enum(['Published', 'Draft'], {
    error: 'Please select a status',
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type EditArticleFormData = z.infer<typeof editArticleSchema>;
