import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const category = await Category.create(payload);
  return category;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Category.find();
  return categories;
};

const updateCategoryInDB = async (id: string, payload: TCategory) => {
  const category = await Category.findByIdAndUpdate(id, payload, { new: true });
  return category;
};

const deleteCategoryInDB = async (id: string) => {
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
