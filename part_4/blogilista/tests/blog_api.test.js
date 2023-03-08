const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let blogObject1 = new Blog(helper.manyBlogs[0])
    await blogObject1.save()

    let blogObject2 = new Blog(helper.manyBlogs[1])
    await blogObject2.save()

    const user = { 
        username: 'root',
        password: 'secure'
    }
  
    await api
      .post('/api/users')
      .send(user)

    const result = await api
      .post('/api/login')
      .send(user)

    token = result.body.token
})

test('Response to /api/blogs is succesful', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
})

test('Query returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('Blog id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('Blog can be posted to database', async () => {
    const blogToPost = {
        title: 'Best Blog Ever!',
        author: 'Anonymous',
        url: 'http://localhost:3001',
        likes: 3
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(blogToPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    let response = await api.get('/api/blogs')
    const body = response.body
    expect(body).toHaveLength(3)

    const contents = body.map(c => c.title)
    expect(contents).toContain(
        'Best Blog Ever!'
    )
})

test('Likes is set to 0 if no value given', async () => {
    const blogToPost = {
        title: 'Best Blog Ever!',
        author: 'Anonymous',
        url: 'http://localhost:3001',
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(blogToPost)

    let response = await api.get('/api/blogs')
    const body = response.body[2]
    expect(body.likes).toEqual(0)
})

test('If title or url not given, server answers with 400', async () => {
    const blogToPost1 = {
        author: 'Title not here',
        url: 'http://localhost:3001',
    }

    const blogToPost2 = {
        title: 'URL Missing',
        author: 'Anonymous',
    }

    await api
    .post('/api/blogs')
    .set({ 'Authorization': `Bearer ${token}` })
    .send(blogToPost1)
    .expect(400)

    await api
    .post('/api/blogs')
    .set({ 'Authorization': `Bearer ${token}` })
    .send(blogToPost2)
    .expect(400)

    let response = await api.get('/api/blogs')
    const body = response.body

    expect(body).toHaveLength(2)
    expect(body).not.toContain('Title not here')
    expect(body).not.toContain('URL Missing')

})

test('Individual blogs can be deleted', async () => {
    newBlog = {
        title: 'Best Blog Ever!',
        author: 'Anonymous',
        url: 'http://localhost:3001',
    }

    await api
      .post('/api/blogs')
      .set({ 'Authorization': `Bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)

    await api
    .delete(`/api/blogs/${response.body[2].id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

    const deletedBlogResponse = await api.get('/api/blogs')
    expect(deletedBlogResponse.body).toHaveLength(2)

    const contents = deletedBlogResponse.body.map(c => c.title)
    expect(contents).not.toContain(response.body[2].title)
})

test('Blogs can be edited', async () => {
    const res = await api.get('/api/blogs')

    let editedBlog = {
        likes: 6
    }

    expect(res.body[1].likes).toEqual(5)

    await api
    .put(`/api/blogs/${res.body[1].id}`)
    .send(editedBlog)
    .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body[1].likes).toEqual(6)
    expect(response.body).toHaveLength(2)
})

afterAll(async () => {
    await mongoose.connection.close()
})