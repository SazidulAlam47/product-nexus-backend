import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProduct(req.body, req.file);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Product created successfully',
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProducts();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'All Products fetched successfully',
        data: result,
    });
});

const getProductById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProductServices.getProductById(id);
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Product fetched successfully',
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
};
