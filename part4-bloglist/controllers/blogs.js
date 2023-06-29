const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const getTokenFrom = request => {
    const authorization = request.get('authorization');
    if( authorization &&  authorization.startsWith('Bearer') ) {
        return authorization.replace( 'Bearer', '' );
    }
    return null;
};

blogsRouter.get( '/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user');
    response.json(blogs);
} );

blogsRouter.get('/:id', async (request, response) =>{
    const returnedPost = await Blog.findById( request.params.id );
    logger.info(returnedPost);
    response.json(returnedPost);
});

blogsRouter.post('/', async (request, response) => {
    logger.info(request.body);
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if(!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        user: user._id
    });
    const result = await blog.save();
    response.status(201).json(result);
});

module.exports = blogsRouter;