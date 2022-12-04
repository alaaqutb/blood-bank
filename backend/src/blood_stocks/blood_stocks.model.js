const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class BloodStocksModel {
  static async createBloodStock(data) {
    const params = [
      data.blood_type,
      data.blood_bank_id,
      data.donor_national_id,
      data.expiration_date,
    ];
    const sql = `INSERT INTO blood_stocks (blood_type, blood_bank_id, donor_national_id, expiration_date) VALUES (?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getAvailableBloodStocks(bloodTypes) {
    const sql = `SELECT * FROM blood_stocks WHERE blood_type IN (?) AND available = TRUE`;
    return await dbProvider.execute(sql, [bloodTypes]);
  }
}

module.exports = BloodStocksModel;
