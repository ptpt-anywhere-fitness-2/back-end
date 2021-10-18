const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
};

function find() {
  return db("classes");
}

function findBy(filter) {
  return db("classes").where(filter);
}

function findById(id) {
  return db("classes")
    .where({ id })
    .first();
}