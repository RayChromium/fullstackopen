const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
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

blogsRouter.put('/:id', async (request, response) =>{
    logger.info('put request:', request.body);
    const likes = request.body.likes;
    try{
        const returnedPost = await Blog.findByIdAndUpdate( request.params.id, { $inc:{likes: 1} }, {new:true} );
        logger.info(returnedPost);
        if( !returnedPost ){
            response.status(404).json({error: 'cannot find the blog to be liked'});
        }

        response.json(returnedPost);
    } catch (error) {
        response.status(500).json({error:'SHTF put request handling in server'})
    }
});

module.exports = blogsRouter;