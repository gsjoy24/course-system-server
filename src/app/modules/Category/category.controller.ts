import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import CategoryServices from './category.service';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await CategoryServices.createCategoryIntoDB(
    req.user as JwtPayload,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryServices.getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    data: categories,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryServices.updateCategoryInDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: category,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const category = await CategoryServices.deleteCategoryInDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: null,
  });
});

const CategoryControllers = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

export default CategoryControllers;
