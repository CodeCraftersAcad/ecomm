const generateCouponQuery = async (reqQuery) => {
    const { name, startDate, endDate, code, couponId } = reqQuery;
    let query = {};

    if (couponId) query._id = couponId;

    if (name) {
        query.name = { $regex: name, $options: 'i' };
    }

    if (startDate) {
        query.startDate = { $gte: new Date(startDate) };
    }

    if (endDate) {
        query.endDate = { $lte: new Date(endDate) };
    }

    if (code) {
        query.code = { $regex: code, $options: 'i' };
    }

    return query;
};

module.exports = generateCouponQuery;
