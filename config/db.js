const mongoose = require('mongoose');
const connect = mongoose.connect;

// Connect to MongoDB
exports.connectDB = async () => {
    mongoose.set('strictQuery', false);
    try {
        const {connection} = await connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.info(`MongoDB connected: Collection Name: ${connection.name} Port: ${connection.port}`);
        return connection;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
};

