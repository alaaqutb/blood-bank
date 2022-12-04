"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE distances (
    id INT AUTO_INCREMENT NOT NULL,
    hospital_id INT NOT NULL,
    blood_bank_id INT NOT NULL,
    distance DOUBLE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE,
    FOREIGN KEY (blood_bank_id) REFERENCES blood_banks (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE distances`;
  await dbProvider.execute(sql, []);
  next();
};
