const express = require('express');
const logger = require('./utils/logger');
const config = require('./utils/config');
const Blog = require('./models/blog');
const cors = require('cors');
const mongoose = require('mongoose');
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

app.get( '/api/blogs', (request, response) => {
    Blog
        .find({})
        .then( blogs => {
            response.json(blogs);
        } );
} );

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        });
});

const PORT = config.PORT || 3003;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});