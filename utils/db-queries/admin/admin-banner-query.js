const generateBannerQuery = (reqQuery) => {
    const { text, startDate, endDate, category, userPrivate} = reqQuery;
    let query = {};


    if (text) {
        query.text = { $regex: text, $options: 'i' };
    }

    if (startDate) {
        query.startDate = { $gte: new Date(startDate) };
    }

    if (endDate) {
        query.endDate = { $eq: new Date(endDate) };
    }

    if (userPrivate) {
        query.userPrivate = userPrivate;
    }

    if (category) {
        query.category = { $regex: category, $options: 'i' };
    }
    console.log('query', query)
    return query;
};

module.exports = generateBannerQuery;
