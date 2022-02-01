exports.seed = async function (knex) {
    await knex("users")
      .insert({
        user_id: 1,
        username: 'admin',
        password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe'
      })
      await knex("items")
      .insert({
        item_name: 'Burger',
        user_id: 1
      })
  }
  