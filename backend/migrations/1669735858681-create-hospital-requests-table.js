"use strict";
const DbProvider = require("../src/db/db");
const dbProvider = new DbProvider();

module.exports.up = async function (next) {
  const sql = `CREATE TABLE hospital_requests (
    id INT AUTO_INCREMENT NOT NULL,
    blood_type ENUM ('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-') NOT NULL,
    status ENUM ('pending', 'accepted', 'rejected'),
    quantity VARCHAR(50) NOT NULL,
    patient_status ENUM ('immediate','urgent','normal') NOT NULL,
    blood_bank_id INT NOT NULL,
    hospital_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (blood_bank_id) REFERENCES blood_banks (id) ON DELETE CASCADE,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id) ON DELETE CASCADE
    )`;
  await dbProvider.execute(sql, []);
  next();
};

module.exports.down = async function (next) {
  const sql = `DROP TABLE hospital_requests`;
  await dbProvider.execute(sql, []);
  next();
};
