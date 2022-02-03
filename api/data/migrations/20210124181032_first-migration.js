exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('items', (items) => {
      items.increments('item_id')
      items.string('title', 128)
      items.string('source', 128)
      items.string('ingredients', 128)
      items.string('instructions', 128)
      items.string('category', 128)
      items.integer('user_id')
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      
})
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('items')
  .dropTableIfExists('users')
}
