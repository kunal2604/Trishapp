const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');
const HttpError = require('http-errors');

// get app
const app = express();

// logger
if (config.env === 'development') {
    app.use(logger('dev'));
}

// get dist folder
const distDir = path.join(__dirname, '../../dist');

// use dist folder as hosting folder by express
app.use(express.static(distDir));

// parsing from api
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// secure apps
app.use(helmet());

// allow cors
app.use(cors());

// authenticate
app.use(passport.initialize());

// api router localhost:4050/api
app.use('/api/', routes);

// serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new HttpError(404);
    return next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;

