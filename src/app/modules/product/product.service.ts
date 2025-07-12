import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { TFile } from '../../interface';
import { Category } from '../category/category.model';
import { TProduct } from './product.interface';
import generateProductCode from '../../utils/generateProductCode';
import sendImageToCloudinary from '../../utils/sendImageToCloudinary';
import { Product } from './product.model';
import { productSearchableFields } from './product.constant';
import searchQuery from '../../utils/searchQuery';

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

const getAllProducts = async (query: Record<string, unknown>) => {
    let baseProductQuery = Product.find().populate('category');

    if (query.category) {
        const category = await Category.findOne({ name: query.category });

        if (!category) {
            throw new ApiError(
                status.NOT_FOUND,
                `Category '${query.category}' not found. Please provide a valid category name.`,
            );
        }

        baseProductQuery = baseProductQuery.find({ category: category._id });
    }

    baseProductQuery = searchQuery(
        baseProductQuery,
        productSearchableFields,
        query.search as string | undefined,
    );

    return await baseProductQuery;
};

const getProductById = async (id: string) => {
    const result = await Product.findById(id);
    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }
    return result;
};

const updateProductById = async (
    id: string,
    payload: Partial<Pick<TProduct, 'category' | 'description' | 'discount'>>,
) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }

    const result = await Product.findByIdAndUpdate(id, payload, { new: true });

    return result;
};

export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
};
