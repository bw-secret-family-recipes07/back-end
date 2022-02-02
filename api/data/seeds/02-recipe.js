exports.seed = async function (knex) {
    await knex("users")
      .insert([
      {
        username: 'admin',
        password: '$2a$08$CjOzAqkUXePlNyZCG6TKuubIY.MpjKqOdrV/W3178ah483kyEbeSe'
      },
      {
        username: 'enzo',
        password: '$2a$08$pKyiXfW8AlJ76UMrcpIMC.qFgMIv.3qVGjB2I.6LjVwGQSNSq//62'
      }
      ])
      await knex("items")
      .insert([
        {item_name: 'Burger' ,source: 'My Uncle',ingredients: 'Bun, meat, cheese', instructions: 'put meat and cheese in bun', category: 'American', user_id: 1},
        {item_name: 'German Hotdog' ,source: 'My mom',ingredients: 'hotdog', instructions: 'hutdog', category: 'German', user_id: 2}
      ])
  }
  