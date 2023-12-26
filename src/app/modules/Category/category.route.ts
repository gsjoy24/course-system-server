import express from 'express';
import CategoryControllers from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import CategoryValidationSchema from './category.validation';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/',
  auth('admin'),
  validateRequest(CategoryValidationSchema),
  CategoryControllers.createCategory,
);
route.get('/', CategoryControllers.getAllCategories);
route.put(
  '/:id',
  validateRequest(CategoryValidationSchema),
  CategoryControllers.updateCategory,
);
route.delete('/:id', CategoryControllers.deleteCategory);

export const CategoryRoutes = route;
