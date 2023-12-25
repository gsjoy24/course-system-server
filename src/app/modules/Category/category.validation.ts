import { z } from 'zod';

const CategoryValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Category name is required',
        invalid_type_error: 'Category name must be a string',
      })
      .trim()
      .nonempty({
        message: 'Category name cannot be empty',
      }),
  }),
});

export default CategoryValidationSchema;
