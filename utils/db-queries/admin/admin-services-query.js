const generateServiceQuery = (reqQuery) => {
    const {category, isFeatured, rating, duration, name, serviceId} = reqQuery;
    let query = {};

    if (category) {
        query.category = category;
    }

    if (isFeatured !== undefined) {
        query.isFeatured = isFeatured;
    }

    if (rating) {
        query.rating = {$gte: rating};
    }

    if (duration) {
        query.duration = duration;
    }

    if (serviceId) {
        query._id = serviceId;
    }

    if (name) {
        query.name = {$regex: name, $options: 'i'};
    }
    console.log('query', query)
    return query;
};

module.exports = generateServiceQuery;
