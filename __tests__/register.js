const supertest = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
    await db.seed.run()
})
afterAll(async () => {
    await db.destroy()
})

describe('auth-router tests', () => {
    it('Registers a new user', async () => {
        const data = { username: 'Anthony', password: 'pass' }
        const res = await supertest(server).post('/api/auth/register').send(data)
        expect(res.statusCode).toBe(201)
    })
    it('Fails to register a new user', async () => {
        const data = { username: 'Anthony', password: 'pass' }
        const res = await supertest(server).post('/api/auth/register/register').send(data)
        expect(res.statusCode).toBe(404)
    })
    it('Returns a 401 if user is not found when trying to log in', async () => {
        const data = { username: 'Katie', password: 'pass'}
        const res = await supertest(server).post('/api/auth/login').send(data)
        expect(res.statusCode).toBe(401)
    })
    it('Logs in unsuccessfully', async () => {
        const data = { username: 'Asuka', password: 'pass' }
        const res = await supertest(server).post('/api/auth/login').send(data)
        expect(res.statusCode).toBe(401)
    })
})
