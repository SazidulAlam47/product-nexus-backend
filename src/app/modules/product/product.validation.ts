import z from 'zod';
import { productStatus } from './product.constant';

const createProduct = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discount: z.number(),
    status: z.enum(productStatus),
    productCode: z.string(),
    category: z.string(),
});

export const ProductValidations = {
    createProduct,
};
