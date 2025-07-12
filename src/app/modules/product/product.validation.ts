import z from 'zod';
import { productStatus } from './product.constant';

const createProduct = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discount: z.number(),
    status: z.enum(productStatus).optional(),
    category: z.string(),
});

const updateProduct = z.object({
    status: z.enum(productStatus).optional(),
    description: z.string().optional(),
    discount: z.number().optional(),
});

export const ProductValidations = {
    createProduct,
    updateProduct,
};
