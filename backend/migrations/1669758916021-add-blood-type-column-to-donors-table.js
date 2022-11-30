"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `ALTER TABLE donors ADD blood_type ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL;`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `ALTER TABLE donors DROP COLUMN blood_type`;
  await dbProvider.execute(sql, []);
  next();
};
