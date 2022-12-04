"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE users (
    national_id VARCHAR(14) NOT NULL,
    hospital_id INT DEFAULT NULL,
    blood_bank_id INT DEFAULT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (national_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE,
    FOREIGN KEY (blood_bank_id) REFERENCES blood_banks (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE users`;
  await dbProvider.execute(sql, []);
  next();
};
