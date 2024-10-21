import { z } from 'zod';

export const UserFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name is required and must be at least 2 characters long'
  }),
  email: z.string().email({ message: 'Email is invalid' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter'
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter'
    })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character'
    }),
  phone: z.string().regex(/^\(?([0-9]{3})\)?[- ]([0-9]{3})[-]([0-9]{4})$/, {
    message:
      'Phone number format is invalid. Use XXX-XXX-XXXX or (XXX) XXX-XXXX.'
  })
});

export const ArtisanFromSchema = z.object({});
