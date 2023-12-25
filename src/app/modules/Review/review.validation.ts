import { z } from 'zod';

const ReviewValidationSchema = z.object({
  body: z.object({
    courseId: z
      .string({
        required_error: 'Course id is required',
        invalid_type_error: 'Course id must be a string',
      })
      .trim()
      .nonempty({
        message: 'Course id cannot be empty',
      }),
    rating: z
      .number({
        required_error: 'Rating is required',
        invalid_type_error: 'Rating must be a number',
      })
      .nonnegative({
        message: 'Rating cannot be negative',
      })
      .min(1, {
        message: 'Rating must be between 1 and 5',
      })
      .max(5, {
        message: 'Rating must be between 1 and 5',
      }),
  }),
});

export default ReviewValidationSchema;
