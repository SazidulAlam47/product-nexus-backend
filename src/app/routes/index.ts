import { Router } from 'express';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductRoutes } from '../modules/product/product.route';

const router = Router();

const moduleRoutes = [
    {
        path: '/categories',
        route: CategoryRoutes,
    },
    {
        path: '/products',
        route: ProductRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
