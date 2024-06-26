import { Types } from 'mongoose';

type TReview = {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
  createdBy: Types.ObjectId;
};

export default TReview;
