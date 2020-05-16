const supertest = require('supertest')
const server = require('../api/server')

let token; 
beforeAll((done) => {
    supertest(server).post('/api/auth/login').send({ username: "Asuka", password: "pass"})
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

describe('Auth-Router tests', () => {
    it('Requires authentication', async () => {
        const res = await supertest(server).get('/api/jokes').set('Authorization', `Bearer ${token}`)
          expect(res.statusCode).toBe(401)
    })
    it('Responds with a JSON', async () => {
      const res = await supertest(server).get('/api/jokes').set('Authorization', `Bearer ${token}`)
          expect(res.type).toBe('application/json')
    })
})