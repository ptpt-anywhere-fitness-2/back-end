exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.text("email", 128).unique().notNullable();
      tbl.text("name", 128).notNullable();
      tbl.text("password", 128).notNullable();
      tbl.text("role", 128).notNullable();
    })
    .createTable("classes", (tbl) => {
      tbl.increments("class_id");
      tbl.text("name", 128).notNullable();
      tbl.date("date");
      tbl.time("start_time").notNullable();
      tbl.integer("duration_mins").notNullable();
      tbl.text("intensity", 128).notNullable();
      tbl.text("location", 128).notNullable();
      tbl.integer("max_size").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("user_class", (tbl) => {
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("class_id")
        .unsigned()
        .notNullable()
        .references("class_id")
        .inTable("classes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["user_id", "class_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("classes")
    .dropTableIfExists("user_class");
};
