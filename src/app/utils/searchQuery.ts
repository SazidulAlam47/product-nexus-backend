import { FilterQuery, Query } from 'mongoose';

const searchQuery = <T>(
    modelQuery: Query<T[], T>,
    searchableFields: string[],
    searchTerm: string | undefined,
) => {
    if (searchTerm) {
        return modelQuery.find({
            $or: searchableFields.map(
                (field) =>
                    ({
                        [field]: {
                            $regex: searchTerm,
                            $options: 'i',
                        },
                    }) as FilterQuery<T>,
            ),
        });
    } else {
        return modelQuery;
    }
};

export default searchQuery;
