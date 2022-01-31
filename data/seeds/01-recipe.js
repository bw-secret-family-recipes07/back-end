
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'admin', password: '$2a$08$gwp7OprxsJ1xx3L1GN0Ig.r/PEy.tqG31bhJqH7vqL9GacbJ84koC'},
      ]);
    });
};
