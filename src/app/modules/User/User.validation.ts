import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
      })
      .trim(),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({
        message: 'Email must be a valid email',
      })
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .refine(
        (value) => {
          const strongEnough = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          return strongEnough.test(value);
        },
        {
          message:
            'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.',
        },
      ),
    role: z.enum(['user', 'admin'], {
      required_error: 'Role is required',
      invalid_type_error: 'Role must be either "user" or "admin"',
    }),
  }),
});

const LoginUserValidationSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username must be a string',
      })
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim(),
  }),
});
const UserValidations = {
  UserValidationSchema,
  LoginUserValidationSchema,
};

export default UserValidations;
