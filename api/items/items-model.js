const db = require('../data/db-config')

module.exports = {
  find,
  findById, 
  add,
  edit, 
  del
}

function find() {
  return db("items as i")
  .join('users as u','u.user_id', 'i.user_id' )
  .select('i.*', 'u.user_id')
}

function findById(id) {
  return db('items as i')
    .where("i.item_id", id)
}

async function add(newItem, user_id) {
  const [added] = await db('items')
  .insert(
    {...newItem, user_id}, ["item_name","source","ingredients","instructions","category"])
  return added;
}

// fix update i dont know how to test

async function edit(id, changes) {
  await db('items').where("item_id", id).update(changes)
  return findById(id)
}

function del(id) {
  return db('items').where("item_id", id).del()
} 