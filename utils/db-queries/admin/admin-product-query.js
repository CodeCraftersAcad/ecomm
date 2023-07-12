exports.adminProductQuery = async (reqQuery) => {
    const {searchQuery, minRating, tags, category, prodId, size} = reqQuery;
    let query = {};

    // Search by text
    if (searchQuery) {
        query = {
            $or: [
                {name: {$regex: searchQuery, $options: 'i'}},
                {description: {$regex: searchQuery, $options: 'i'}},
            ],
        };
    }

    if (minRating) query.rating = {$gte: minRating};

    if (size) query.size = {$regex: size, $options: 'i'};

    if (category) query.category = {$regex: category, $options: 'i'};

    if (tags) query.tags = {$regex: tags, $options: 'i'};

    if (prodId) query._id = prodId;

    return query;
};