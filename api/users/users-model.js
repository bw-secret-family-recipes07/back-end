const db = require("../data/db-config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getAllUsers,
};

function getAllUsers() {
  return db("users");
}

function find() {}

function findBy(filter) {}

async function add(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    
    return newUserObject
}

function findById(id) {

}
