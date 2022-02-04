const request = require('supertest')
const server = require('./server.js')
const db = require('../api/data/db-config')
const Item = require('../api/items/items-model')

const item1 = {
  "item_name": "peace",
  "source":  "tia",
   "ingredients": "beans rice",
  "instructions": "cook with patience",
  "category": "dinner",
  "user_id": 1
}

const item2 = 
{
  "item_name": "love",
  "source": "grandmama",
  "ingredients": "maduros y queso",
  "instructions": "cook with patience",
  "category": "breakfast",
  "user_id": 1
}

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

  afterAll(async () => {
    await db.destroy()
  })

  it('sanity check', () => {
    expect(true).not.toBe(false)
  })
  
  describe('Testing enviroment', () => {
    it('is the correct testing environment', async () => {
      expect(process.env.NODE_ENV).toBe('testing')
    })
  })

  describe('End Point Tests', () => {
      describe('New user registration works', () => {        
        test('Returns 200', async () => {
              const res = await request(server)
              .post('/api/auth/register')
              .send({ username: 'John', password: 'Wick'})
              expect(res.status).toBe(201)
          })
          test('Returns John Wick', async () => {
            const res = await request(server)
            .post('/api/auth/register')
            .send({ username: 'John', password: 'Wick'})
            expect(res.body.message).toBe("Great to have you, John")
          })
      })
  })

    describe('Items Model Functions', () => {
      describe('create an item', () => {
        it('adds item to the db', async ()=> {
          let items
          await  Item.add(item1)
          items = await db('items')
          expect(items).toHaveLength(3)

          await Item.add(item2)
          items = await db('items')
          expect(items).toHaveLength(4)
        })
      })
    })
    
