const { clean } = require('knex-cleaner')

exports.seed = async function (knex) {
  await knex("users")
    .insert({
      username: 'admin',
      password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe', // plain text password is 1234
      role: 1,
    })
}

