import TReview from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (data: TReview) => {
  const review = await Review.create(data);
  return review;
};

const getReviewsFromDB = async (courseId: string) => {
  const reviews = await Review.find({ courseId });
  return reviews;
};

// it will delete all the reviews of a course when the course is deleted
const deleteReviewFromDB = async (courseId: string) => {
  const review = await Review.deleteMany({ courseId });
  return review;
};

const getAllReviewsFromDB = async () => {
  const reviews = await Review.find();
  return reviews;
};

const ReviewServices = {
  createReviewIntoDB,
  getReviewsFromDB,
  deleteReviewFromDB,
  getAllReviewsFromDB,
};

export default ReviewServices;
