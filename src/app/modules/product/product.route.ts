import express from 'express';
import validateRequestWithFileCleanup from '../../middlewares/validateRequestWithFileCleanup';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getProductById);

router.post(
    '/',
    upload.single('file'),
    validateRequestWithFileCleanup(ProductValidations.createProduct),
    ProductControllers.createProduct,
);

router.patch(
    '/:id',
    validateRequest(ProductValidations.updateProduct),
    ProductControllers.updateProductById,
);

export const ProductRoutes = router;
