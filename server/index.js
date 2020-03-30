const app = require('./config/express');
const config = require('./config/config');

// listen to the port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port} (${config.env})`);
});