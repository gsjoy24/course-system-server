import { Schema, model } from 'mongoose';
import TReview from './review.interface';

const ReviewSchema = new Schema<TReview>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course id is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
    },
    review: {
      type: String,
      required: [true, 'Review is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', ReviewSchema);
