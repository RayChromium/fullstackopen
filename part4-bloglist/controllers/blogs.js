const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get( '/', (request, response, next) => {
    Blog
        .find({})
        .populate('user')
        .then( blogs => {
            response.json(blogs);
        } )
        .catch(error => next(error));
} );

blogsRouter.get('/:id', (request, response, next) =>{
    Blog.findById( request.params.id )
        .then( returnedPost => {
            logger.info(returnedPost);
            response.json(returnedPost);
        } )
        .catch( error => next(error) );
});

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body);

    blog
        .save()
        .then(result => {
            response.status(201).json(result);
        })
        .catch(error => next(error));
});

module.exports = blogsRouter;