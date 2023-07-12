const fs = require('fs');
const path = require('path');

// Function to import routes dynamically
const importRoutes = (app, folderPath = '../routes') => {
    const routesPath = path.join(__dirname, folderPath);
    const routeFiles = fs.readdirSync(routesPath);

    routeFiles.forEach((file) => {
        const routePath = path.join(routesPath, file);
        const routeStat = fs.statSync(routePath);

        if (routeStat.isDirectory()) {
            // If the current file is a directory, recursively call the function
            const nestedFolderPath = path.join(folderPath, file);
            importRoutes(app, nestedFolderPath);
        } else {
            // If the current file is a route file, require and register it with the app
            const route = require(routePath);
            app.use('/api', route);
        }
    });
};

module.exports = importRoutes;

