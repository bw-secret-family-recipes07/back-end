const db = require("../data/db-config");

module.exports = {
  add,
  findBy
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
