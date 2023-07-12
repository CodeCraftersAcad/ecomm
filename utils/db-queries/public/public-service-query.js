const generateServiceQuery = (reqQuery) => {
    const { searchQuery, category, isFeatured, rating, duration, name, page, limit } = reqQuery;
    let query = {};

    if (searchQuery) {
        query.name = { $regex: searchQuery, $options: 'i' };
    }

    if (category) {
        query.category = category;
    }

    if (isFeatured !== undefined) {
        query.isFeatured = isFeatured;
    }

    if (rating) {
        query.rating = { $gte: rating };
    }

    if (duration) {
        query.duration = duration;
    }

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

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

module.exports = generateServiceQuery;
