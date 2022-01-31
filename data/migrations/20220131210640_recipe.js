exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.text("username", 128).unique().notNullable();
      tbl.string("password", 256).notNullable()
    })
    .createTable('recipe', (tbl) => {
      tbl.increments("step_id");
      tbl.text('food_item')
      .notNullable();
      tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('recipe');
};
