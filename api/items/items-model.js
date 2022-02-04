const req = require('express/lib/request')
const db = require('../data/db-config')

module.exports = {
  find,
  findBy,
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
  return db('items')
    .where("item_id", id)
    .first()
}

function findBy(filter) {
  return db('items')
    .where(filter)
}

async function add(newItem, user_id) {
  const [added] = await db('items')
  .insert(
    
    {...newItem, user_id}, ["title","source","ingredients","instructions","category"])
  return added;
}
async function edit(id, changes) {
  await db('items').where("item_id", id).update(changes)
  return findById(id)
}

function del(id) {
  return db('items').where("item_id", id).del()
} 