import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);
router.get('/:id', CategoryControllers.getCategoryById);

router.post(
    '/',
    validateRequest(CategoryValidations.createCategory),
    CategoryControllers.createCategory,
);

export const CategoryRoutes = router;
