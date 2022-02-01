const db = require("../data/db-config");

module.exports = {
  add,
  findBy,
  getById
};


function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [username] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
  ]);

  return username;
}

function getById(user_id) {
  return db('users')
    .where({ user_id })
    .first();
}
