import z from 'zod';
import { CategoryValidations } from './category.validation';

export type TCategory = z.infer<typeof CategoryValidations.createCategory>;
