import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: TCategory) => {
    const isCategoryExists = await Category.findOne(payload);

    if (isCategoryExists) {
        throw new ApiError(
            status.CONFLICT,
            `${payload.name} is already exits in categories`,
        );
    }

    const result = await Category.create(payload);
    return result;
};

const getAllCategories = async () => {
    const result = await Category.find();
    return result;
};

const getCategoryById = async (id: string) => {
    const result = await Category.findById(id);

    if (!result) {
        throw new ApiError(status.NOT_FOUND, 'Category not found');
    }

    return result;
};

export const CategoryServices = {
    createCategory,
    getAllCategories,
    getCategoryById,
};
