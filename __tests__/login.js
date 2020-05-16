// const supertest = require('supertest')
// const login = require('./login-helper')
// const server = require('../api/server')
// const db = require('../database/dbConfig')

// beforeEach(async () => {
//     await db.seed.run()
// })
// afterAll(async () => {
//     await db.destroy()
// })

// var request = require('supertest')(server);

// describe('Login tests', () => {

//     let agent;

//     before(function (done) {
//         login.login(request, function (loginAgent) {
//         agent = loginAgent;
//         done();
//         });
//     });

//     it('Logs in successfully', async () => {
//         const req = request.post('/')
//         agent.attachCookies(req)
//         req.expect(200, done)
//     })
//     it('Logs in unsuccessfully', async () => {
//         const data = { username: 'Asuka', password: 'pass' }
//         const res = await supertest(server).post('/api/auth/login').send(data)
//         expect(res.statusCode).toBe(401)
//     })
// })
