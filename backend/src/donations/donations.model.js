const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class DonationsModel {
  static async createDonor(data) {
    const params = [data.national_id, data.name, data.city_id, data.email];
    const sql = `INSERT INTO donors (national_id, name, city_id, email) VALUES (?,?,?,?)`;
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

  static async getPendingDonationByNationalId(donor_national_id) {
    const sql = `SELECT * FROM donations WHERE donor_national_id = ? AND status = 'pending'`;
    const rows = await dbProvider.execute(sql, [donor_national_id]);
    return rows[0];
  }

  static async cancelDonation(donor_national_id) {
    const sql = `UPDATE donations SET status = 'rejected' WHERE donor_national_id = ? AND status = 'pending'`;
    await dbProvider.execute(sql, [donor_national_id]);
  }

  static async getDonors() {
    const sql = `SELECT * FROM donors`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async getPendingDonations() {
    const sql = `SELECT * FROM donations INNER JOIN donors ON donations.donor_national_id = donors.national_id WHERE donations.status = 'pending'`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async updateDonation(virus_test, donor_national_id, status) {
    const sql = `UPDATE donations SET virus_test = ? , status = ?  WHERE donor_national_id = ?`;
    await dbProvider.execute(sql, [virus_test, status, donor_national_id]);
  }
}

module.exports = DonationsModel;
