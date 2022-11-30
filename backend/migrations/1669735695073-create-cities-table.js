"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE cities (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    PRIMARY KEY (id)
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE cities`;
  await dbProvider.execute(sql, []);
  next();
};
