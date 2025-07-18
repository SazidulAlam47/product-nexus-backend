import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { productStatus } from './product.constant';

const productSchema = new Schema<TProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: productStatus,
            default: 'In Stock',
            required: true,
        },
        productCode: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    },
    {
        timestamps: true,
        _id: true,
        id: false,
        toJSON: {
            virtuals: true,
        },
    },
);

productSchema.virtual('finalPrice').get(function () {
    const price = this.price || 0;
    const discount = this.discount || 0;
    const finalPrice = price - (price * discount) / 100;
    return parseFloat(finalPrice.toFixed(2));
});

export const Product = model<TProduct>('Product', productSchema);
