exports.sendErrorResponse = (res, message, args) => {
    res.status(500).send({message, args});
}