import express from 'express';
import validateRequestWithFileCleanup from '../../middlewares/validateRequestWithFileCleanup';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
    '/',
    upload.single('file'),
    validateRequestWithFileCleanup(ProductValidations.createProduct),
    ProductControllers.createProduct,
);

export const ProductRoutes = router;
