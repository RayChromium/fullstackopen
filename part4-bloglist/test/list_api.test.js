const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

beforeEach( async () => {
    await Blog.deleteMany({});
    for( let blog of helper.initialBlogs ) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }
} , 100000);

test( 'e4.9: blogs contain a property named id', async () => {
    const response = await api.get('/api/blogs');
    // console.log(response.body);
    for( let blog of response.body ) {
        expect(blog.id).toBeDefined();
    }
} );

test( 'blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000 );

afterAll( async () => {
    await mongoose.connection.close();
} );