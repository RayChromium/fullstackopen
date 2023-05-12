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
}, 100000 );

test( 'e4.10: ok to add a new blog', async () => {
    const newBlog = {
        title: 'A newly added blog (test)',
        author: 'Cai Rui',
        url: 'https://pornhub.com/',
        likes: 98,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/ );

    const response = await api.get('/api/blogs');
    const titles = response.body.map(b => b.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain('A newly added blog (test)');

}, 100000 );

test( 'blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000 );

afterAll( async () => {
    await mongoose.connection.close();
} );