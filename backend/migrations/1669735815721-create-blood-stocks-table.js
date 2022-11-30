"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE blood_stocks (
    id INT AUTO_INCREMENT NOT NULL,
    blood_type ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL,
    expiration_date DATETIME NOT NULL,
    donor_national_id VARCHAR(14) NOT NULL,
    blood_bank_id INT NOT NULL,
    hospital_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (donor_national_id) REFERENCES donors (national_id) ON DELETE CASCADE,
    FOREIGN KEY (blood_bank_id) REFERENCES blood_banks (id) ON DELETE CASCADE,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE blood_stocks`;
  await dbProvider.execute(sql, []);
  next();
};
