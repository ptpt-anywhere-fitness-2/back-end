exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        {
          name: "yoga",
          date: "10-01-21",
          start_time: "15:00",
          duration_mins: 45,
          intensity: "beginner",
          location: "LA",
          max_size: 10,
          user_id: 2,
        },
        {
          name: "tennis",
          date: "11-01-20",
          start_time: "16:00",
          duration_mins: 60,
          intensity: "medium",
          location: "SF",
          max_size: 7,
          user_id: 3,
        },
        {
          name: "hiit",
          date: "10-01-30",
          start_time: "14:00",
          duration_mins: 30,
          intensity: "beginner",
          location: "LA",
          max_size: 9,
          user_id: 2,
        },
        {
          name: "yoga",
          date: "11-01-21",
          start_time: "15:00",
          duration_mins: 45,
          intensity: "advanced",
          location: "SF",
          max_size: 10,
          user_id: 3,
        }
      ]);
    });
};
