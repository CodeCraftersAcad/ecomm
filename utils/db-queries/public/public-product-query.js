exports.publicProductQuery = async (reqQuery) => {
    const {name, searchQuery, rating, tags, category, prodId, size, page, limit} = reqQuery;
    let query = {};

    // Search by text
    if (searchQuery) {
        query.$or = [
            {description: {$regex: searchQuery, $options: 'i'}},
        ];
    }

    if (name) query.name = {$regex: name, $options: 'i'};

    if (rating) query.rating = {$eq: rating};

    if (size) query.size = {$regex: size, $options: 'i'};

    if (category) query.category = {$regex: category, $options: 'i'};

    if (tags) query.tags = {$regex: tags, $options: 'i'};

    if (prodId) query._id = prodId;

    // Pagination
    const pageOptions = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(limit, 10) || 10,
    };

    const skip = (pageOptions.page - 1) * pageOptions.limit;

    return {
        query,
        pageOptions,
        skip,
    };
};
