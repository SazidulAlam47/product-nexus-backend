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

export const ProductControllers = {
    createProduct,
};
