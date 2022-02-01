exports.seed = async function (knex) {
    await knex("users")
      .insert({
        user_id: 1,
        username: 'admin',
        password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe'
      })
      await knex("items")
      .insert([
        {item_name: 'Burger' ,source: 'My Uncle',ingredients: 'Bun, meat, cheese', instructions: 'put meat and cheese in bun', category: 'American', user_id: 1}
      ])
  }
  