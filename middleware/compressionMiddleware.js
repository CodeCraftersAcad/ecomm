const compression = require('compression');

module.exports = compression({
    threshold: 1024, // 1KB
    level: 6,
    chunkSize: 4096, // 4KB
});
