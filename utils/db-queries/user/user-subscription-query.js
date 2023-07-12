exports.subscriptionQuery = async (subQuery) => {
    try {
        const {userId, product, service, status, startDate, lastCycleDate} = subQuery;
        const query = {};

        if (userId) query.user = userId;

        if (startDate) query.startDate = startDate;

        if (product) query.product = product;

        if (service) query.service = service;

        if (status) query.status = status;

        if (lastCycleDate) query.lastCycleDate = lastCycleDate;

        return query;
    } catch (error) {
        console.log('Error in subscriptionQuery');
        return {};
    }
}