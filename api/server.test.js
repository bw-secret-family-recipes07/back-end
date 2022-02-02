const request = require('supertest')
const server = require('./server.js')
const db = require('../api/data/db-config')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db.seed.run()
  })
  afterAll(async () => {
    await db.destroy()
  })

  describe('End Point Tests', () => {
      describe('New user registration works', () => {        
        test('Returns 200', async () => {
              const res = await request(server).get('/register')
              expect(res.status).toBe(201)
          })
      })
  })