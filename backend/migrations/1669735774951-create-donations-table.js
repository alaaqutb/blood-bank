"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE donations (
    id INT AUTO_INCREMENT NOT NULL,
    virus_test ENUM ('positive', 'negative') DEFAULT NULL,
    donation_date DATETIME DEFAULT NOW(),
    donor_national_id VARCHAR(14) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    blood_bank_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (donor_national_id) REFERENCES donors (national_id) ON DELETE CASCADE,
    FOREIGN KEY (blood_bank_id) REFERENCES blood_banks (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE donations`;
  await dbProvider.execute(sql, []);
  next();
};
