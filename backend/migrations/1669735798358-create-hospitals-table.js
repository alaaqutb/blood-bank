"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE hospitals (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE hospitals`;
  await dbProvider.execute(sql, []);
  next();
};
