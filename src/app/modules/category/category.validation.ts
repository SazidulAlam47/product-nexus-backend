import z from 'zod';

const createCategory = z.object({
    name: z.string(),
});

export const CategoryValidations = {
    createCategory,
};
