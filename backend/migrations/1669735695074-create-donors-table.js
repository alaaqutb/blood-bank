"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE donors (
    national_id VARCHAR(14) NOT NULL,
    name VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    last_donation DATETIME DEFAULT NOW(),
    PRIMARY KEY (national_id),
    FOREIGN KEY (city_id) REFERENCES cities (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE donors`;
  await dbProvider.execute(sql, []);
  next();
};
