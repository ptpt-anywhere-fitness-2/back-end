
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: "ed@test.com", name: 'Ed', password: "123", role: "instructor"},
        {email: "ted@test.com", name: 'Ted', password: "123", role: "instructor"},
        {email: "fed@test.com", name: 'Fed', password: "123", role: "client"},
      ]);
    });
};
