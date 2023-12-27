import { JwtPayload } from 'jsonwebtoken';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCategoryIntoDB = async (
  userData: JwtPayload,
  payload: TCategory,
) => {
  payload.createdBy = userData._id;
  const category = await Category.create(payload);
  return category;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Category.find().populate({
    path: 'createdBy',
    select: '-createdAt -updatedAt -__v',
  });
  return categories;
};

const updateCategoryInDB = async (id: string, payload: TCategory) => {
  // check if the category exists
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const category = await Category.findByIdAndUpdate(id, payload, { new: true });
  return category;
};

const deleteCategoryInDB = async (id: string) => {
  // check if the category exists
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }
  const category = await Category.findByIdAndDelete(id);
  return category;
};

const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  updateCategoryInDB,
  deleteCategoryInDB,
};

export default CategoryServices;
