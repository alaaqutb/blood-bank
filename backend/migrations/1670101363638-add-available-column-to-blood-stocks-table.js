"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `ALTER TABLE blood_stocks ADD COLUMN available BOOLEAN DEFAULT TRUE`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `ALTER TABLE blood_stocks DROP COLUMN available`;
  await dbProvider.execute(sql, []);
  next();
};
