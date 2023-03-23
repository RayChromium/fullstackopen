const express = require('express');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const Blog = require('./models/blog');
const cors = require('cors');
const mongoose = require('mongoose');
const blog = require('./models/blog');
const app = express();

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

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

app.get( '/api/blogs', (request, response, next) => {
    Blog
        .find({})
        .then( blogs => {
            response.json(blogs);
        } );
} );

app.get('/api/blogs/:id', (request, response, next) =>{
    Blog.findById( request.params.id )
        .then( returnedPost => {
            logger.info(returnedPost);
            response.json(returnedPost);
        } )
        .catch( error => next(error) );
});

app.post('/api/blogs', (request, response, next) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

// unknown endpoint router handler must come after all valid routers
app.use(middleware.unknownEndpoint);
// error handler comes last
app.use(middleware.errorHandler);

const PORT = config.PORT || 3003;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});