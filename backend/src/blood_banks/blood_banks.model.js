const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class BloodBanksModel {
  static async getBloodBanks() {
    const sql = `SELECT * FROM blood_banks`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async getBloodBanksWithCity() {
    const sql = `SELECT longitude, latitude, blood_banks.id FROM blood_banks INNER JOIN cities ON blood_banks.city_id = cities.id`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async createBloodBank(data) {
    const params = [data.name, data.city_id];
    const sql = `INSERT INTO blood_banks (name, city_id) VALUES (?,?)`;
    const rows = await dbProvider.execute(sql, params);
    return rows;
  }

  static async getBloodBankById(id) {
    const sql = `SELECT * FROM blood_banks WHERE id = ?`;
    const rows = await dbProvider.execute(sql, [id]);
    return rows[0];
  }
}

module.exports = BloodBanksModel;
