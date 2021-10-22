
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_class').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_class').insert([
        {user_id: 3, class_id: 2},
        {user_id: 3, class_id: 3},
        {user_id: 3, class_id: 4}
      
      ]);
    });
};
