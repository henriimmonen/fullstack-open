const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({ 
        username: 'root',
        name: 'Root McRootyface',
        password: 'secure'
    })

    await user.save()
})

test('creation succeeds with a fresh username', async () => {
    const newUser = {
        username: 'Timppa',
        name: 'Timo Soini',
        password: 'timppa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(2)

    const usernames = body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation does not succeed if username is not unique', async () => {
    const newUser = {
        username: 'root',
        name: 'virheellinen username',
        password: 'timppa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(1)

    const names = body.map(u => u.name)
    expect(names).not.toContain(newUser.name)
})

test('creation does not succeed if username is missing', async () => {
    const newUser = {
        name: 'Juha Mieto',
        password: 'mietaa11',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(1)

    const names = body.map(u => u.name)
    expect(names).not.toContain(newUser.name)
})

test('creation does not succeed if password is missing', async () => {
    const newUser = {
        username: 'Juhis',
        name: 'Juha Mieto'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(1)

    const usernames = body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})

test('creation does not succeed if password is shorter than 3 characters', async () => {
    const newUser = {
        username: 'Juhis',
        name: 'Juha Mieto',
        password: 'aa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(1)

    const usernames = body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})

test('creation succeeds if password is 3 characters', async () => {
    const newUser = {
        username: 'Juhis',
        name: 'Juha Mieto',
        password: 'aaa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(2)

    const usernames = body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation succeeds if username is 3 characters', async () => {
    const newUser = {
        username: 'juh',
        name: 'Juha Mieto',
        password: 'mietaaa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(2)

    const usernames = body.map(u => u.username)
    expect(usernames).toContain(newUser.username)
})

test('creation does not succeed if username is less than 3 characters', async () => {
    const newUser = {
        username: 'jh',
        name: 'Juha Mieto',
        password: 'mietaaa',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

    const response = await api.get('/api/users')
    let body = response.body
    expect(body).toHaveLength(1)

    const usernames = body.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
})