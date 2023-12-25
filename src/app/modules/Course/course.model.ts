import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';
import dateToWeeks from '../../utils/dateToWeeks';

const CourseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true,
  },
  instructor: {
    type: String,
    required: [true, 'Instructor is required'],
    trim: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  price: { type: Number, required: [true, 'Price is required'] },
  tags: [
    {
      _id: false,
      name: { type: String, required: [true, 'Tag name is required'] },
      isDeleted: { type: Boolean, default: false },
    },
  ],
  startDate: {
    type: String,
    required: [true, 'Start date is required'],
    trim: true,
  },
  endDate: {
    type: String,
    required: [true, 'End date is required'],
    trim: true,
  },
  durationInWeeks: { type: Number, default: 0 },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true,
  },
  provider: {
    type: String,
    required: [true, 'Provider is required'],
    trim: true,
  },
  details: {
    level: { type: String, required: [true, 'Level is required'], trim: true },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
  },
});

// Pre-save hook || calculating durationInWeeks
CourseSchema.pre('save', async function (next) {
  const weeks = dateToWeeks(this.startDate, this.endDate);
  this.durationInWeeks = weeks;
  next();
});

export const Course = model<TCourse>('Course', CourseSchema);
