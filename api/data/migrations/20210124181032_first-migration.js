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
      items.string('item_name', 128).notNullable()
      items.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('RESTRICT')
      .onDelete('RESTRICT')
})
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('items')
  .dropTableIfExists('users')
}
