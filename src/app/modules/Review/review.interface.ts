import { Types } from 'mongoose';

type TReview = {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
};

export default TReview;
