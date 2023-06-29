const express = require('express');
require('express-async-errors');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

mongoose.set('strictQuery', false);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl)
    .then( result => {
        logger.info('connected to MongoDB');
    })
    .catch( error => {
        logger.error('Failed to connect to MongoDB, message:', error.message);
    } );

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use( '/api/blogs/', blogsRouter );

app.use( '/api/users/', userRouter );

app.use( '/api/login/', loginRouter );

// unknown endpoint router handler must come after all valid routers
app.use(middleware.unknownEndpoint);
// error handler comes last
app.use(middleware.errorHandler);

module.exports = app;