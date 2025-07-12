import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { TFile } from '../../interface';
import { Category } from '../category/category.model';
import { TProduct } from './product.interface';
import generateProductCode from '../../utils/generateProductCode';
import sendImageToCloudinary from '../../utils/sendImageToCloudinary';
import { Product } from './product.model';

const createProduct = async (payload: TProduct, file: TFile) => {
    const category = await Category.findById(payload.category);

    if (!category) {
        throw new ApiError(status.NOT_FOUND, 'Category not found');
    }

    if (!file?.size) {
        throw new ApiError(status.BAD_REQUEST, 'Please Upload Product Image');
    }

    // generate product code
    payload.productCode = generateProductCode(payload.name);

    const isProductExists = await Product.findOne({
        productCode: payload.productCode,
    });
    if (isProductExists) {
        throw new ApiError(
            status.CONFLICT,
            'This product code is already exists',
        );
    }

    // upload image
    const imgName = payload.name + '-' + Date.now();
    payload.image = await sendImageToCloudinary(imgName, file.path);

    const result = await Product.create(payload);

    return result;
};

const getAllProducts = async () => {
    const result = await Product.find().populate('category');
    return result;
};

const getProductById = async (id: string) => {
    const result = await Product.findById(id);
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }
    return result;
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
};
