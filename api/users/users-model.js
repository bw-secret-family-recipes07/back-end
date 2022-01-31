const db = require('../../data/db-config.js')

module.exports = {
    add,
    find,
    findBy,
    findById,
  }
  
  function find() {
    return db('users').select('id', 'username')
  }
  
  function findBy(filter) {
    return db('users').where(filter)
  } 
  
  async function add(user) {
    const [user_id] = await db('users').insert(user)
  
    return findById(user_id)
  }
  
  function findById(id) {
    return db('users')
      .where({ user_id })
      .first()
  }
  