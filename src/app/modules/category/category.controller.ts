import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryServices.createCategory(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Category created successfully',
        data: result,
    });
});

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryServices.getAllCategories();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'All Categories fetched successfully',
        data: result,
    });
});

const getCategoryById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryServices.getCategoryById(id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'All Categories fetched successfully',
        data: result,
    });
});

export const CategoryControllers = {
    createCategory,
    getAllCategories,
    getCategoryById,
};
