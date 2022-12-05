const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class BloodStocksModel {
  static async createBloodStock(
    nationalId,
    bloodType,
    bloodBankId,
    expirationDate
  ) {
    const params = [bloodType, bloodBankId, nationalId, new Date(expirationDate)];
    const sql = `INSERT INTO blood_stocks (blood_type, blood_bank_id, donor_national_id, expiration_date) VALUES (?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getAvailableBloodStocks(bloodTypes) {
    const sql = `SELECT * FROM blood_stocks WHERE blood_type IN (?) AND available = TRUE AND expired = FALSE`;
    return await dbProvider.execute(sql, [bloodTypes]);
  }

  static async updateBloodStock(bloodBankId, limit) {
    const sql = `UPDATE blood_stocks SET available = FALSE WHERE blood_bank_id = ? ORDER BY expiration_date LIMIT ?`;
    await dbProvider.execute(sql, [bloodBankId, limit]);
  }
}

module.exports = BloodStocksModel;
