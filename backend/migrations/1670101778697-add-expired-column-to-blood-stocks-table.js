"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `ALTER TABLE blood_stocks ADD COLUMN expired BOOLEAN DEFAULT FALSE`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `ALTER TABLE blood_stocks DROP COLUMN expired`;
  await dbProvider.execute(sql, []);
  next();
};
