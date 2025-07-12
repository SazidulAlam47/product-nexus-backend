import { Types } from 'mongoose';
import { productStatus } from './product.constant';

export type TProductStatus = (typeof productStatus)[number];

export interface TProduct {
    name: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    status: TProductStatus;
    productCode: string;
    category: Types.ObjectId;
}
