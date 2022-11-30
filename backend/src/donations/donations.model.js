const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class DonationsModel {
  static async createDonor(data) {
    const params = [data.national_id, data.name, data.city, data.email];
    const sql = `INSERT INTO donors (national_id, name, city, email) VALUES (?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getDonorByNationalId(national_id) {
    const sql = `SELECT * FROM donors WHERE national_id = ?`;
    const rows = await dbProvider.execute(sql, [national_id]);
    return rows[0];
  }

  static async getDonorByEmail(email) {
    const sql = `SELECT * FROM donors WHERE email = ?`;
    const rows = await dbProvider.execute(sql, [email]);
    return rows[0];
  }

  static async createDonation(data) {
    const params = [
      data.virus_test,
      data.status,
      data.blood_bank_id,
      data.donor_national_id,
    ];
    const sql = `INSERT INTO donations (virus_test, status, blood_bank_id, donor_national_id) VALUES (?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }
}

module.exports = DonationsModel;
