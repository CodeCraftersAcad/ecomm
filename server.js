require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const {connectDB} = require('./config/db');
const sessionMiddleware = require('./middleware/sessionMiddleware');
const corsMiddleware = require('./middleware/corsMiddleware');
const gZipMiddleware = require('./middleware/compressionMiddleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(gZipMiddleware);
app.use(morgan('combined'));

connectDB().then(() => {
    app.listen(PORT, () => {
        // Dynamically import routes
        require('./utils/route-import')(app);
        console.log(`Server listening on port ${PORT}`);
    });
}).catch(error => {
    console.log(error);
    process.exit(1);
});
